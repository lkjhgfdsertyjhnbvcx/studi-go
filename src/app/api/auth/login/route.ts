import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
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

        const q = query(collection(db, "users"), where("email", "==", email), limit(1));
        const snap = await getDocs(q);

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

        return NextResponse.json({
            success: true,
            userId: user.id || snap.docs[0].id,
            name: user.name,
        });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
    }
}
