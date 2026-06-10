import { NextResponse } from "next/server";

// 環境変数で管理。.envに ADMIN_EMAIL / ADMIN_PASSWORD を設定すること
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // 環境変数が未設定なら認証を拒否（デフォルト資格情報での突破を防止）
        if (!adminEmail || !adminPassword) {
            console.error("[SECURITY] ADMIN_EMAIL / ADMIN_PASSWORD が未設定のためログインを拒否しました。");
            return NextResponse.json({ success: false }, { status: 401 });
        }

        if (body?.email === adminEmail && body?.password === adminPassword) {
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false }, { status: 401 });
    } catch {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
