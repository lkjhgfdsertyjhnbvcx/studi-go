// 店舗側：招待トークンで入力内容の取得・下書き保存・提出（ログイン不要、トークンが鍵）
import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { INTAKE_COLLECTION, type StoreIntake, type IntakeData } from "@/lib/intake";

export const dynamic = "force-dynamic";

async function getIntake(token: string): Promise<StoreIntake | null> {
    if (!token || token.length < 32) return null; // 雑なトークンは弾く
    const db = initializeAdmin();
    const snap = await db.collection(INTAKE_COLLECTION).doc(token).get();
    return snap.exists ? (snap.data() as StoreIntake) : null;
}

// 入力内容の取得
export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        const intake = await getIntake(token);
        if (!intake) {
            return NextResponse.json({ error: "招待リンクが無効です" }, { status: 404 });
        }
        return NextResponse.json({
            label: intake.label,
            status: intake.status,
            data: intake.data,
            submittedAt: intake.submittedAt || null,
        });
    } catch (error: any) {
        console.error("【入力取得APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 下書き保存
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        const intake = await getIntake(token);
        if (!intake) {
            return NextResponse.json({ error: "招待リンクが無効です" }, { status: 404 });
        }
        if (intake.status === "approved") {
            return NextResponse.json({ error: "すでに承認済みのため編集できません" }, { status: 409 });
        }

        const body = await request.json();
        const data = body.data as IntakeData;
        if (!data) {
            return NextResponse.json({ error: "データがありません" }, { status: 400 });
        }

        const db = initializeAdmin();
        await db.collection(INTAKE_COLLECTION).doc(token).update({
            data,
            status: intake.status === "submitted" ? "submitted" : "in_progress",
            updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("【下書き保存APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 提出
export async function POST(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        const intake = await getIntake(token);
        if (!intake) {
            return NextResponse.json({ error: "招待リンクが無効です" }, { status: 404 });
        }
        if (intake.status === "approved") {
            return NextResponse.json({ error: "すでに承認済みです" }, { status: 409 });
        }

        const body = await request.json();
        const data = (body.data as IntakeData) || intake.data;

        // 最低限のバリデーション
        if (!data?.storeName?.trim()) {
            return NextResponse.json({ error: "店舗名を入力してください" }, { status: 400 });
        }
        if (!data?.address?.trim() || !data?.phone?.trim()) {
            return NextResponse.json({ error: "住所・電話番号を入力してください" }, { status: 400 });
        }

        const now = new Date().toISOString();
        const db = initializeAdmin();
        await db.collection(INTAKE_COLLECTION).doc(token).update({
            data,
            status: "submitted",
            submittedAt: now,
            updatedAt: now,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("【提出APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
