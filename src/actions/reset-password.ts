"use server";

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

const USERS_DB_PATH = path.join(process.cwd(), 'data', 'users.json');
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper functions
const getUsers = (): any[] => {
    if (!fs.existsSync(USERS_DB_PATH)) return [];
    try {
        const data = fs.readFileSync(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

const saveUsers = (users: any[]) => {
    fs.writeFileSync(USERS_DB_PATH, JSON.stringify(users, null, 2));
}

// 1. Send Password Reset Email
export async function sendPasswordResetAction(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { success: false, message: 'メールアドレスを入力してください。' };
    }

    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.email === email);
    const user = users[userIndex];

    if (!user) {
        return { success: false, message: 'このメールアドレスは登録されていません。' };
    }

    // Generate Token
    const resetToken = uuidv4();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save Token to User
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    users[userIndex] = user;
    saveUsers(users);

    // Send Email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    if (process.env.RESEND_API_KEY) {
        try {
            const { error } = await resend.emails.send({
                from: 'Studi-Go <onboarding@resend.dev>',
                to: email,
                subject: '【Studi-Go】パスワード再設定のご案内',
                html: `
                    <h1>パスワード再設定</h1>
                    <p>パスワードの再設定リクエストを受け付けました。</p>
                    <p>以下のリンクをクリックして、新しいパスワードを設定してください。</p>
                    <p><a href="${resetUrl}">${resetUrl}</a></p>
                    <p>このリンクは1時間有効です。</p>
                    <p>お心当たりがない場合は、このメールを無視してください。</p>
                `
            });

            if (error) {
                console.error('[Reset Password] ❌ Resend Error (Returned):', error);
                console.log(`[Reset Password] ⚠️ Email failed. DEV MODE: Reset URL is ${resetUrl}`);
                // For development convenience, return success with the link if email fails
                return { success: true, message: `(開発モード) メール送信に失敗しましたが、リセットURLを発行しました: ${resetUrl}` };
            }

            console.log(`[Reset Password] 📧 Email sent to ${email} via Resend.`);
            return { success: true, message: 'パスワード再設定用のメールを送信しました。' };
        } catch (error) {
            console.error('[Reset Password] ❌ Failed to send email via Resend (Exception):', error);
            // In dev/debug
            console.log(`[Reset Password] 🧪 DEV MODE: Reset URL is ${resetUrl}`);
            return { success: true, message: 'メール送信に失敗しました。(Dev: コンソールを確認)' };
        }
    } else {
        console.log(`[Reset Password] ⚠️ No Resend API Key. DEV MODE: Reset URL is ${resetUrl}`);
        return { success: true, message: '送信しました(Dev: コンソールを確認してください)' };
    }
}

// 2. Reset Password
export async function resetPasswordAction(formData: FormData) {
    const token = formData.get('token') as string;
    const password = formData.get('password') as string;

    if (!token || !password) {
        return { success: false, message: '無効なリクエストです。' };
    }

    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.resetToken === token);
    const user = users[userIndex];

    if (!user) {
        return { success: false, message: '無効なまたは期限切れのリンクです。' };
    }

    // Check expiry
    if (user.resetTokenExpiry && user.resetTokenExpiry < Date.now()) {
        return { success: false, message: 'リンクの有効期限が切れています。もう一度リクエストしてください。' };
    }

    // Update Password
    user.password = password;
    // Clear token
    delete user.resetToken;
    delete user.resetTokenExpiry;

    users[userIndex] = user;
    saveUsers(users);

    return { success: true, message: 'パスワードを変更しました。ログインしてください。' };
}
