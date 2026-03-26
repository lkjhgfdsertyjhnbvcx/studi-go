// 一時的なデバッグ用API - 確認後に削除する
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    return NextResponse.json({
        hasAdminEmail: !!email,
        adminEmailValue: email ? `${email.substring(0, 3)}***${email.substring(email.indexOf('@'))}` : "NOT SET (using fallback)",
        hasAdminPassword: !!password,
        adminPasswordHint: password ? `${password.substring(0, 3)}***` : "NOT SET (using fallback)",
        nodeEnv: process.env.NODE_ENV,
        fallbackEmail: "support@studi-go.com",
        fallbackPassword: "spt001@stg",
    });
}
