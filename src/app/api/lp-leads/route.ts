// LPからの資料請求・相談リード受付API
// 単体HTMLのLP（lp-switch.html / lp-start.html）から fetch で呼ばれるため CORS 対応
// フォーム送信後：
//   1) Firestore lpLeads に保存
//   2) 送信者にケース別の自動返信メール（PDF ダウンロードリンク付）
//   3) info@studi-go.com に内部通知メール
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// jocolla Resend アカウントの認証済みドメイン（DKIM/SPF Verified）から送信
const FROM = "Studi-Go <noreply@send.studi-go.com>";
const INTERNAL_NOTIFY = "info@studi-go.com";
const BASE_URL = "https://studi-go.com";
const RESEND = new Resend(process.env.RESEND_API_KEY);

type Source = "lp-start" | "lp-switch" | "unknown";
type Interest = "docs" | "consult" | "demo";

// ================================================================
// メール本文テンプレート
// ================================================================

// 資料誘導先：Web版（詳細版HTML）と PDF 版（同内容）の両方を案内
// - Web版：`studigo_information_kit_detailed.html`（ブラウザで即開ける）
// - PDF版：`Studi-Go_ご案内資料_詳細版.pdf`（保存・印刷に）
const KIT_WEB_URL = `${BASE_URL}/studigo_information_kit_detailed.html`;
const KIT_PDF_URL = `${BASE_URL}/Studi-Go_ご案内資料_詳細版.pdf`;
const APPLY_URL = `${BASE_URL}/studigo_apply.html`;

function subjectFor(source: Source, interest: Interest): string {
    const base = "【Studi-Go】";
    if (source === "lp-switch") {
        if (interest === "consult") return `${base}乗り換えご相談のご依頼、ありがとうございます`;
        if (interest === "demo") return `${base}デモのご希望、ありがとうございます（乗り換え）`;
        return `${base}乗り換えご検討ありがとうございます（資料をお送りします）`;
    }
    if (interest === "consult") return `${base}導入相談のご依頼、ありがとうございます`;
    if (interest === "demo") return `${base}デモのご希望、ありがとうございます`;
    return `${base}資料請求ありがとうございます`;
}

function contextText(source: Source, interest: Interest): string {
    if (source === "lp-switch") {
        if (interest === "consult")
            return "他社予約システムからの乗り換えのご相談を承りました。現在のご利用状況に合わせて、移行プランとコスト比較をご案内します。";
        if (interest === "demo")
            return "乗り換えを前提としたデモのご希望を承りました。担当より、日程調整のご連絡を差し上げます。";
        return "他社予約システムからの乗り換えご検討、ありがとうございます。まずは下記の資料をご覧いただき、詳細のご相談は担当までご連絡ください。";
    }
    if (interest === "consult")
        return "音楽スタジオ運営における予約管理システム導入のご相談を承りました。現状のオペレーションに合わせて、導入プランをご提案します。";
    if (interest === "demo")
        return "デモのご希望を承りました。担当より、日程調整のご連絡を差し上げます。";
    return "音楽スタジオ専用の予約管理システム Studi-Go の資料請求、ありがとうございます。まずは下記の資料をご覧いただければ幸いです。";
}

