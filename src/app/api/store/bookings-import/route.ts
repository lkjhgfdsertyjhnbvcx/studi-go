import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
            else if (ch === '"') { inQuotes = false; }
            else { current += ch; }
        } else {
            if (ch === '"') { inQuotes = true; }
            else if (ch === ",") { result.push(current.trim()); current = ""; }
            else { current += ch; }
        }
    }
    result.push(current.trim());
    return result;
}

const HEADER_MAP: Record<string, string> = {
    "顧客名": "customerName", "名前": "customerName", "氏名": "customerName", "name": "customerName", "お名前": "customerName",
    "メール": "email", "メールアドレス": "email", "email": "email",
    "日付": "date", "予約日": "date", "date": "date", "利用日": "date",
    "開始時間": "startTime", "時間": "startTime", "start": "startTime", "starttime": "startTime", "開始": "startTime",
    "時間数": "durationHours", "利用時間": "durationHours", "duration": "durationHours", "hours": "durationHours",
    "部屋": "roomName", "部屋名": "roomName", "room": "roomName", "スタジオ名": "roomName", "ルーム": "roomName",
    "料金": "totalPrice", "金額": "totalPrice", "price": "totalPrice", "合計": "totalPrice",
    "ステータス": "status", "状態": "status", "status": "status",
    "メモ": "memo", "備考": "memo", "memo": "memo",
};

function normalizeHeader(h: string): string {
    const lower = h.toLowerCase().replace(/[\s_-]+/g, "").replace(/　/g, "");
    for (const [key, val] of Object.entries(HEADER_MAP)) {
        if (lower === key.toLowerCase().replace(/[\s_-]+/g, "")) return val;
    }
    return "";
}

// 日付フォーマット正規化 (2026/4/1 → 2026-04-01)
function normalizeDate(d: string): string {
    const m = d.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);
    if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    return d;
}

