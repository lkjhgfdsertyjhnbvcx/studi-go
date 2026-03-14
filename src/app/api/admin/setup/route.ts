import { NextResponse } from "next/server";

// 管理者認証情報は環境変数で管理するため、このエンドポイントは不要になりました
// .env に ADMIN_EMAIL / ADMIN_PASSWORD を設定してください
export async function GET() {
    return NextResponse.json({
        message: "管理者認証情報は環境変数（.env）で設定してください。ADMIN_EMAIL / ADMIN_PASSWORD",
    });
}
