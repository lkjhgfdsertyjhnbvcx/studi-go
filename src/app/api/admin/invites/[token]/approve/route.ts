// 運営：提出内容を承認 → studios に本登録（非公開）＋店舗アカウント発行＋案内メール送信
//
// 260808: 承認と公開を分離した。承認は「内容を確認してアカウントを発行する」までで、
// 公開するかどうかは店舗がダッシュボードの「🚀 公開する」で決める。
//
// 背景（260807）:
//   以前はここで studios に書き込むだけで終わっていた。そのため
//     - 店舗の staff が作られず、/store/login に誰も入れない（ダッシュボード到達不能）
//     - 承認しても店舗に何も通知されない → 運営が毎回手でメールを書く必要があった
//     - 任意項目（背景画像）が undefined のまま set() され、承認が 500 で落ちた
//   という状態だった。承認1クリックで「公開 → アカウント発行 → 案内メール」まで
//   完結させ、手動の追伸メールを不要にする。
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { hashPassword } from "@/lib/password";
import { v4 as uuidv4 } from "uuid";
import { INTAKE_COLLECTION, intakeToStudioProfile, validateIntakeForPublish, type StoreIntake } from "@/lib/intake";
import { VOWCHA_REFERRALS, type VowchaReferral } from "@/lib/vowcha";

export const dynamic = "force-dynamic";

const BASE_URL = "https://studi-go.com";
const FROM = process.env.MAIL_FROM ?? "Studi-Go <info@studi-go.com>";
const INTERNAL_NOTIFY = "info@studi-go.com";
const GUIDE_PDF_URL = `${BASE_URL}/Studi-Go_店舗ガイド.pdf`;
const RESEND = new Resend(process.env.RESEND_API_KEY);

/**
 * Firestore Admin SDK は ignoreUndefinedProperties を設定していないため、
 * undefined を含むオブジェクトを set() すると throw する。
 * 正規の保存経路 saveStudioToFirestore は undefined を落としているが、
 * ここは生の set() を使うので同じ処理を通す。
 */
function stripUndefined<T>(value: T): T {
    if (Array.isArray(value)) return value.map((v) => stripUndefined(v)) as unknown as T;
    if (value && typeof value === "object") {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            if (v === undefined) continue;
            out[k] = stripUndefined(v);
        }
        return out as unknown as T;
    }
    return value;
}

/** 初回ログイン用の仮パスワード。読み間違えやすい 0/O/1/l/I は除外する。 */
function generateTempPassword(): string {
    const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(randomBytes(12), (b) => chars[b % chars.length]).join("");
}

