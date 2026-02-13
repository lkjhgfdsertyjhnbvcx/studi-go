"use server";

import { cookies } from 'next/headers';
import { getAllUsersFromFirestore } from '@/lib/db-firestore';

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
        return { success: false, message: 'メールアドレスを入力してください。' };
    }

    const users = await getAllUsersFromFirestore();
    const user = users.find(u => u.email === email);

    if (!user) {
        return { success: false, message: 'ユーザーが見つかりません。アカウント登録はお済みですか？' };
    }

    // Verify password
    if (!user.password) {
        return { success: false, message: 'パスワードが設定されていません。「パスワードをお忘れですか？」から設定を行ってください。' };
    }

    if (user.password !== password) {
        return { success: false, message: 'パスワードが間違っています。' };
    }

    const cookieStore = await cookies();
    cookieStore.set('__session', JSON.stringify({ type: 'user', id: user.id, name: user.name }), {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return { success: true, message: 'ログインしました。' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('__session');
    return { success: true };
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get('__session')?.value;
    if (!session) return null;

    try {
        const data = JSON.parse(session);
        if (data.type !== 'user') return null;

        const users = await getAllUsersFromFirestore();
        return users.find(u => u.id === data.id) || null;
    } catch (e) {
        return null;
    }
}
