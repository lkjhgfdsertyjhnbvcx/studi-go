"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllStudios } from '@/lib/db-studio';

const ADMIN_CREDENTIALS = {
    email: "admin@antigravity.com",
    password: "admin"
};

export async function adminLogin(formData: FormData, isPlatformLogin: boolean = false) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. Platform Admin Login (Strict Mode)
    if (isPlatformLogin) {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const cookieStore = await cookies();
            cookieStore.set('__session', JSON.stringify({ type: 'admin', token: 'platform_auth' }), {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 // 1 day
            });
            return { success: true };
        }
        return { success: false, message: "運営管理者IDまたはパスワードが正しくありません。" };
    }

    // 2. Studio Accounts Login (Default)
    const studios = await getAllStudios();

    // Check main studio email
    const studio = studios.find(s => s.email === email);
    if (studio) {
        // For simplicity, we use 'admin' as default password for studio main accounts for now
        // In a real app, this would be a hashed password in the DB
        if (password === 'admin') {
            await storeLogin(studio.id);
            return { success: true };
        }
    }

    // Check staff accounts
    for (const s of studios) {
        const staffMember = s.staff?.find(sm => sm.email === email && sm.password === password);
        if (staffMember) {
            await storeLogin(s.id);
            return { success: true };
        }
    }

    return { success: false, message: "店舗IDまたはパスワードが正しくありません。" };
}

export async function storeLogin(studioId: string) {
    const cookieStore = await cookies();
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('__session', JSON.stringify({ type: 'studio', id: studioId }), {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
    });
    return { success: true };
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('__session');
    redirect('/admin/login');
}

export async function getAuthInfo() {
    const cookieStore = await cookies();
    const session = cookieStore.get('__session')?.value;

    if (!session) return { isAdmin: false, studioId: null };

    try {
        const data = JSON.parse(session);
        return {
            isAdmin: data.type === 'admin',
            studioId: data.type === 'studio' ? data.id : null
        };
    } catch (e) {
        return { isAdmin: false, studioId: null };
    }
}

export async function checkAdminAuth() {
    const auth = await getAuthInfo();
    return auth.isAdmin || !!auth.studioId;
}

export async function requireAdminAuth() {
    const auth = await getAuthInfo();
    const isAuth = auth.isAdmin || !!auth.studioId;

    if (!isAuth) {
        // Fallback to platform login if no tokens at all
        redirect('/admin/platform/login');
    }
}
