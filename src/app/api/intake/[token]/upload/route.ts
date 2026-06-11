// 店舗側：招待トークンで画像アップロード（ログイン不要、トークンが鍵）
// /api/upload と同じ検証ロジック（MIME・サイズ・UUIDファイル名）
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { initializeAdmin } from "@/lib/firebase-admin";
import { INTAKE_COLLECTION, type StoreIntake } from "@/lib/intake";

export const dynamic = "force-dynamic";

const ALLOWED: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
};
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        if (!token || token.length < 32) {
            return NextResponse.json({ error: "招待リンクが無効です" }, { status: 404 });
        }

        // トークン検証（有効な招待のみアップロード可）
        const db = initializeAdmin();
        const snap = await db.collection(INTAKE_COLLECTION).doc(token).get();
        if (!snap.exists) {
            return NextResponse.json({ error: "招待リンクが無効です" }, { status: 404 });
        }
        const intake = snap.data() as StoreIntake;
        if (intake.status === "approved") {
            return NextResponse.json({ error: "すでに承認済みのためアップロードできません" }, { status: 409 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "ファイルがありません。" }, { status: 400 });
        }

        const safeExt = ALLOWED[file.type];
        if (!safeExt) {
            return NextResponse.json({ error: "画像ファイル（JPEG/PNG/WebP/GIF）のみアップロードできます。" }, { status: 400 });
        }
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "ファイルサイズは5MB以下にしてください。" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${uuidv4()}${safeExt}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (error: any) {
        console.error("【招待アップロードAPIエラー】:", error.message);
        return NextResponse.json({ error: "アップロードに失敗しました。" }, { status: 500 });
    }
}