// 時間フォーマット正規化 (9:00 → 09:00)
function normalizeTime(t: string): string {
    const m = t.match(/^(\d{1,2}):(\d{2})$/);
    if (m) return `${m[1].padStart(2, "0")}:${m[2]}`;
    return t;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const studioId = formData.get("studioId") as string | null;
        const mappingJson = formData.get("mapping") as string | null;

        if (!file || !studioId) {
            return NextResponse.json({ error: "ファイルとスタジオIDが必要です" }, { status: 400 });
        }

        const text = await file.text();
        const lines = text.split(/\r?\n/).filter(l => l.trim());

        if (lines.length < 2) {
            return NextResponse.json({ error: "ヘッダー行とデータ行が必要です" }, { status: 400 });
        }

        const rawHeaders = parseCSVLine(lines[0]);

        // マッピング決定：手動マッピングが送られてきた場合はそれを使用
        let headers: string[];
        if (mappingJson) {
            const manualMapping: Record<string, string> = JSON.parse(mappingJson);
            headers = rawHeaders.map(h => manualMapping[h] || "");
        } else {
            headers = rawHeaders.map(h => normalizeHeader(h));
        }

        const dateIdx = headers.indexOf("date");
        const startIdx = headers.indexOf("startTime");
        const roomIdx = headers.indexOf("roomName");

        if (dateIdx === -1 || startIdx === -1) {
            return NextResponse.json({
                error: "「日付」と「開始時間」のカラムが必要です。カラムマッピングを確認してください。",
                detectedHeaders: rawHeaders,
            }, { status: 400 });
        }

        // 既存ユーザーを取得（Admin SDK）
        const usersSnap = await adminDb.collection("users").get();
        const existingUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

        // 既存予約を取得（重複チェック用）（Admin SDK）
        const bookingsSnap = await adminDb.collection("bookings").get();
        const existingBookings = bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

        let created = 0;
        let skipped = 0;
        const errors: string[] = [];

        for (let i = 1; i < lines.length; i++) {
            const cols = parseCSVLine(lines[i]);
            if (cols.length === 0 || cols.every(c => !c)) continue;

            const customerName = headers.indexOf("customerName") >= 0 ? cols[headers.indexOf("customerName")] || "" : "";
            const email = headers.indexOf("email") >= 0 ? cols[headers.indexOf("email")] || "" : "";
            const date = normalizeDate(cols[dateIdx] || "");
            const startTime = normalizeTime(cols[startIdx] || "");
            const durationHours = headers.indexOf("durationHours") >= 0 ? parseFloat(cols[headers.indexOf("durationHours")]) || 1 : 1;
            const roomName = roomIdx >= 0 ? cols[roomIdx] || "" : "";
            const totalPrice = headers.indexOf("totalPrice") >= 0 ? parseInt(cols[headers.indexOf("totalPrice")]?.replace(/[¥,]/g, "")) || 0 : 0;
            const statusRaw = headers.indexOf("status") >= 0 ? cols[headers.indexOf("status")] || "" : "";
            const memo = headers.indexOf("memo") >= 0 ? cols[headers.indexOf("memo")] || "" : "";

            // 日付バリデーション
            if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                errors.push(`行${i + 1}: 日付の形式が不正です (${cols[dateIdx]})`);
                skipped++;
                continue;
            }

            if (!startTime.match(/^\d{2}:\d{2}$/)) {
                errors.push(`行${i + 1}: 開始時間の形式が不正です (${cols[startIdx]})`);
                skipped++;
                continue;
            }

            // ステータス正規化
            let status = "confirmed";
            const sl = statusRaw.toLowerCase();
            if (sl.includes("cancel") || sl.includes("キャンセル")) status = "cancelled";
            else if (sl.includes("pending") || sl.includes("未確定") || sl.includes("仮")) status = "pending";

            // 重複チェック（同じスタジオ・日付・開始時間・部屋）
            const dup = existingBookings.find(b =>
                b.studioId === studioId &&
                b.date === date &&
                b.startTime === startTime &&
                b.roomName === roomName
            );
            if (dup) {
                skipped++;
                continue;
            }

            // ユーザー検索 or 仮登録
            let userId = "imported-unknown";
            if (email) {
                const found = existingUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());
                if (found) {
                    userId = found.id;
                } else {
                    // 仮ユーザー作成
                    userId = uuidv4();
                    const newUser: any = {
                        id: userId,
                        name: customerName || "名前未設定",
                        email,
                        password: "",
                        studioIds: [studioId],
                        importedAt: new Date().toISOString(),
                        importedBy: studioId,
                        createdAt: new Date().toISOString(),
                    };
                    await adminDb.collection("users").doc(userId).set(newUser);
                    existingUsers.push(newUser);
                }
            } else if (customerName) {
                // メールなし、名前のみ
                const found = existingUsers.find(u =>
                    u.name === customerName && u.importedBy === studioId
                );
                if (found) {
                    userId = found.id;
                } else {
                    userId = uuidv4();
                    const newUser: any = {
                        id: userId,
                        name: customerName,
                        email: "",
                        password: "",
                        studioIds: [studioId],
                        importedAt: new Date().toISOString(),
                        importedBy: studioId,
                        createdAt: new Date().toISOString(),
                    };
                    await adminDb.collection("users").doc(userId).set(newUser);
                    existingUsers.push(newUser);
                }
            }

            // 予約登録
            const bookingId = uuidv4();
            const booking: any = {
                id: bookingId,
                studioId,
                userId,
                userName: customerName,
                userEmail: email,
                roomName: roomName || "未指定",
                date,
                startTime,
                durationHours,
                totalPrice,
                status,
                createdAt: new Date().toISOString(),
                importedAt: new Date().toISOString(),
                source: "csv-import",
            };
            if (memo) booking.memo = memo;

            await adminDb.collection("bookings").doc(bookingId).set(booking);
            existingBookings.push(booking);
            created++;
        }

        return NextResponse.json({
            success: true,
            created,
            skipped,
            total: created + skipped,
            errors: errors.slice(0, 10),
        });
    } catch (error: any) {
        console.error("[Bookings Import] Error:", error);
        return NextResponse.json({ error: "インポート中にエラーが発生しました: " + error.message }, { status: 500 });
    }
}
