import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { verifyPassword } from "@/lib/password";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        console.log("【店舗ログイン】リクエスト受信:", { email, hasPassword: !!password });

        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください" }, { status: 400 });
        }

        // Client SDKでFirestoreからスタジオ一覧を取得
        const snapshot = await getDocs(collection(db, "studios"));
        const studios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];
        console.log("【店舗ログイン】スタジオ数:", studios.length);

        // 全スタジオのスタッフを検索
        for (const s of studios) {
            const staffList = s.staff ?? [];
            for (const sm of staffList) {
                if (sm.email === email) {
                    console.log("【店舗ログイン】スタッフ発見:", { studioName: s.storeName, staffEmail: sm.email, hasStoredPassword: !!sm.password, storedPasswordPrefix: sm.password ? sm.password.substring(0, 10) + "..." : "none" });
                    const passwordMatch = verifyPassword(password, sm.password || "");
                    console.log("【店舗ログイン】パスワード照合結果:", passwordMatch);
                    if (passwordMatch) {
                        return NextResponse.json({
                            success: true,
                            storeId: s.id,
                            staffId: sm.id,
                            name: s.storeName,
                            role: sm.role,
                        });
                    }
                }
            }
        }

        console.log("【店舗ログイン】認証失敗: 該当するスタッフが見つかりません");
        return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    } catch (error: any) {
        console.error("【店舗ログインAPIエラー】:", error.message, error.stack);
        return NextResponse.json({ error: `サーバーエラー: ${error.message}` }, { status: 500 });
    }
}
