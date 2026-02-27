"use server";

import { revalidatePath } from "next/cache";
import { getStudioByIdFromFirestore } from "@/lib/db-firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const SUPPORT_EMAIL = "support@studi-go.com";

export async function sendInternalInquiryAction(data: {
    subject: string;
    message: string;
    studioId: string;
    studioName: string;
    personName: string;
    senderEmail: string;
}) {
    const studio = await getStudioByIdFromFirestore(data.studioId);
    const studioManagerEmail = studio?.email || studio?.representativeEmail || "manager@studio-go.com";

    try {
        // 1. Send to Platform Support (The user specifically expecting this)
        await resend.emails.send({
            from: "Studi-Go Support <system@studi-go.com>",
            to: SUPPORT_EMAIL,
            subject: `【店舗問い合わせ】${data.subject}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #0891b2;">新規スタジオ問い合わせ</h2>
                    <p><strong>送信者:</strong> ${data.personName} (${data.senderEmail})</p>
                    <p><strong>店舗:</strong> ${data.studioName} (ID: ${data.studioId})</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>件名:</strong> ${data.subject}</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                        ${data.message}
                    </div>
                </div>
            `,
        });

        // 2. Optional: Also send to Store Manager for record (as the UI states)
        if (studioManagerEmail !== SUPPORT_EMAIL) {
            await resend.emails.send({
                from: "Studi-Go System <system@studi-go.com>",
                to: studioManagerEmail,
                subject: `【控え】サポートへの問い合わせ: ${data.subject}`,
                html: `
                    <p>${data.personName} 様</p>
                    <p>以下の内容でサポートへ問い合わせを送信しました。</p>
                    <div style="border-left: 4px solid #0891b2; padding-left: 15px; margin: 20px 0;">
                        <p><strong>件名:</strong> ${data.subject}</p>
                        <p>${data.message}</p>
                    </div>
                `,
            });
        }

        console.log(`[Support] Emails sent successfully for studio: ${data.studioName}`);
        return { success: true, message: "お問い合わせを送信しました。" };
    } catch (error) {
        console.error("[Support Error] Failed to send email via Resend:", error);
        return { success: false, message: "メール送信中にエラーが発生しました。" };
    }
}

export async function contactPlatformAction(data: {
    subject: string;
    message: string;
    senderEmail: string;
    senderName: string;
    studioId?: string;
}) {
    try {
        await resend.emails.send({
            from: "Studi-Go Support <system@studi-go.com>",
            to: SUPPORT_EMAIL,
            replyTo: data.senderEmail,
            subject: `【運営問い合わせ】${data.subject}`,
            html: `
                <h2>運営への問い合わせ</h2>
                <p><strong>送信者:</strong> ${data.senderName} (${data.senderEmail})</p>
                <p><strong>スタジオID:</strong> ${data.studioId || 'N/A'}</p>
                <hr />
                <p><strong>内容:</strong></p>
                <div style="white-space: pre-wrap;">${data.message}</div>
            `,
        });
        return { success: true, message: "運営管理者にメッセージを送信しました。" };
    } catch (error) {
        console.error("[Support Error] Failed to contact platform:", error);
        return { success: false, message: "送信に失敗しました。" };
    }
}

export async function sendStoreReminderAction(studioId: string, studioEmail: string, studioName: string) {
    try {
        await resend.emails.send({
            from: "Studi-Go Admin <admin@studi-go.com>",
            to: studioEmail,
            subject: "【重要】店舗管理に関するお知らせ",
            html: `
                <h2>Studi-Go プラットフォーム運営より</h2>
                <p>${studioName} 様</p>
                <p>管理アカウントの状態に関する重要なお知らせです。ダッシュボードをご確認ください。</p>
            `,
        });
        return { success: true, message: `${studioName} にリマインドメールを送信しました。` };
    } catch (error) {
        console.error("[Support Error] Failed to send reminder:", error);
        return { success: false, message: "リマインド送信に失敗しました。" };
    }
}
