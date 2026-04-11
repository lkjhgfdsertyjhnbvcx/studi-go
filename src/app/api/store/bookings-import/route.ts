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
    "顧客名": "customerName", "名前": "customerName", "氏名": "customerName", "name": "customerName", "お名前": "customerName", "予約者名": "customerName",
    "メール": "email", "メールアドレス": "email", "email": "email", "連絡先メール": "email",
    "日付": "date", "予約日": "date", "date": "date", "利用日": "date", "予約開始時刻": "date",
    "開始時間": "startTime", "時間": "startTime", "start": "startTime", "starttime": "startTime", "開始": "startTime", "入室時間": "startTime", "開始時刻": "startTime",
    "終了時間": "endTime", "終了": "endTime", "退室時間": "endTime", "end": "endTime", "endtime": "endTime", "終了時刻": "endTime", "予約終了時刻": "endTime", "予約終了時間": "endTime",
    "時間数": "durationHours", "利用時間": "durationHours", "duration": "durationHours", "hours": "durationHours",
    "部屋": "roomName", "部屋名": "roomName", "room": "roomName", "スタジオ名": "roomName", "ルーム": "roomName", "ブース名": "roomName",
    "料金": "totalPrice", "金額": "totalPrice", "price": "totalPrice", "合計": "totalPrice",
    "ステータス": "status", "状態": "status", "status": "status",
    "メモ": "memo", "備考": "memo", "memo": "memo", "備考欄": "memo",
    "人数": "people", "利用人数": "people",
};

function normalizeHeader(h: string): string {
    const lower = h.toLowerCase().replace(/[\s_-]+/g, "").replace(/　/g, "");
    for (const [key, val] of Object.entries(HEADER_MAP)) {
        if (lower === key.toLowerCase().replace(/[\s_-]+/g, "")) return val;
    }
    return "";
}

// 「2026/4/11 13:00」→ { date: "2026-04-11", time: "13:00" }
// 「2026-04-11」→ { date: "2026-04-11", time: "" }
// 「13:00」→ { date: "", time: "13:00" }
function parseDateTimeValue(raw: string): { date: string; time: string } {
    const s = raw.trim();
    // "2026/4/11 13:00" or "2026-04-11 13:00" 形式（日付+時刻）
    const dtm = s.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})\s+(\d{1,2}):(\d{2})$/);
    if (dtm) {
        return {
            date: `${dtm[1]}-${dtm[2].padStart(2, "0")}-${dtm[3].padStart(2, "0")}`,
            time: `${dtm[4].padStart(2, "0")}:${dtm[5]}`,
        };
    }
    // 日付のみ "2026/4/11" or "2026-04-11"
    const dm = s.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);
    if (dm) {
        return { date: `${dm[1]}-${dm[2].padStart(2, "0")}-${dm[3].padStart(2, "0")}`, time: "" };
    }
    // 時刻のみ "13:00" or "9:00"
    const tm = s.match(/^(\d{1,2}):(\d{2})$/);
    if (tm) {
        return { date: "", time: `${tm[1].padStart(2, "0")}:${tm[2]}` };
    }
    return { date: s, time: "" };
}

