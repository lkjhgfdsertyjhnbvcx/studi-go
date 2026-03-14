import { NextResponse } from "next/server";

// 環境変数で管理。.envに ADMIN_EMAIL / ADMIN_PASSWORD を設定すること
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const adminEmail = process.env.ADMIN_EMAIL ?? "kantoku@studi-go.com";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "password123";

        if (body.email === adminEmail && body.password === adminPassword) {
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false }, { status: 401 });
    } catch (error: any) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
