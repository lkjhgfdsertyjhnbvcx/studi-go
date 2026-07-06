// /api/admin/email - 運営側からユーザー・店舗へのメール送信
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM ?? "Studi-Go <noreply@studi-go.com>";

export async function POST(request: Request) {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const { recipientType, recipientIds, subject, body, fromName } = await request.json();

        if (!subject || !body) {
            return NextResponse.json({ error: "件名・本文は必須です" }, { status: 400 });
        }

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ error: "RESEND_API_KEYが設定されていません。Vercelの環境変数に追加してください。" }, { status: 500 });
        }

        let emails: { to: string; name: string }[] = [];

        if (recipientType === "all_users") {
            const snap = await adminDb.collection("users").get();
            snap.docs.forEach(d => {
                const data = d.data();
                if (data.email) emails.push({ to: data.email, name: data.name || data.email });
            });
        } else if (recipientType === "all_studios") {
            const snap = await adminDb.collection("studios").get();
            snap.docs.forEach(d => {
                const data = d.data();
                if (data.email) emails.push({ to: data.email, name: data.storeName || data.email });
            });
        } else if (recipientType === "specific" && Array.isArray(recipientIds)) {
            recipientIds.forEach((email: string) => emails.push({ to: email, name: email }));
        }

        if (emails.length === 0) {
            return NextResponse.json({ error: "送信先が見つかりません" }, { status: 400 });
        }

        // Send in batches of 10 to avoid rate limits
        const BATCH = 10;
        let sent = 0;
        let failed = 0;

        for (let i = 0; i < emails.length; i += BATCH) {
            const batch = emails.slice(i, i + BATCH);
            await Promise.allSettled(
                batch.map(({ to, name }) =>
                    resend.emails.send({
                        from: FROM_EMAIL,
                        to,
                        subject,
                        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                            <div style="background:#1a1a2e;padding:24px;border-radius:12px 12px 0 0;">
                                <img src="https://studi-go.com/login_logo.png" alt="Studi-Go" style="height:32px;" />
                            </div>
                            <div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
                                <p style="color:#374151;font-size:14px;margin-bottom:8px;">${name} 様</p>
                                <div style="color:#111827;font-size:15px;line-height:1.7;white-space:pre-wrap;">${body.replace(/\n/g, "<br/>")}</div>
                                <hr style="margin:32px 0;border-color:#e5e7eb;" />
                                <p style="color:#9ca3af;font-size:12px;">このメールはStudi-Goプラットフォームから送信されています。</p>
                            </div>
                        </div>`,
                    }).then(() => sent++).catch(() => failed++)
                )
            );
        }

        return NextResponse.json({ success: true, sent, failed, total: emails.length });
    } catch (error: any) {
        console.error("[admin/email POST]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