// Shift-JIS自動検出してテキストとして読む
async function readFileAsText(file: File): Promise<string> {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    // BOM検出
    const isUtf8Bom = bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF;
    // Shift-JIS検出
    let sjisLike = 0;
    for (let i = 0; i < Math.min(bytes.length, 500); i++) {
        if ((bytes[i] >= 0x81 && bytes[i] <= 0x9F) || (bytes[i] >= 0xE0 && bytes[i] <= 0xEF)) sjisLike++;
    }
    const encoding = (!isUtf8Bom && sjisLike > 5) ? "shift_jis" : "utf-8";
    const decoder = new TextDecoder(encoding);
    return decoder.decode(buf);
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

        const text = await readFileAsText(file);
        const lines = text.split(/\r?\n/).filter(l => l.trim());

        if (lines.length < 2) {
            return NextResponse.json({ error: "ヘッダー行とデータ行が必要です" }, { status: 400 });
        }

        const rawHeaders = parseCSVLine(lines[0]);

        // マッピング決定
        let headers: string[];
        if (mappingJson) {
            const manualMapping: Record<string, string> = JSON.parse(mappingJson);
            headers = rawHeaders.map(h => manualMapping[h] || "");
        } else {
            headers = rawHeaders.map(h => normalizeHeader(h));
        }

        const dateIdx = headers.indexOf("date");
        const startIdx = headers.indexOf("startTime");
        const endIdx = headers.indexOf("endTime");
        const roomIdx = headers.indexOf("roomName");
        const durationIdx = headers.indexOf("durationHours");

        // date列がなくてもstartTime列に日付+時刻が含まれていれば対応
        if (dateIdx === -1 && startIdx === -1) {
            return NextResponse.json({
                error: "「予約日」または「開始時間」のカラムが必要です。カラムマッピングを確認してください。",
                detectedHeaders: rawHeaders,
            }, { status: 400 });
        }

        // 既存ユーザーを取得（Admin SDK）
        const usersSnap = await adminDb.collection("users").get();
        const existingUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

        // 既存予約を取得（重複チェック用）
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

            // ── 日付・時刻のパース（「2026/4/11 13:00」一体型にも対応）──
            let date = "";
            let startTime = "";

            if (dateIdx >= 0) {
                const parsed = parseDateTimeValue(cols[dateIdx] || "");
                date = parsed.date;
                if (parsed.time) startTime = parsed.time; // 日付列に時刻も入っている場合
            }
            if (startIdx >= 0) {
                const parsed = parseDateTimeValue(cols[startIdx] || "");
                if (parsed.time) startTime = parsed.time;
                if (parsed.date && !date) date = parsed.date; // start列に日付がある場合
            }

            // endTime → duration計算
            let durationHours = durationIdx >= 0 ? parseFloat(cols[durationIdx]) || 0 : 0;
            let endTimeStr = "";

            if (endIdx >= 0) {
                const endParsed = parseDateTimeValue(cols[endIdx] || "");
                endTimeStr = endParsed.time;
                // endTimeから利用時間を計算（durationが0の場合）
                if ((!durationHours || durationHours <= 0) && startTime && endTimeStr) {
                    const [sh, sm] = startTime.split(":").map(Number);
                    const [eh, em] = endTimeStr.split(":").map(Number);
                    const diffMin = (eh * 60 + em) - (sh * 60 + sm);
                    if (diffMin > 0) {
                        durationHours = diffMin / 60;
                    }
                }
            }
            if (!durationHours || durationHours <= 0) durationHours = 1;

            const roomName = roomIdx >= 0 ? cols[roomIdx] || "" : "";
            const totalPrice = headers.indexOf("totalPrice") >= 0 ? parseInt(cols[headers.indexOf("totalPrice")]?.replace(/[¥￥,，]/g, "")) || 0 : 0;
            const statusRaw = headers.indexOf("status") >= 0 ? cols[headers.indexOf("status")] || "" : "";
            const memo = headers.indexOf("memo") >= 0 ? cols[headers.indexOf("memo")] || "" : "";

            // 日付バリデーション
            if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                errors.push(`行${i + 1}: 日付の形式が不正です (${dateIdx >= 0 ? cols[dateIdx] : "なし"})`);
                skipped++;
                continue;
            }
            if (!startTime.match(/^\d{2}:\d{2}$/)) {
                errors.push(`行${i + 1}: 開始時間の形式が不正です (${startIdx >= 0 ? cols[startIdx] : "なし"})`);
                skipped++;
                continue;
            }

            // ステータス正規化
            let status = "confirmed";
            const sl = statusRaw.toLowerCase();
            if (sl.includes("cancel") || sl.includes("キャンセル")) status = "cancelled";
            else if (sl.includes("pending") || sl.includes("未確定") || sl.includes("仮")) status = "pending";

            // 重複チェック
            const dup = existingBookings.find(b =>
                b.studioId === studioId &&
                b.date === date &&
                b.startTime === startTime &&
                b.roomName === roomName
            );
            if (dup) { skipped++; continue; }

            // ユーザー検索 or 仮登録
            let userId = "imported-unknown";
            if (email) {
                const found = existingUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());
                if (found) {
                    userId = found.id;
                } else {
                    userId = uuidv4();
                    const newUser: any = {
                        id: userId, name: customerName || "名前未設定", email, password: "",
                        studioIds: [studioId], importedAt: new Date().toISOString(), importedBy: studioId, createdAt: new Date().toISOString(),
                    };
                    await adminDb.collection("users").doc(userId).set(newUser);
                    existingUsers.push(newUser);
                }
            } else if (customerName) {
                const found = existingUsers.find(u => u.name === customerName && u.importedBy === studioId);
                if (found) {
                    userId = found.id;
                } else {
                    userId = uuidv4();
                    const newUser: any = {
                        id: userId, name: customerName, email: "", password: "",
                        studioIds: [studioId], importedAt: new Date().toISOString(), importedBy: studioId, createdAt: new Date().toISOString(),
                    };
                    await adminDb.collection("users").doc(userId).set(newUser);
                    existingUsers.push(newUser);
                }
            }

            const bookingId = uuidv4();
            const booking: any = {
                id: bookingId, studioId, userId,
                userName: customerName, userEmail: email,
                roomName: roomName || "未指定",
                date, startTime, durationHours,
                totalPrice, status,
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
            success: true, created, skipped,
            total: created + skipped,
            errors: errors.slice(0, 10),
        });
    } catch (error: any) {
        console.error("[Bookings Import] Error:", error);
        return NextResponse.json({ error: "インポート中にエラーが発生しました: " + error.message }, { status: 500 });
    }
}
