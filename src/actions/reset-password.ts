"use server";

import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import { getAllUsersFromFirestore, saveUserToFirestore } from '@/lib/db-firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Send Password Reset Email
export async function sendPasswordResetAction(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { success: false, message: 'メールアドレスを入力してください。' };
    }

    const users = await getAllUsersFromFirestore();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
        return { success: false, message: 'このメールアドレスは登録されていません。' };
    }

    // Generate Token
    const resetToken = uuidv4();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save Token to User
    const updatedUser = {
        ...user,
        resetToken,
        resetTokenExpiry
    };
    
    try {
        await saveUserToFirestore(updatedUser);
    } catch (e) {
        console.error('[Reset Password] Failed to save token:', e);
        return { success: false, message: 'エラーが発生しました。しばらく時間を置いてから再度お試しください。' };
    }

    // Send Email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    const emailFrom = process.env.EMAIL_FROM || 'Studi-Go <noreply@send.studi-go.com>';

    if (process.env.RESEND_API_KEY) {
        try {
            const { error } = await resend.emails.send({
                from: emailFrom,
                to: email,
                subject: '【Studi-Go】パスワード再設定のご案内',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #06b6d4;">パスワード再設定</h1>
                        <p>パスワードの再設定リクエストを受け付けました。</p>
                        <p>以下のボタンをクリックして、新しいパスワードを設定してください。</p>
                        <div style="margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #06b6d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">パスワードを再設定する</a>
                        </div>
                        <p>または、以下のURLをブラウザに貼り付けてください：</p>
                        <p>${resetUrl}</p>
                        <p>このリンクは1時間有効です。</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                        <p style="color: #666; font-size: 12px;">お心当たりがない場合は、このメールを無視してください。</p>
                    </div>
                `
            });

            if (error) {
                console.error('[Reset Password] Resend Error:', error);
                console.log(`[Reset Password] Reset URL for ${email}: ${resetUrl}`);
                return { success: false, message: 'メール送信に失敗しました。しばらく時間を置いてから再度お試しいただくか、サポートまでお問い合わせください。' };
            }

            console.log(`[Reset Password] Email sent to ${email} via Resend.`);
            return { success: true, message: 'パスワード再設定用のメールを送信しました。メールをご確認ください。' };
        } catch (error) {
            console.error('[Reset Password] Failed to send email:', error);
            console.log(`[Reset Password] Reset URL for ${email}: ${resetUrl}`);
            return { success: false, message: 'メール送信に失敗しました。しばらく時間を置いてから再度お試しください。' };
        }
    } else {
        console.log(`[Reset Password] No Resend API Key. Reset URL: ${resetUrl}`);
        return { success: false, message: 'メール送信サービスが設定されていません。管理者にお問い合わせください。' };
    }
}

// 2. Reset Password
export async function resetPasswordAction(formData: FormData) {
    const token = formData.get('token') as string;
    const password = formData.get('password') as string;

    if (!token || !password) {
        return { success: false, message: '無効なリクエストです。' };
    }

    const users = await getAllUsersFromFirestore();
    const user = users.find((u: any) => u.resetToken === token);

    if (!user) {
        return { success: false, message: '無効なまたは期限切れのリンクです。' };
    }

    // Check expiry
    if (user.resetTokenExpiry && user.resetTokenExpiry < Date.now()) {
        return { success: false, message: 'リンクの有効期限が切れています。もう一度リクエストしてください。' };
    }

    // Update Password and clear token
    const { resetToken, resetTokenExpiry, ...cleanUser } = user;
    const updatedUser = {
        ...cleanUser,
        password
    };

    try {
        await saveUserToFirestore(updatedUser);
        return { success: true, message: 'パスワードを変更しました。ログインしてください。' };
    } catch (e) {
        console.error('[Reset Password] Failed to update password:', e);
        return { success: false, message: 'パスワードの更新に失敗しました。' };
    }
}
