// 店舗側：招待トークンで入力内容の取得・下書き保存・提出（ログイン不要、トークンが鍵）
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { initializeAdmin } from "@/lib/firebase-admin";
import { INTAKE_COLLECTION, validateIntakeForPublish, type StoreIntake, type IntakeData } from "@/lib/intake";

export const dynamic = "force-dynamic";

const BASE_URL = "https://studi-go.com";
const FROM = process.env.MAIL_FROM ?? "Studi-Go <info@studi-go.com>";
const INTERNAL_NOTIFY = "info@studi-go.com";
const RESEND = new Resend(process.env.RESEND_API_KEY);

/**
 * 店舗が入力を提出したことを運営に知らせる。
 * これが無いと運営は /admin/invites を自分で見に行くまで気づけず、
 * 「提出したのに音沙汰がない」という放置が起きる（260804 の申込がまさにそれ）。
 * 通知の失敗で提出そのものを失敗させたくないので、例外は握って握り潰さずログに出す。
 */
async function notifySubmitted(token: string, intake: StoreIntake, data: IntakeData) {
    const rows = [
        ["店舗名", data.storeName],
        ["ご担当者", data.contactPerson || intake.contactName || "（未入力）"],
        ["住所", data.address],
        ["電話番号", data.phone],
        ["メール", data.email || intake.contactEmail || "（未入力）"],
        ["ルーム数", String((data.rooms ?? []).length)],
        ["希望プラン", intake.planRequested ?? "（不明）"],
    ]
        .map(([k, v]) => `${k}：${v}`)
        .join("\n");

    const warnings: string[] = [];
    if (!(data.rooms ?? []).length) warnings.push("⚠️ ルームが0件です。このまま承認すると予約できない店舗ページになります。");
    if ((data.rooms ?? []).some((r) => !r.name?.trim())) warnings.push("⚠️ 名前が空のルームがあります。");
    if ((data.rooms ?? []).some((r) => !r.basePrice && !(r.pricing?.weekday ?? []).length)) warnings.push("⚠️ 料金が0円のルームがあります（¥0予約が成立します）。");
    if (!data.email?.trim()) warnings.push("⚠️ メールアドレスが未入力です（申込時のアドレスでログイン情報を発行します）。");

    await RESEND.emails.send({
        from: FROM,
        to: INTERNAL_NOTIFY,
        replyTo: data.email || intake.contactEmail || INTERNAL_NOTIFY,
        subject: `【提出】${data.storeName} が店舗情報を提出しました${warnings.length ? "（要確認）" : ""}`,
        text: `【店舗情報の提出】${data.storeName}

${rows}
${warnings.length ? `\n${warnings.join("\n")}\n` : ""}
■ 次のアクション
内容を確認して承認してください。承認すると、店舗へ予約ページURLと
管理画面のログイン情報が自動で送られます。

承認画面：${BASE_URL}/admin/invites
入力内容：${BASE_URL}/onboard/${token}
`,
    });
}

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

        // 公開に足る内容かを検証する。ここが緩いと、部屋0件や料金0円のまま
        // 承認・公開できてしまい、予約できない店舗ページや ¥0 予約が生まれる。
        const errors = validateIntakeForPublish(data, {
            hasFallbackEmail: Boolean(intake.contactEmail?.trim()),
        });
        if (errors.length) {
            return NextResponse.json({ error: errors.join("\n"), errors }, { status: 400 });
        }

        const now = new Date().toISOString();
        const db = initializeAdmin();
        await db.collection(INTAKE_COLLECTION).doc(token).update({
            data,
            status: "submitted",
            submittedAt: now,
            updatedAt: now,
        });

        // 運営へ提出通知（失敗しても提出は成立させる）
        try {
            await notifySubmitted(token, intake, data);
        } catch (e) {
            console.error("【提出通知メール失敗】:", e);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("【提出APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
