// 店舗ダッシュボードの画像アップロード（サーバー経由）
// クライアントSDK直アップロードはStorageルールのロックダウンで不可になったため、
// 認証済みのサーバー経由でAdmin SDK（ルールをバイパス）を使ってStorageに保存する。
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { adminStorage } from "@/lib/firebase-admin";
import { requireAuth } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// 画像のみ許可（MIMEタイプ → 安全な拡張子）
const ALLOWED: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
};
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
    // 認証必須（管理者 or 店舗ユーザーのみ）
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;
    const { auth } = authResult;

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const folderRaw = (formData.get("folder") as string) || "misc";

        if (!file) {
            return NextResponse.json({ error: "ファイルがありません。" }, { status: 400 });
        }

        // MIMEタイプ検証（クライアント拡張子は信用しない）
        const safeExt = ALLOWED[file.type];
        if (!safeExt) {
            return NextResponse.json({ error: "画像ファイル（JPEG/PNG/WebP/GIF）のみアップロードできます。" }, { status: 400 });
        }
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "ファイルサイズは5MB以下にしてください。" }, { status: 400 });
        }

        // フォルダパスのサニタイズ（パストラバーサル・不正文字を除去）
        let folder = folderRaw
            .replace(/\.\.+/g, "")
            .replace(/[^a-zA-Z0-9/_.-]/g, "_")
            .replace(/^\/+/, "")
            .replace(/\/+/g, "/");

        // 店舗ユーザーは自店舗配下(studios/{id}/...)のみ許可。
        // それ以外のパスを指定してきた場合は自店舗フォルダに強制収容する。
        if (auth.studioId) {
            const prefix = `studios/${auth.studioId}`;
            if (folder !== prefix && !folder.startsWith(`${prefix}/`)) {
                folder = `${prefix}/${folder}`;
            }
        }
        if (!folder) folder = "misc";

        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = `${folder}/${uuidv4()}${safeExt}`;
        const downloadToken = uuidv4();

        const bucket = adminStorage.bucket();
        await bucket.file(filePath).save(buffer, {
            metadata: {
                contentType: file.type,
                metadata: { firebaseStorageDownloadTokens: downloadToken },
            },
        });

        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media&token=${downloadToken}`;
        return NextResponse.json({ success: true, url });
    } catch (error: any) {
        console.error("【店舗画像アップロードAPIエラー】:", error?.message || error);
        return NextResponse.json({ error: "アップロードに失敗しました。" }, { status: 500 });
    }
}
