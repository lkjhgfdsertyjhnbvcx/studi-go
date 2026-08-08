// 申し込みフォーム（studigo_apply.html）の受付API
//
// 背景:
//   従来 studigo_apply.html は ACCESS_KEY 未設定のまま `mailto:` でお客さんの
//   メーラーを起動する方式だった。そのため
//     - 自動返信が送れない（サーバーを経由していない）
//     - Firestore にも Supabase にも記録が残らない
//     - アウトリーチの追撃メールが止まらない
//   という状態で、260804 の T.I.G Sounds 様の申し込みは6時間放置になった。
//
// 処理:
//   1) Firestore `applications` に保存
//   2) 申込者へ受付の自動返信
//   3) info@studi-go.com へ内部通知
//   4) アウトリーチDBへ同期（該当スタジオが居れば追撃メールを停止）
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { syncLeadToOutreach } from "@/lib/outreach-sync";
import { INTAKE_COLLECTION, emptyIntakeData, type StoreIntake } from "@/lib/intake";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// 差出人。send.studi-go.com は Resend（info@jocolla.com アカウント）で Verified 済み。
// 260804: Resend の Insights が "Don't use no-reply" を指摘。no-reply@ は受信者側の
// エンゲージメント評価を下げ、迷惑メール判定を招きやすいため info@ に変更した。
// 実際の返信は Reply-To の info@studi-go.com（有人）で受ける。
// 送信経路ごと切り替えたい場合は MAIL_FROM で上書きできる（コード修正・再デプロイ不要）。
// 260804: send.studi-go.com は送信実績が乏しく、一般Gmailで迷惑メール送りになった。
// 実績のある studi-go.com（cwc-inc アカウントで Verified・アウトリーチで毎日送信）に統一する。
// info@studi-go.com は実在する有人アドレスなので、no-reply より信頼されやすい。
const FROM = process.env.MAIL_FROM ?? "Studi-Go <info@studi-go.com>";
const INTERNAL_NOTIFY = "info@studi-go.com";
const BASE_URL = "https://studi-go.com";
const RESEND = new Resend(process.env.RESEND_API_KEY);

const GUIDE_PDF_URL = `${BASE_URL}/Studi-Go_店舗ガイド.pdf`;

type Application = {
    id: string;
    shop: string;
    name: string;
    email: string;
    pref: string;
    tel: string;
    plan: string;
    option: string;
    payment: string;
    rooms: string;
    locations: string;
    message: string;
    /** 流入元LP（"switch" = 乗り換えLP / "start" = 新規LP / "" = 直接） */
    lp: string;
    status: "new";
    createdAt: string;
};

/**
 * 乗り換えLP（lp-switch.html）は「有料プラン2ヶ月無料」を訴求している。
 * 承認時に intake.campaign === "switch-2m" を見て planTrialDays に 60 を入れる実装は
 * 以前からあったが、申込フォームが流入元を送っていなかったため一度も到達していなかった。
 */
function campaignFromLp(lp: string): string | null {
    return lp === "switch" ? "switch-2m" : null;
}

