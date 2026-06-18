"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllStudios } from '@/lib/db-studio';

const ADMIN_CREDENTIALS = {
    email: (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase(),
    password: (process.env.ADMIN_PASSWORD ?? "").trim()
};

// 環境変数が未設定の場合は運営管理者ログインを無効化（デフォルト資格情報での突破を防止）
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.warn("[SECURITY] ADMIN_EMAIL / ADMIN_PASSWORD が未設定です。運営管理者ログインは無効化されます。");
}

export async function adminLogin(formData: FormData, isPlatformLogin: boolean = false) {
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = (formData.get('password') as string)?.trim();

    console.log(`[AdminLogin] Attempting login for: ${email}`);

    // 1. Platform Admin Login (Strict Mode)
    if (isPlatformLogin) {
        // 資格情報が未設定なら拒否（fail-closed）
        if (!ADMIN_CREDENTIALS.email || !ADMIN_CREDENTIALS.password) {
            return { success: false, message: "運営管理者ログインは現在無効です。管理者にお問い合わせください。" };
        }
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const cookieStore = await cookies();
            cookieStore.set('__session', JSON.stringify({ type: 'admin', token: 'platform_auth' }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            });
            return { success: true };
        }
        return { success: false, message: "運営管理者IDまたはパスワードが正しくありません。" };
    }

    // 3. Studio Accounts Login (Default)
    let studios: any[] = [];

    // Try local JSON fallback, then Firestore
    try {
        const fs = await import('fs');
        const path = await import('path');
        const studioPath = path.join(process.cwd(), 'data', 'studios.json');
        if (fs.existsSync(studioPath)) {
            studios = JSON.parse(fs.readFileSync(studioPath, 'utf-8'));
        }
    } catch (e) {
        console.error("[AdminLogin] Local load failed:", e);
    }

    if (studios.length === 0) {
        studios = await getAllStudios();
    }

    // Check staff accounts (including owner as staff)
    for (const s of studios) {
        const staffMember = (s.staff || []).find((sm: any) => sm.email === email);
        if (staffMember) {
            // Verify password via verifyPassword (supports hash and plaintext)
            const { verifyPassword } = await import('@/lib/password');
            if (verifyPassword(password, staffMember.password || "")) {
                await storeLogin(s.id);
                return { success: true };
            }
        }
    }

    // Fallback: check main studio email with staff password
    const studio = studios.find((s: any) => s.email === email);
    if (studio) {
        // Find owner-level staff or use first staff with matching email
        const ownerStaff = (studio.staff || []).find((sm: any) => sm.email === email || sm.role === "admin");
        if (ownerStaff) {
            const { verifyPassword } = await import('@/lib/password');
            if (verifyPassword(password, ownerStaff.password || "")) {
                await storeLogin(studio.id);
                return { success: true };
            }
        }
    }

    console.log(`[AdminLogin] Login failed for ${email}`);
    return { success: false, message: "店舗IDまたはパスワードが正しくありません。" };
}

export async function storeLogin(studioId: string) {
    const cookieStore = await cookies();
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('__session', JSON.stringify({ type: 'studio', id: studioId }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
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
