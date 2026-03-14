// /api/auth/line - LINEログイン開始（LINEのOAuth画面へリダイレクト）
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const redirectAfter = searchParams.get("redirect") || "/";

    const channelId = process.env.LINE_CHANNEL_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!channelId) {
        return NextResponse.json({ error: "LINE_CHANNEL_IDが設定されていません" }, { status: 500 });
    }

    const callbackUrl = `${baseUrl}/api/auth/line/callback`;
    const state = Buffer.from(JSON.stringify({ redirect: redirectAfter, ts: Date.now() })).toString("base64url");

    const lineAuthUrl = new URL("https://access.line.me/oauth2/v2.1/authorize");
    lineAuthUrl.searchParams.set("response_type", "code");
    lineAuthUrl.searchParams.set("client_id", channelId);
    lineAuthUrl.searchParams.set("redirect_uri", callbackUrl);
    lineAuthUrl.searchParams.set("scope", "profile openid email");
    lineAuthUrl.searchParams.set("state", state);

    return NextResponse.redirect(lineAuthUrl.toString());
}