function autoReplyHtml(params: {
    storeName: string;
    source: Source;
    interest: Interest;
}): string {
    const { storeName, source, interest } = params;
    const context = contextText(source, interest);

    const nextStepsHtml =
        interest === "docs"
            ? `<li>資料をご確認のうえ、ご不明点があればお気軽にご返信ください。</li>
               <li>そのままお申込みも可能です（<a href="${APPLY_URL}" style="color:#b08d57;">お申込みフォーム</a>）。</li>`
            : interest === "consult"
              ? `<li>1営業日以内に担当より、ご相談に関するご連絡を差し上げます。</li>
                 <li>お急ぎの場合は <a href="mailto:${INTERNAL_NOTIFY}" style="color:#b08d57;">${INTERNAL_NOTIFY}</a> までご連絡ください。</li>`
              : `<li>1営業日以内に担当より、デモ日程の候補をご案内します。</li>
                 <li>ご希望日時があれば、そのままメール返信でお知らせください。</li>`;

    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0; padding:0; background:#f5f3ef; font-family:'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif; color:#4a4a4a; line-height:1.7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(180deg,#16161f 0%,#0d0d15 100%); padding:32px 40px; color:#fff;">
              <div style="font-size:10px; font-weight:700; letter-spacing:3px; color:#c9a96e; text-transform:uppercase;">Music Studio Booking System</div>
              <div style="font-size:22px; font-weight:800; margin-top:8px; color:#ffffff; letter-spacing:0.5px;">Studi-Go（スタジゴ）</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="font-size:20px; font-weight:700; color:#1a1a1a; margin:0 0 20px; line-height:1.5;">${escapeHtml(
                  storeName,
              )}様<br>お問い合わせありがとうございました。</h1>
              <p style="font-size:14px; color:#4a4a4a; margin:0 0 24px;">${context}</p>

              <!-- Document Access -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f5f3ef; border-radius:10px; padding:24px; margin:0 0 24px;">
                <tr>
                  <td>
                    <div style="font-size:10px; font-weight:700; letter-spacing:2px; color:#b08d57; text-transform:uppercase; margin-bottom:8px;">Document</div>
                    <div style="font-size:16px; font-weight:700; color:#1a1a1a; margin-bottom:6px;">Studi-Go ご案内資料（詳細版）</div>
                    <div style="font-size:12px; color:#888; margin-bottom:16px;">機能・活用例・料金・よくある質問まで、まとめてご覧いただけます。</div>
                    <a href="${KIT_WEB_URL}" style="display:inline-block; background:#b08d57; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:8px; font-weight:700; font-size:14px; margin-right:8px;">Web版で見る →</a>
                    <a href="${KIT_PDF_URL}" style="display:inline-block; background:#ffffff; color:#b08d57; border:1px solid #b08d57; text-decoration:none; padding:11px 24px; border-radius:8px; font-weight:700; font-size:14px;">PDFをダウンロード</a>
                  </td>
                </tr>
              </table>

              <!-- Next steps -->
              <div style="font-size:10px; font-weight:700; letter-spacing:2px; color:#b08d57; text-transform:uppercase; margin-bottom:10px;">Next Steps</div>
              <ol style="font-size:14px; color:#4a4a4a; padding-left:20px; margin:0 0 24px;">
                ${nextStepsHtml}
              </ol>

              <!-- Contact -->
              <hr style="border:none; border-top:1px solid #e8e5e0; margin:24px 0;">
              <div style="font-size:12px; color:#888; line-height:1.7;">
                ご不明な点がございましたら、このメールへのご返信、または <a href="mailto:${INTERNAL_NOTIFY}" style="color:#b08d57;">${INTERNAL_NOTIFY}</a> までお気軽にお問い合わせください。
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#1a1a1a; padding:24px 40px; color:rgba(255,255,255,0.6); font-size:11px;">
              <div>Studi-Go｜音楽スタジオ専用の予約管理システム</div>
              <div style="margin-top:6px;">株式会社JOCOLLA　東京都渋谷区東 3-14-22-401</div>
              <div style="margin-top:6px;">
                <a href="${BASE_URL}/information" style="color:rgba(255,255,255,0.7); text-decoration:none;">公式サイト</a>
                <a href="${BASE_URL}/company" style="color:rgba(255,255,255,0.7); text-decoration:none;">運営会社</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function autoReplyText(params: {
    storeName: string;
    source: Source;
    interest: Interest;
}): string {
    const { storeName, source, interest } = params;
    return `${storeName}様

お問い合わせありがとうございました。
${contextText(source, interest)}

■ Studi-Go ご案内資料（詳細版）
機能・活用例・料金・よくある質問まで、まとめてご覧いただけます。
Web版：${KIT_WEB_URL}
PDF版：${KIT_PDF_URL}

■ Next Steps
${
    interest === "docs"
        ? `・資料をご確認のうえ、ご不明点があればお気軽にご返信ください。
・そのままお申込みも可能です： ${APPLY_URL}`
        : interest === "consult"
          ? `・1営業日以内に担当より、ご相談に関するご連絡を差し上げます。
・お急ぎの場合は ${INTERNAL_NOTIFY} までご連絡ください。`
          : `・1営業日以内に担当より、デモ日程の候補をご案内します。
・ご希望日時があれば、そのままメール返信でお知らせください。`
}

────────────────────
Studi-Go（スタジゴ）
音楽スタジオ専用の予約管理システム
株式会社JOCOLLA
東京都渋谷区東 3-14-22-401
${BASE_URL}/information
────────────────────
`;
}

function internalNotifyText(params: {
    storeName: string;
    email: string;
    phone: string;
    interest: Interest;
    currentSystem: string;
    source: Source;
    variant: string | null;
    createdAt: string;
    id: string;
}): string {
    const interestLabel: Record<Interest, string> = {
        docs: "資料請求",
        consult: "相談希望",
        demo: "デモ希望",
    };
    return `【新規リード】${params.source} / ${interestLabel[params.interest]}

スタジオ名：${params.storeName}
メール：${params.email}
電話：${params.phone || "（未入力）"}
今の予約管理：${params.currentSystem || "（未入力）"}
A/Bバリアント：${params.variant || "（不明）"}
受信日時：${params.createdAt}
Lead ID：${params.id}

管理：https://console.firebase.google.com/project/_/firestore/data/~2FlpLeads~2F${params.id}
`;
}

function escapeHtml(s: string): string {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ================================================================
// Route Handlers
// ================================================================

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { storeName, email, phone, interest, currentSystem, source, variant } = body || {};

        // ---- 入力バリデーション ----
        if (!storeName || !email) {
            return NextResponse.json(
                { error: "スタジオ名とメールアドレスは必須です。" },
                { status: 400, headers: CORS_HEADERS },
            );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
            return NextResponse.json(
                { error: "メールアドレスの形式が正しくありません。" },
                { status: 400, headers: CORS_HEADERS },
            );
        }

        // ---- 正規化 ----
        const normInterest: Interest = ["docs", "consult", "demo"].includes(interest)
            ? (interest as Interest)
            : "docs";
        const normSource: Source = ["lp-switch", "lp-start"].includes(source)
            ? (source as Source)
            : "unknown";
        const normVariant: string | null =
            typeof variant === "string" && ["A", "B"].includes(variant) ? variant : null;

        const lead = {
            id: uuidv4(),
            storeName: String(storeName).slice(0, 200),
            email: String(email).slice(0, 200),
            phone: phone ? String(phone).slice(0, 50) : "",
            interest: normInterest,
            currentSystem: currentSystem ? String(currentSystem).slice(0, 200) : "",
            source: normSource,
            variant: normVariant,
            status: "new" as const,
            createdAt: new Date().toISOString(),
        };

        // ---- Firestore 保存（失敗したら 500 で返す） ----
        await adminDb.collection("lpLeads").doc(lead.id).set(lead);

        // ---- 自動返信・内部通知（失敗しても本フローは成功扱い） ----
        // await で完了を待つ（Vercelサーバレスはレスポンス後にfire-and-forgetが切られるため）
        const emailSource: Source = normSource === "unknown" ? "lp-start" : normSource;
        const subject = subjectFor(emailSource, normInterest);

        const mailResults = await Promise.allSettled([
            RESEND.emails.send({
                from: FROM,
                to: lead.email,
                subject,
                html: autoReplyHtml({
                    storeName: lead.storeName,
                    source: emailSource,
                    interest: normInterest,
                }),
                text: autoReplyText({
                    storeName: lead.storeName,
                    source: emailSource,
                    interest: normInterest,
                }),
            }),
            RESEND.emails.send({
                from: FROM,
                to: INTERNAL_NOTIFY,
                replyTo: lead.email,
                subject: `【新規リード】${lead.storeName}（${emailSource} / ${normInterest}）`,
                text: internalNotifyText({
                    storeName: lead.storeName,
                    email: lead.email,
                    phone: lead.phone,
                    interest: normInterest,
                    currentSystem: lead.currentSystem,
                    source: emailSource,
                    variant: normVariant,
                    createdAt: lead.createdAt,
                    id: lead.id,
                }),
            }),
        ]);

        mailResults.forEach((r, i) => {
            const kind = i === 0 ? "auto-reply" : "internal-notify";
            if (r.status === "rejected") {
                console.error(`lp-leads mail(${kind}) failed:`, r.reason);
            } else {
                console.log(`lp-leads mail(${kind}) sent:`, r.value);
            }
        });

        return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    } catch (error: any) {
        console.error("lp-leads error:", error);
        return NextResponse.json(
            { error: "送信に失敗しました。" },
            { status: 500, headers: CORS_HEADERS },
        );
    }
}
