import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyPassword } from "@/lib/password";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rate-limit";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください" }, { status: 400 });
        }

        // レート制限チェック（メールアドレス単位）
        const rateLimitKey = `auth:${email.toLowerCase()}`;
        const rateCheck = checkRateLimit(rateLimitKey);
        if (!rateCheck.allowed) {
            const retryMinutes = Math.ceil((rateCheck.retryAfterMs || 0) / 60000);
            return NextResponse.json({
                error: `ログイン試行回数が上限に達しました。${retryMinutes}分後に再度お試しください。`,
            }, { status: 429 });
        }

        const snap = await adminDb.collection("users").where("email", "==", email).limit(1).get();

        if (snap.empty) {
            recordFailedAttempt(rateLimitKey);
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
        }

        const user = snap.docs[0].data() as any;

        if (!verifyPassword(password, user.password || "")) {
            recordFailedAttempt(rateLimitKey);
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
        }

        // ログイン成功 → 試行カウントをクリア
        clearAttempts(rateLimitKey);

        const resolvedId = user.id || snap.docs[0].id;
        const res = NextResponse.json({
            success: true,
            userId: resolvedId,
            name: user.name,
        });
        // IDOR対策: 署名付きユーザーセッションクッキーを発行
        const { createUserSessionValue, userSessionCookieOptions } = await import("@/lib/user-session");
        const { name: cookieName, ...opts } = userSessionCookieOptions();
        res.cookies.set(cookieName, createUserSessionValue(resolvedId), opts);
        return res;
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
    }
}
