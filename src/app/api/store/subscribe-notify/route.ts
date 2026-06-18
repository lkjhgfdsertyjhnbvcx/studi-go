import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "support@studi-go.com";
const FROM_EMAIL = "Studi-Go <noreply@studi-go.com>";

const PLAN_NAMES: Record<string, string> = {
    free: "フリープラン",
    light: "ライトプラン",
    standard: "スタンダードプラン",
    pro: "プロプラン",
};

const PLAN_PRICES: Record<string, number> = {
    free: 0,
    light: 2980,
    standard: 5980,
    pro: 12800,
};

const OPTION_NAMES: Record<string, string> = {
    custom_domain: "独自ドメイン",
    setup_support: "セットアップサポート",
    api_access: "API連携",
};

const OPTION_PRICES: Record<string, number> = {
    custom_domain: 1000,
    setup_support: 12000,
    api_access: 3000,
};

function formatDate(d: Date): string {
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function generateApplicationHTML(data: {
    storeName: string;
    companyName?: string;
    representative?: string;
    email: string;
    phone?: string;
    address?: string;
    planKey: string;
    options: string[];
    applicationDate: string;
    applicationId: string;
}) {
    const planName = PLAN_NAMES[data.planKey] || data.planKey;
    const planPrice = PLAN_PRICES[data.planKey] || 0;
    const optionRows = data.options.map(o => `
        <tr>
            <td style="padding:8px 12px;border:1px solid #ddd;">${OPTION_NAMES[o] || o}</td>
            <td style="padding:8px 12px;border:1px solid #ddd;text-align:right;">¥${(OPTION_PRICES[o] || 0).toLocaleString()}/月</td>
        </tr>
    `).join("");
    const optionTotal = data.options.reduce((s, o) => s + (OPTION_PRICES[o] || 0), 0);
    const total = planPrice + optionTotal;

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN',sans-serif;color:#333;max-width:680px;margin:0 auto;padding:20px;">

<div style="text-align:center;border-bottom:3px solid #7c3aed;padding-bottom:20px;margin-bottom:30px;">
    <h1 style="color:#7c3aed;font-size:24px;margin:0;">Studi-Go サービス利用申込書</h1>
    <p style="color:#666;font-size:12px;margin:8px 0 0;">Application Form</p>
</div>

<table style="width:100%;margin-bottom:24px;font-size:13px;">
    <tr>
        <td style="color:#666;">申込番号:</td>
        <td style="font-weight:bold;">${data.applicationId}</td>
        <td style="color:#666;">申込日:</td>
        <td style="font-weight:bold;">${data.applicationDate}</td>
    </tr>
</table>

<h2 style="font-size:16px;color:#7c3aed;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">申込者情報</h2>
<table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px;">
    <tr><td style="padding:6px 0;color:#666;width:140px;">店舗名</td><td style="padding:6px 0;font-weight:bold;">${data.storeName}</td></tr>
    ${data.companyName ? `<tr><td style="padding:6px 0;color:#666;">会社名</td><td style="padding:6px 0;">${data.companyName}</td></tr>` : ""}
    ${data.representative ? `<tr><td style="padding:6px 0;color:#666;">代表者 / 担当者</td><td style="padding:6px 0;">${data.representative}</td></tr>` : ""}
    <tr><td style="padding:6px 0;color:#666;">メールアドレス</td><td style="padding:6px 0;">${data.email}</td></tr>
    ${data.phone ? `<tr><td style="padding:6px 0;color:#666;">電話番号</td><td style="padding:6px 0;">${data.phone}</td></tr>` : ""}
    ${data.address ? `<tr><td style="padding:6px 0;color:#666;">住所</td><td style="padding:6px 0;">${data.address}</td></tr>` : ""}
</table>

<h2 style="font-size:16px;color:#7c3aed;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">申込プラン</h2>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px;">
    <thead>
        <tr style="background:#f9fafb;">
            <th style="padding:8px 12px;border:1px solid #ddd;text-align:left;">項目</th>
            <th style="padding:8px 12px;border:1px solid #ddd;text-align:right;">金額</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;">${planName}</td>
            <td style="padding:8px 12px;border:1px solid #ddd;text-align:right;">${planPrice === 0 ? "無料" : `¥${planPrice.toLocaleString()}/月`}</td>
        </tr>
        ${optionRows}
    </tbody>
    <tfoot>
        <tr style="background:#7c3aed;color:white;">
            <td style="padding:10px 12px;border:1px solid #7c3aed;font-weight:bold;">合計（税込）</td>
            <td style="padding:10px 12px;border:1px solid #7c3aed;text-align:right;font-weight:bold;font-size:16px;">${total === 0 ? "無料" : `¥${total.toLocaleString()}/月`}</td>
        </tr>
    </tfoot>
</table>

<h2 style="font-size:16px;color:#7c3aed;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">サービス提供者</h2>
<table style="width:100%;font-size:13px;margin-bottom:24px;">
    <tr><td style="padding:4px 0;color:#666;width:140px;">事業者名</td><td style="padding:4px 0;font-weight:bold;">株式会社ジョコラ スタジゴ事業部</td></tr>
    <tr><td style="padding:4px 0;color:#666;">サービス名</td><td style="padding:4px 0;">Studi-Go（スタジゴ）</td></tr>
    <tr><td style="padding:4px 0;color:#666;">連絡先</td><td style="padding:4px 0;">${ADMIN_EMAIL}</td></tr>
</table>

<div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px;font-size:12px;color:#666;">
    <p style="margin:0 0 8px;font-weight:bold;color:#333;">備考</p>
    <ul style="margin:0;padding-left:16px;">
        <li>本申込書はプラン申込時に自動生成されたものです。</li>
        <li>月額料金はお申込月の翌月より発生いたします。</li>
        <li>プランの変更・解約はダッシュボードからいつでも可能です。</li>
    </ul>
</div>

<div style="text-align:center;color:#999;font-size:11px;border-top:1px solid #e5e7eb;padding-top:16px;">
    <p>© ${new Date().getFullYear()} 株式会社ジョコラ スタジゴ事業部 / Studi-Go</p>
</div>

</body>
</html>`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { storeName, companyName, representative, email, phone, address, planKey, options = [] } = body;

        if (!storeName || !email || !planKey) {
            return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
        }

        const now = new Date();
        const applicationId = `SG-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}-${Math.random().toString(36).substring(2,8).toUpperCase()}`;
        const applicationDate = formatDate(now);

        const html = generateApplicationHTML({
            storeName, companyName, representative, email, phone, address,
            planKey, options, applicationDate, applicationId,
        });

        const subject = `【Studi-Go】サービス利用申込書 - ${storeName}様（${PLAN_NAMES[planKey] || planKey}）`;

        // 店舗へ送信
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({
                success: false,
                applicationId,
                error: "RESEND_API_KEY が設定されていません",
            }, { status: 500 });
        }

        const storeResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject,
            html,
        });

        // 運営者へ送信
        const adminResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `[運営控] ${subject}`,
            html,
        });

        return NextResponse.json({
            success: true,
            applicationId,
            message: "申込書を送信しました",
            debug: { storeResult, adminResult },
        });
    } catch (error: any) {
        console.error("申込書送信エラー:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
