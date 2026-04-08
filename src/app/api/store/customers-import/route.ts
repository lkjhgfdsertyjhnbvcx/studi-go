import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

// CSV行をパース（ダブルクォート対応）
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

// ヘッダー名の正規化マッピング
const HEADER_MAP: Record<string, string> = {
    "名前": "name", "氏名": "name", "name": "name", "顧客名": "name", "お名前": "name",
    "メール": "email", "メールアドレス": "email", "email": "email", "e-mail": "email", "mail": "email",
    "電話": "phone", "電話番号": "phone", "phone": "phone", "tel": "phone", "携帯": "phone",
    "メモ": "memo", "備考": "memo", "memo": "memo", "note": "memo", "notes": "memo", "コメント": "memo",
    "lineid": "lineUserId", "line_id": "lineUserId", "line id": "lineUserId", "ラインid": "lineUserId", "lineユーザーid": "lineUserId", "line": "lineUserId",
};

function normalizeHeader(h: string): string {
    const lower = h.toLowerCase().replace(/[\s_-]+/g, "").replace(/　/g, "");
    for (const [key, val] of Object.entries(HEADER_MAP)) {
        if (lower === key.toLowerCase().replace(/[\s_-]+/g, "")) return val;
    }
    return "";
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const studioId = formData.get("studioId") as string | null;

        if (!file || !studioId) {
            return NextResponse.json({ error: "ファイルとスタジオIDが必要です" }, { status: 400 });
        }

        const text = await file.text();
        const lines = text.split(/\r?\n/).filter(l => l.trim());

        if (lines.length < 2) {
            return NextResponse.json({ error: "ヘッダー行とデータ行が必要です" }, { status: 400 });
        }

        // ヘッダー解析
        const rawHeaders = parseCSVLine(lines[0]);
        const headers = rawHeaders.map(h => normalizeHeader(h));

        const nameIdx = headers.indexOf("name");
        const emailIdx = headers.indexOf("email");

        if (nameIdx === -1 && emailIdx === -1) {
            return NextResponse.json({
                error: "「名前」または「メール」のカラムが見つかりません",
                detectedHeaders: rawHeaders,
            }, { status: 400 });
        }

        // 既存ユーザーを取得（Admin SDK）
        const usersSnap = await adminDb.collection("users").get();
        const existingUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

        let created = 0;
        let updated = 0;
        let skipped = 0;
        const errors: string[] = [];

        for (let i = 1; i < lines.length; i++) {
            const cols = parseCSVLine(lines[i]);
            if (cols.length === 0 || cols.every(c => !c)) continue;

            const name = nameIdx >= 0 ? cols[nameIdx] || "" : "";
            const email = emailIdx >= 0 ? cols[emailIdx] || "" : "";
            const phone = headers.indexOf("phone") >= 0 ? cols[headers.indexOf("phone")] || "" : "";
            const memo = headers.indexOf("memo") >= 0 ? cols[headers.indexOf("memo")] || "" : "";
            const lineUserId = headers.indexOf("lineUserId") >= 0 ? cols[headers.indexOf("lineUserId")] || "" : "";

            if (!name && !email) {
                errors.push(`行${i + 1}: 名前またはメールが必要です`);
                skipped++;
                continue;
            }

            // 既存ユーザーを検索（メール or LINE ID）
            let existing = null;
            if (email) {
                existing = existingUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());
            }
            if (!existing && lineUserId) {
                existing = existingUsers.find(u => u.lineUserId === lineUserId);
            }

            if (existing) {
                // 既存ユーザーに不足情報を追記
                const updates: any = {};
                if (phone && !existing.phone) updates.phone = phone;
                if (memo) updates.importMemo = memo;
                if (lineUserId && !existing.lineUserId) updates.lineUserId = lineUserId;
                if (!existing.studioIds?.includes(studioId)) {
                    updates.studioIds = [...(existing.studioIds || []), studioId];
                }
                if (Object.keys(updates).length > 0) {
                    await adminDb.collection("users").doc(existing.id).set({ ...existing, ...updates }, { merge: true });
                    updated++;
                } else {
                    skipped++;
                }
            } else {
                // 新規ユーザー作成
                const userId = uuidv4();
                const newUser: any = {
                    id: userId,
                    name: name || "名前未設定",
                    email: email || "",
                    phone: phone || "",
                    password: "",
                    importMemo: memo || "",
                    studioIds: [studioId],
                    importedAt: new Date().toISOString(),
                    importedBy: studioId,
                    createdAt: new Date().toISOString(),
                };
                if (lineUserId) newUser.lineUserId = lineUserId;
                await adminDb.collection("users").doc(userId).set(newUser);
                existingUsers.push(newUser);
                created++;
            }
        }

        return NextResponse.json({
            success: true,
            created,
            updated,
            skipped,
            total: created + updated + skipped,
            errors: errors.slice(0, 10),
        });
    } catch (error: any) {
        console.error("[Customers Import] Error:", error);
        return NextResponse.json({ error: "インポート中にエラーが発生しました: " + error.message }, { status: 500 });
    }
}