function escapeHtml(s: string): string {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

type Approval = {
    storeName: string;
    contactName: string;
    /** 公開後に使われる予約ページURL（この時点ではまだ非公開） */
    publicUrl: string;
    loginUrl: string;
    loginEmail: string;
    tempPassword: string;
};

function approvalText(a: Approval): string {
    return `${a.storeName}
${a.contactName ? `${a.contactName} 様` : "ご担当者 様"}

お世話になっております。Studi-Go（スタジゴ）です。

ご登録いただいた店舗情報を確認し、店舗管理画面のアカウントを発行いたしました。
まずは管理画面にログインして、内容をご確認ください。

■ 店舗管理画面

ログインURL：${a.loginUrl}
　　　　ID　：${a.loginEmail}
仮パスワード：${a.tempPassword}

初回ログイン後、管理画面の「スタッフ管理」からパスワードの変更を
お願いいたします。仮パスワードはこのメールにのみ記載しています。

■ 次のステップ：内容をご確認のうえ、公開してください

現在、お店の予約ページは【非公開】です。お客様にはまだ表示されません。
管理画面の「店舗情報」から内容をご確認いただき、準備が整いましたら
「🚀 公開する」ボタンを押してください。押した時点で公開されます。

公開前に、下記をご確認いただくとページの見栄えがよくなります。
・店舗の写真、スタジオ（部屋）の写真の登録
・料金・営業時間に誤りがないか

■ 公開後の予約ページURL

${a.publicUrl}

公開するとこのURLが有効になります。ホームページやSNS、店頭のQRコードに
掲載していただければ、お客様が24時間いつでも予約できます。

■ 管理画面でできること

・予約の確認、電話予約の手入力、キャンセル対応
・料金や営業時間の変更
・お客様情報の管理

■ 操作マニュアル

${GUIDE_PDF_URL}

管理画面の左メニュー最下部「操作マニュアル」からいつでも開けます。

内容のご確認で分からない点や、こちらで公開まで代行したほうがよろしければ、
このメールにそのままご返信ください。お電話でのご相談も承ります。

引き続きよろしくお願いいたします。

────────────────────
Studi-Go（スタジゴ）
音楽スタジオ専用の予約管理システム
株式会社JOCOLLA
東京都渋谷区東 3-14-22-401
${BASE_URL}/information
────────────────────
`;
}

function approvalHtml(a: Approval): string {
    return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif;color:#4a4a4a;line-height:1.7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.05);">
        <tr>
          <td style="background:linear-gradient(180deg,#16161f 0%,#0d0d15 100%);padding:32px 40px;color:#fff;">
            <div style="font-size:10px;font-weight:700;letter-spacing:3px;color:#c9a96e;text-transform:uppercase;">Your Account Is Ready</div>
            <div style="font-size:22px;font-weight:800;margin-top:8px;color:#ffffff;letter-spacing:0.5px;">Studi-Go（スタジゴ）</div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="font-size:20px;font-weight:700;color:#1a1a1a;margin:0 0 20px;line-height:1.5;">${escapeHtml(a.storeName)}<br>${escapeHtml(a.contactName || "ご担当者")} 様</h1>
            <p style="font-size:14px;margin:0 0 24px;">ご登録いただいた店舗情報を確認し、店舗管理画面のアカウントを発行いたしました。<br>まずは管理画面にログインして、内容をご確認ください。</p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#fff8e6;border:1px solid #f0d9a0;border-radius:10px;padding:16px;margin:0 0 20px;">
              <tr><td style="font-size:13px;color:#7a5c1e;">
                <strong>現在、お店の予約ページは「非公開」です。</strong><br>
                お客様にはまだ表示されません。内容をご確認いただき、管理画面の「🚀 公開する」ボタンを押した時点で公開されます。
              </td></tr>
            </table>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef;border-radius:10px;padding:24px;margin:0 0 24px;">
              <tr><td>
                <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#b08d57;text-transform:uppercase;margin-bottom:8px;">Step 1</div>
                <div style="font-size:16px;font-weight:700;color:#1a1a1a;margin-bottom:6px;">店舗管理画面へのログイン</div>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:13px;margin-bottom:14px;">
                  <tr><td style="padding:4px 0;color:#888;width:110px;">ログインURL</td><td style="padding:4px 0;color:#1a1a1a;word-break:break-all;">${a.loginUrl}</td></tr>
                  <tr><td style="padding:4px 0;color:#888;">ID</td><td style="padding:4px 0;color:#1a1a1a;word-break:break-all;">${escapeHtml(a.loginEmail)}</td></tr>
                  <tr><td style="padding:4px 0;color:#888;">仮パスワード</td><td style="padding:4px 0;color:#1a1a1a;font-family:monospace;font-size:15px;font-weight:700;">${escapeHtml(a.tempPassword)}</td></tr>
                </table>
                <a href="${a.loginUrl}" style="display:inline-block;background:#b08d57;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;">管理画面にログイン →</a>
                <div style="font-size:11px;color:#aaa;margin-top:14px;">初回ログイン後、「スタッフ管理」からパスワードの変更をお願いいたします。仮パスワードはこのメールにのみ記載しています。</div>
              </td></tr>
            </table>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef;border-radius:10px;padding:24px;margin:0 0 24px;">
              <tr><td>
                <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#b08d57;text-transform:uppercase;margin-bottom:8px;">Step 2</div>
                <div style="font-size:16px;font-weight:700;color:#1a1a1a;margin-bottom:6px;">内容をご確認のうえ、公開する</div>
                <div style="font-size:12px;color:#888;margin-bottom:12px;">管理画面の「店舗情報」で内容をご確認ください。下記を登録いただくとページの見栄えがよくなります。</div>
                <ul style="font-size:13px;color:#4a4a4a;padding-left:20px;margin:0 0 14px;">
                  <li>店舗の写真、スタジオ（部屋）の写真</li>
                  <li>料金・営業時間に誤りがないか</li>
                </ul>
                <div style="font-size:12px;color:#888;margin-bottom:8px;">準備ができたら「🚀 公開する」を押してください。公開後の予約ページURLはこちらです。</div>
                <div style="font-size:11px;color:#aaa;word-break:break-all;">${a.publicUrl}</div>
              </td></tr>
            </table>

            <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#b08d57;text-transform:uppercase;margin-bottom:10px;">操作マニュアル</div>
            <p style="font-size:14px;margin:0 0 24px;"><a href="${GUIDE_PDF_URL}" style="color:#b08d57;">Studi-Go 店舗ガイド（PDF）</a><br><span style="font-size:12px;color:#888;">管理画面の左メニュー最下部「操作マニュアル」からもいつでも開けます。</span></p>

            <hr style="border:none;border-top:1px solid #e8e5e0;margin:24px 0;">
            <div style="font-size:12px;color:#888;">内容のご確認で分からない点や、こちらで公開まで代行したほうがよろしければ、このメールへのご返信、または <a href="mailto:${INTERNAL_NOTIFY}" style="color:#b08d57;">${INTERNAL_NOTIFY}</a> までお気軽にお知らせください。</div>
          </td>
        </tr>
        <tr>
          <td style="background:#1a1a1a;padding:24px 40px;color:rgba(255,255,255,0.6);font-size:11px;">
            <div>Studi-Go｜音楽スタジオ専用の予約管理システム</div>
            <div style="margin-top:6px;">株式会社JOCOLLA　東京都渋谷区東 3-14-22-401</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const { token } = await params;
        const db = initializeAdmin();
        const ref = db.collection(INTAKE_COLLECTION).doc(token);
        const snap = await ref.get();

        if (!snap.exists) {
            return NextResponse.json({ error: "招待が見つかりません" }, { status: 404 });
        }
        const intake = snap.data() as StoreIntake;

        if (intake.status === "approved") {
            return NextResponse.json({ error: "すでに承認済みです", studioId: intake.studioId }, { status: 409 });
        }
        // 運営が /admin/invites から直接承認する経路もあるため、提出APIと同じ検証をここでも通す。
        const intakeData = intake.data;
        const problems = validateIntakeForPublish(intakeData, {
            hasFallbackEmail: Boolean(intake.contactEmail?.trim()),
        });
        if (problems.length) {
            return NextResponse.json(
                { error: `この内容では公開できません:\n・${problems.join("\n・")}`, problems },
                { status: 400 },
            );
        }

        // validateIntakeForPublish が null を弾いている（型を絞るための明示ガード）
        if (!intakeData) {
            return NextResponse.json({ error: "入力内容がありません" }, { status: 400 });
        }

        // 連絡先メール: onboard の入力を優先し、無ければ申込フォームのメールを使う。
        // どちらも無いと案内メールが送れないので、その場合は承認自体を止める。
        const loginEmail = (intakeData.email || intake.contactEmail || "").trim();
        if (!loginEmail) {
            return NextResponse.json(
                { error: "メールアドレスが未入力です。店舗の連絡先メールが無いとログイン情報を発行できません。" },
                { status: 400 },
            );
        }

        const studio = intakeToStudioProfile(intakeData) as Record<string, any>;
        const now = new Date().toISOString();

        // ---- 店舗アカウント（staff）を発行 ----
        // /api/store/login は studios[].staff[] の email + password を照合する。
        // ここで作らないと、承認しても店舗は管理画面に一切入れない。
        const tempPassword = generateTempPassword();
        studio.staff = [
            {
                id: uuidv4(),
                name: intakeData.contactPerson || intake.contactName || intakeData.storeName,
                email: loginEmail,
                password: hashPassword(tempPassword),
                role: "admin",
                mustChangePassword: true,
                createdAt: now,
            },
        ];
        if (!studio.email) studio.email = loginEmail;

        // ---- プラン ----
        // planKey が無いと /api/store/update-full が「プラン未選択」とみなして
        // isPublished を false に戻すため、承認時点で必ず free を入れておく。
        // 申込フォームの希望プランは planRequested として保持し、課金設定が済んだ時点で
        // 運営が planKey を引き上げる（自己申告だけで有料機能を開けないため）。
        studio.planKey = "free";
        if (intake.planRequested) studio.planRequested = intake.planRequested;
        if (intake.planOptions) studio.planOptionsRequested = intake.planOptions;
        if (intake.planPayMethod) studio.planPayMethod = intake.planPayMethod;

        // 乗り換えキャンペーン招待なら、有料プラン2ヶ月無料(60日トライアル)を初期セット。
        // 店舗がダッシュボードでカード契約する際、store.planTrialDays が Stripe に渡り自動適用される。
        if (intake.campaign === "switch-2m") {
            studio.planTrialDays = 60;
            studio.campaign = "switch-2m";
        }

        await db.collection("studios").doc(studio.id).set(stripUndefined(studio));

        // VOWCHA同意済みなら紹介料管理（vowchaReferrals）に登録
        if (studio.useActivaCoupon === true) {
            const referralId = uuidv4();
            const referral: VowchaReferral = {
                id: referralId,
                studioId: studio.id,
                storeName: studio.storeName,
                postalCode: studio.postalCode || "",
                address: studio.address || "",
                phone: studio.phone || "",
                email: studio.email || "",
                contactPerson: studio.contactPerson || "",
                consentAt: intake.submittedAt || now,
                source: "intake",
                createdAt: now,
                exportedAt: null,
                invoiceId: null,
            };
            await db.collection(VOWCHA_REFERRALS).doc(referralId).set(stripUndefined(referral));
        }

        await ref.update({
            status: "approved",
            approvedAt: now,
            updatedAt: now,
            studioId: studio.id,
            // 仮パスワードは studios にはハッシュでしか残らない。
            // 案内メールが2通とも失敗すると誰も平文を知らない状態になり、
            // 再承認も409で弾かれて復旧手段が無くなるため、運営専用の
            // storeIntakes（Admin SDK 経由でしか読めない）に控えを残す。
            // 店舗がパスワードを変更したら不要になるので、運営側で消して構わない。
            issuedLoginEmail: loginEmail,
            issuedTempPassword: tempPassword,
        });

        // ---- 店舗へ公開完了 + ログイン情報を送る ----
        // メール送信に失敗しても承認自体は成立させる（Firestore はすでに更新済み）。
        // 失敗した場合は運営通知で分かるようにし、仮パスワードを添えて手動フォローできるようにする。
        const approval: Approval = {
            storeName: studio.storeName,
            contactName: intakeData.contactPerson || intake.contactName || "",
            publicUrl: `${BASE_URL}/studio/${studio.id}`,
            loginUrl: `${BASE_URL}/store/login`,
            loginEmail,
            tempPassword,
        };

        let mailSent = false;
        let mailError: string | undefined;
        try {
            const r = await RESEND.emails.send({
                from: FROM,
                to: loginEmail,
                replyTo: INTERNAL_NOTIFY,
                subject: `【Studi-Go】店舗アカウントを発行しました／内容のご確認と公開のお願い（${studio.storeName}）`,
                html: approvalHtml(approval),
                text: approvalText(approval),
            });
            if (r.error) mailError = r.error.message ?? String(r.error);
            else mailSent = true;
        } catch (e) {
            mailError = e instanceof Error ? e.message : String(e);
        }
        if (!mailError) mailError = undefined;

        // ---- 運営への控え ----
        try {
            await RESEND.emails.send({
                from: FROM,
                to: INTERNAL_NOTIFY,
                replyTo: loginEmail,
                subject: `${mailSent ? "✅" : "【要手動対応】"}【承認】${studio.storeName} のアカウントを発行しました（まだ非公開）`,
                text: `【承認・アカウント発行】${studio.storeName}

案内メール : ${mailSent ? `✅ 送信済み（${loginEmail}）` : `❌ 送信失敗 — ${mailError ?? "原因不明"}`}
公開状態   : 🔒 非公開（店舗がダッシュボードの「公開する」を押すと公開されます）

予約ページ : ${approval.publicUrl}（公開後に有効）
管理ログイン: ${approval.loginUrl}
　　　　ID : ${loginEmail}
仮パスワード: ${tempPassword}

ルーム数   : ${(studio.rooms ?? []).length}
希望プラン : ${intake.planRequested ?? "（不明）"}（planKey は free で登録済み。課金設定後に引き上げてください）
支払方法   : ${intake.planPayMethod ?? "（不明）"}
studioId   : ${studio.id}

${mailSent ? "店舗の公開操作を待ってください。数日たっても公開されない場合はフォローを。" : "【要手動対応】案内メールが届いていません。上記の内容を手動で送ってください。"}
`,
            });
        } catch (e) {
            console.error("【承認：運営通知エラー】:", e);
        }

        return NextResponse.json({
            success: true,
            studioId: studio.id,
            publicUrl: approval.publicUrl,
            mailSent,
            mailError,
            // 承認直後に管理画面へ表示して、運営が控えられるようにする
            loginEmail,
            tempPassword,
        });
    } catch (error: any) {
        console.error("【招待承認APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
