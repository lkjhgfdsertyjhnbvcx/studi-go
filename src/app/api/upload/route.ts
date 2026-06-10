import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { requireAuth } from "@/lib/api-auth";

// 画像のみ許可（MIMEタイプ → 安全な拡張子のマッピング）
const ALLOWED: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
};
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
    // 認証必須（管理者 or スタジオオーナーのみ）
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "ファイルがありません。" }, { status: 400 });
        }

        // MIMEタイプ検証（クライアント拡張子は信用しない）
        const safeExt = ALLOWED[file.type];
        if (!safeExt) {
            return NextResponse.json({ error: "画像ファイル（JPEG/PNG/WebP/GIF）のみアップロードできます。" }, { status: 400 });
        }

        // サイズ検証
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "ファイルサイズは5MB以下にしてください。" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // ファイル名はサーバー生成のUUID + MIME由来の安全な拡張子のみ（パストラバーサル防止）
        const filename = `${uuidv4()}${safeExt}`;

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload failed", error);
        return NextResponse.json({ error: "アップロードに失敗しました。" }, { status: 500 });
    }
}
