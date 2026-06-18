import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { verifyPassword } from "@/lib/password";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください" }, { status: 400 });
        }

        // レート制限チェック（メールアドレス単位）
        const rateLimitKey = `store:${email.toLowerCase()}`;
        const rateCheck = checkRateLimit(rateLimitKey);
        if (!rateCheck.allowed) {
            const retryMinutes = Math.ceil((rateCheck.retryAfterMs || 0) / 60000);
            return NextResponse.json({
                error: `ログイン試行回数が上限に達しました。${retryMinutes}分後に再度お試しください。`,
            }, { status: 429 });
        }

        // Client SDKでFirestoreからスタジオ一覧を取得
        const snapshot = await getDocs(collection(db, "studios"));
        const studios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];

        // 全スタジオのスタッフを検索
        for (const s of studios) {
            const staffList = s.staff ?? [];
            for (const sm of staffList) {
                if (sm.email === email) {
                    const passwordMatch = verifyPassword(password, sm.password || "");
                    if (passwordMatch) {
                        // ログイン成功 → 試行カウントをクリア
                        clearAttempts(rateLimitKey);
                        const res = NextResponse.json({
                            success: true,
                            storeId: s.id,
                            staffId: sm.id,
                            name: s.storeName,
                            role: sm.role,
                        });
                        // __session クッキーをセットして API 認証に使えるようにする
                        res.cookies.set("__session", JSON.stringify({ type: "studio", id: s.id }), {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            path: "/",
                            maxAge: 60 * 60 * 24, // 1 day
                        });
                        return res;
                    }
                }
            }
        }

        recordFailedAttempt(rateLimitKey);
        return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    } catch (error: any) {
        console.error("【店舗ログインAPIエラー】:", error.message);
        return NextResponse.json({ error: `サーバーエラー: ${error.message}` }, { status: 500 });
    }
}