function escapeHtml(s: string): string {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// honorific: 申込者本人へ送る控えでは氏名に敬称を付ける。
// 社内通知では付けない（呼び捨てで問題なく、様が付くとかえって読みにくい）。
function detailRows(
    a: Application,
    opts: { honorific?: boolean } = {},
): Array<[string, string]> {
    return [
        ["店舗・スタジオ名", a.shop],
        ["ご担当者名", opts.honorific ? `${a.name} 様` : a.name],
        ["都道府県", a.pref],
        ["電話番号", a.tel],
        ["ご希望プラン", a.plan],
        ["オプション", a.option],
        ["お支払い方法", a.payment],
        ["ルーム数", a.rooms],
        ["拠点数", a.locations],
    ];
}

function autoReplyText(a: Application, onboardUrl: string): string {
    const rows = detailRows(a, { honorific: true })
        .map(([k, v]) => `　${k}：${v}`)
        .join("\n");
    return `${a.shop}
${a.name} 様

このたびは Studi-Go へのお申し込みをいただき、誠にありがとうございます。
以下の内容で承りました。

${rows}

■ 次のステップ：店舗情報のご登録

下記の専用リンクから、店舗情報のご登録をお願いいたします。
所要時間は10分ほどです。

${onboardUrl}

ご登録いただく内容:
・スタジオの基本情報（住所・電話番号・営業時間）
・ルームの情報と料金設定
・予約の受付ルール（受付開始・締切など）

途中で「下書き保存」すれば、同じURLからいつでも再開できます。

■ 操作マニュアル

入力方法に迷われた際は、こちらをご参照ください。
${GUIDE_PDF_URL}

■ その後の流れ

ご登録の内容を確認のうえ、こちらで公開の準備を進めます。
準備が整いましたら、予約ページのURLをご案内します。
そのURLをホームページやSNSに掲載いただければ、その日から
オンラインでの予約受付を開始できます。

ご不明な点は、このメールにそのままご返信ください。

────────────────────
Studi-Go（スタジゴ）
音楽スタジオ専用の予約管理システム
株式会社JOCOLLA
東京都渋谷区東 3-14-22-401
${BASE_URL}/information
────────────────────
`;
}

function autoReplyHtml(a: Application, onboardUrl: string): string {
    const rows = detailRows(a, { honorific: true })
        .map(
            ([k, v]) =>
                `<tr><td style="padding:6px 12px;color:#888;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#1a1a1a">${escapeHtml(v)}</td></tr>`,
        )
        .join("");

    return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif;color:#4a4a4a;line-height:1.7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.05);">
        <tr>
          <td style="background:linear-gradient(180deg,#16161f 0%,#0d0d15 100%);padding:32px 40px;color:#fff;">
            <div style="font-size:10px;font-weight:700;letter-spacing:3px;color:#c9a96e;text-transform:uppercase;">Music Studio Booking System</div>
            <div style="font-size:22px;font-weight:800;margin-top:8px;color:#ffffff;letter-spacing:0.5px;">Studi-Go（スタジゴ）</div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="font-size:20px;font-weight:700;color:#1a1a1a;margin:0 0 20px;line-height:1.5;">${escapeHtml(a.shop)}<br>${escapeHtml(a.name)} 様</h1>
            <p style="font-size:14px;margin:0 0 24px;">このたびは Studi-Go へのお申し込みをいただき、誠にありがとうございます。<br>以下の内容で承りました。</p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef;border-radius:10px;margin:0 0 24px;font-size:13px;">
              ${rows}
            </table>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef;border-radius:10px;padding:24px;margin:0 0 24px;">
              <tr><td>
                <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#b08d57;text-transform:uppercase;margin-bottom:8px;">Next Step</div>
                <div style="font-size:16px;font-weight:700;color:#1a1a1a;margin-bottom:6px;">店舗情報のご登録（約10分）</div>
                <div style="font-size:12px;color:#888;margin-bottom:16px;">住所・営業時間、ルームと料金、予約の受付ルールをご登録ください。途中で「下書き保存」すれば、同じURLからいつでも再開できます。</div>
                <a href="${onboardUrl}" style="display:inline-block;background:#b08d57;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;margin-right:8px;">店舗情報を登録する →</a>
                <a href="${GUIDE_PDF_URL}" style="display:inline-block;background:#ffffff;color:#b08d57;border:1px solid #b08d57;text-decoration:none;padding:11px 24px;border-radius:8px;font-weight:700;font-size:14px;">操作マニュアル</a>
                <div style="font-size:11px;color:#aaa;margin-top:14px;word-break:break-all;">リンクが開けない場合はこちらをコピーしてください：<br>${onboardUrl}</div>
              </td></tr>
            </table>

            <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#b08d57;text-transform:uppercase;margin-bottom:10px;">その後の流れ</div>
            <ol style="font-size:14px;padding-left:20px;margin:0 0 24px;">
              <li>ご登録の内容を確認のうえ、こちらで公開の準備を進めます</li>
              <li>準備が整いましたら、予約ページのURLをご案内します</li>
              <li>そのURLを掲載いただければ、その日から予約受付を開始できます</li>
            </ol>

            <hr style="border:none;border-top:1px solid #e8e5e0;margin:24px 0;">
            <div style="font-size:12px;color:#888;">ご不明な点がございましたら、このメールへのご返信、または <a href="mailto:${INTERNAL_NOTIFY}" style="color:#b08d57;">${INTERNAL_NOTIFY}</a> までお気軽にお問い合わせください。</div>
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

type AutoReplyStatus = { sent: boolean; messageId?: string; error?: string };

function internalNotifyText(
    a: Application,
    onboardUrl: string | null,
    reply: AutoReplyStatus,
): string {
    const rows = detailRows(a)
        .map(([k, v]) => `${k}：${v}`)
        .join("\n");

    // 何が自動で行われ、何が残っているかを先頭に置く
    const statusLines = [
        `自動返信メール : ${reply.sent ? `✅ 送信済み（${a.email}）` : `❌ 送信失敗 — ${reply.error ?? "原因不明"}`}`,
        `招待リンク発行 : ${onboardUrl ? "✅ 発行済み・上記メールに同梱" : "❌ 発行失敗"}`,
        `操作マニュアル : ${reply.sent ? "✅ 同メールに同梱" : "—"}`,
        `流入元LP　　　 : ${a.lp || "（直接・不明）"}${campaignFromLp(a.lp) ? " → 有料プラン2ヶ月無料の対象（承認時に自動適用）" : ""}`,
    ].join("\n");

    const todo = !reply.sent
        ? `【要手動対応】申込者へ受付連絡が届いていません。
${onboardUrl ? `招待リンクは発行済みなので、下記URLを添えて手動で連絡してください。\n${onboardUrl}` : "/admin/invites で招待リンクを発行し、手動で連絡してください。"}`
        : !onboardUrl
          ? `【要手動対応】受付連絡は届きましたが、登録リンクが入っていません。
/admin/invites で発行して追送してください。`
          : `次のアクション: 先方の登録完了を待ち、/admin/invites で内容を確認して承認する`;

    return `【お申し込み】${a.shop}

■ 自動処理の結果
${statusLines}

■ 申込内容
${rows}

ご質問・ご要望：
${a.message}

受信日時：${a.createdAt}
Application ID：${a.id}
${reply.messageId ? `自動返信 Message ID：${reply.messageId}` : ""}
${onboardUrl ? `登録リンク：${onboardUrl}` : ""}

${todo}
`;
}

/**
 * 申し込みを受けたら、店舗情報の登録リンク（招待）を自動発行する。
 * status は 'pending' のままなので、公開には運営の承認が別途必要。
 * 発行に失敗しても申し込み自体は成立させる（メールは手動フォローに切り替える）。
 */
async function issueInvite(a: Application): Promise<string | null> {
    try {
        const token = randomBytes(24).toString("hex");
        const now = new Date().toISOString();
        const intake: StoreIntake = {
            id: token,
            label: a.shop,
            note: `${now.slice(0, 10)} 申込フォームより自動発行 / ${a.plan} / ${a.payment} / ${a.pref} / ${a.name} ${a.tel}${campaignFromLp(a.lp) ? " / 乗り換え2ヶ月無料キャンペーン" : ""}`,
            status: "pending",
            data: emptyIntakeData(a.shop),
            createdAt: now,
            updatedAt: now,
            ...(campaignFromLp(a.lp) ? { campaign: campaignFromLp(a.lp)! } : {}),
            // 承認時に引き継ぐ申込情報。onboard でメール未入力のまま提出されても
            // ここの contactEmail 宛にログイン情報を送れるようにしておく。
            applicationId: a.id,
            contactName: a.name,
            contactEmail: a.email,
            planRequested: a.plan,
            planOptions: a.option,
            planPayMethod: a.payment,
        };
        await adminDb.collection(INTAKE_COLLECTION).doc(token).set(intake);
        return `${BASE_URL}/onboard/${token}`;
    } catch (e) {
        console.error("applications issueInvite failed:", e);
        return null;
    }
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const shop = String(body?.shop ?? "").trim();
        const name = String(body?.name ?? "").trim();
        const email = String(body?.email ?? "").trim();

        if (!shop || !name || !email) {
            return NextResponse.json(
                { error: "店舗名・ご担当者名・メールアドレスは必須です。" },
                { status: 400, headers: CORS_HEADERS },
            );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "メールアドレスの形式が正しくありません。" },
                { status: 400, headers: CORS_HEADERS },
            );
        }

        const s = (v: unknown, max = 200, fallback = "") =>
            v ? String(v).slice(0, max) : fallback;

        const app: Application = {
            id: uuidv4(),
            shop: shop.slice(0, 200),
            name: name.slice(0, 100),
            email: email.slice(0, 200),
            pref: s(body?.pref, 20),
            tel: s(body?.tel, 50),
            plan: s(body?.plan, 100, "未選択"),
            option: s(body?.option, 300, "なし"),
            payment: s(body?.payment, 100, "未選択"),
            rooms: s(body?.rooms, 20, "未記入"),
            locations: s(body?.locations, 20, "未記入"),
            message: s(body?.message, 2000, "なし"),
            lp: s(body?.lp, 20),
            status: "new",
            createdAt: new Date().toISOString(),
        };

        // ---- Firestore 保存（失敗したら 500） ----
        await adminDb.collection("applications").doc(app.id).set(app);

        // ---- 店舗登録用の招待リンクを自動発行 ----
        const onboardUrl = await issueInvite(app);

        // ---- 申込者への自動返信 ----
        // 内部通知に「送れたかどうか」を載せるため、先に送って結果を確定させる。
        // Gmail/Yahoo の一括送信者要件（RFC 8058）。これが無いと消費者向け Gmail に
        // 静かに破棄されることがある。lp-leads の自動返信と同じヘッダーを付ける。
        const AUTO_REPLY_HEADERS: Record<string, string> = {
            "List-Unsubscribe": `<mailto:${INTERNAL_NOTIFY}?subject=unsubscribe>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        };

        const reply: AutoReplyStatus = { sent: false };
        try {
            const r = await RESEND.emails.send({
                from: FROM,
                to: app.email,
                replyTo: INTERNAL_NOTIFY,
                headers: AUTO_REPLY_HEADERS,
                subject: onboardUrl
                    ? `【Studi-Go】お申し込みありがとうございます／店舗情報のご登録のお願い`
                    : `【Studi-Go】お申し込みありがとうございます（${app.shop}）`,
                html: autoReplyHtml(app, onboardUrl ?? `${BASE_URL}/information`),
                text: autoReplyText(app, onboardUrl ?? "（担当より改めてご案内します）"),
            });
            if (r.error) {
                reply.error = r.error.message ?? String(r.error);
            } else {
                reply.sent = true;
                reply.messageId = r.data?.id;
            }
        } catch (e) {
            reply.error = e instanceof Error ? e.message : String(e);
        }
        if (!reply.sent) {
            console.error("applications auto-reply failed:", reply.error);
        }

        // ---- 運営への通知（自動返信の送信結果を含める） ----
        const allOk = reply.sent && Boolean(onboardUrl);
        try {
            await RESEND.emails.send({
                from: FROM,
                to: INTERNAL_NOTIFY,
                replyTo: app.email,
                subject: `${allOk ? "✅" : "【要手動対応】"}【お申し込み】Studi-Go（${app.shop}）${allOk ? " 受付連絡・登録リンク送信済み" : ""}`,
                text: internalNotifyText(app, onboardUrl, reply),
            });
        } catch (e) {
            console.error("applications internal-notify failed:", e);
        }

        // ---- アウトリーチDBへ同期（追撃メールを止める） ----
        const sync = await syncLeadToOutreach({
            id: app.id,
            storeName: app.shop,
            email: app.email,
            phone: app.tel,
            interest: "application",
            currentSystem: "",
            source: "studigo_apply",
            variant: null,
            createdAt: app.createdAt,
            kind: "application",
            extraNote: `プラン：${app.plan}／支払：${app.payment}／ルーム${app.rooms}・拠点${app.locations}`,
        });
        if (!sync.ok) {
            console.error("applications outreach sync failed:", sync.error);
        } else {
            console.log(
                `applications outreach sync: matched=${sync.matched} studios=${sync.studioIds.length} ` +
                    `rules=[${sync.rules.join(",")}] repliesInserted=${sync.repliesInserted}`,
            );
        }

        return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    } catch (error: unknown) {
        console.error("applications error:", error);
        return NextResponse.json(
            { error: "送信に失敗しました。" },
            { status: 500, headers: CORS_HEADERS },
        );
    }
}
