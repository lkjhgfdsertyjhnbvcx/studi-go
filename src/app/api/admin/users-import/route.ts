import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { requirePlatformAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// CSVテキストをパースする関数
function parseCSV(text: string): string[][] {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    return lines.map(line => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"' && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else if (ch === '"') {
                    inQuotes = false;
                } else {
                    current += ch;
                }
            } else {
                if (ch === '"') {
                    inQuotes = true;
                } else if (ch === ",") {
                    result.push(current.trim());
                    current = "";
                } else {
                    current += ch;
                }
            }
        }
        result.push(current.trim());
        return result;
    });
}

// ヘッダー名の正規化（日本語・英語両対応）
function normalizeHeader(header: string): string {
    const h = header.toLowerCase().replace(/[\s　]/g, "");
    if (h === "名前" || h === "name" || h === "氏名" || h === "顧客名") return "name";
    if (h === "メール" || h === "email" || h === "メールアドレス" || h === "e-mail") return "email";
    if (h === "電話" || h === "phone" || h === "電話番号" || h === "tel") return "phone";
    if (h === "住所" || h === "address") return "address";
    return h;
}

export async function POST(request: Request) {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "CSVファイルが選択されていません" }, { status: 400 });
        }

        // ファイル読み込み（Shift-JIS対応）
        let text: string;
        try {
            const buffer = await file.arrayBuffer();
            // まずUTF-8で試す
            text = new TextDecoder("utf-8").decode(buffer);
            // 文字化けチェック（Shift-JISの場合は replacement character が出る）
            if (text.includes("�")) {
                text = new TextDecoder("shift-jis").decode(buffer);
            }
        } catch {
            const buffer = await file.arrayBuffer();
            text = new TextDecoder("shift-jis").decode(buffer);
        }

        const rows = parseCSV(text);
        if (rows.length < 2) {
            return NextResponse.json({ error: "CSVにデータがありません（ヘッダー行 + データ行が必要です）" }, { status: 400 });
        }

        // ヘッダー解析
        const headers = rows[0].map(normalizeHeader);
        const nameIdx = headers.indexOf("name");
        const emailIdx = headers.indexOf("email");
        const phoneIdx = headers.indexOf("phone");
        const addressIdx = headers.indexOf("address");

        if (nameIdx === -1 && emailIdx === -1) {
            return NextResponse.json({
                error: "CSVに「名前」または「メール」列が見つかりません。ヘッダー行に「名前」「メール」「電話」「住所」のいずれかを含めてください。",
                detectedHeaders: rows[0],
            }, { status: 400 });
        }

        // 既存ユーザーのメールアドレス一覧を取得（重複チェック用）
        const existingSnap = await adminDb.collection("users").get();
        const existingEmails = new Set(
            existingSnap.docs.map(d => (d.data().email || "").toLowerCase())
        );

        const dataRows = rows.slice(1);
        let imported = 0;
        let skipped = 0;
        let errors: string[] = [];

        for (let i = 0; i < dataRows.length; i++) {
            const row = dataRows[i];
            const rowNum = i + 2; // 1-indexed + header row

            const name = nameIdx >= 0 ? (row[nameIdx] || "") : "";
            const email = emailIdx >= 0 ? (row[emailIdx] || "") : "";
            const phone = phoneIdx >= 0 ? (row[phoneIdx] || "") : "";
            const address = addressIdx >= 0 ? (row[addressIdx] || "") : "";

            // 名前もメールも空の行はスキップ
            if (!name && !email) {
                skipped++;
                continue;
            }

            // メールアドレスの重複チェック
            if (email && existingEmails.has(email.toLowerCase())) {
                skipped++;
                errors.push(`行${rowNum}: ${email} は既に登録済みのためスキップ`);
                continue;
            }

            try {
                const userId = uuidv4();
                const userData: any = {
                    id: userId,
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    createdAt: new Date().toISOString(),
                    authProvider: "csv_import",
                    isJocollaUser: false,
                    myStudios: [],
                };

                await adminDb.collection("users").doc(userId).set(userData);
                imported++;

                if (email) {
                    existingEmails.add(email.toLowerCase());
                }
            } catch (err: any) {
                errors.push(`行${rowNum}: 登録失敗 - ${err.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            imported,
            skipped,
            total: dataRows.length,
            errors: errors.slice(0, 20), // 最大20件のエラーを返す
        });
    } catch (error: any) {
        console.error("[users-import POST]", error.message);
        return NextResponse.json({ error: `インポート失敗: ${error.message}` }, { status: 500 });
    }
}
