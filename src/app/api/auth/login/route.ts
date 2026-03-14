import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyPassword } from "@/lib/password";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください" }, { status: 400 });
        }

        // メールでユーザー検索（Admin SDK使用）
        const snap = await adminDb.collection("users").where("email", "==", email).limit(1).get();
        if (snap.empty) {
            return NextResponse.json({ error: "認証失敗" }, { status: 401 });
        }

        const user = snap.docs[0].data() as any;

        // パスワード検証（ハッシュ・平文どちらも対応）
        if (!verifyPassword(password, user.password || "")) {
            return NextResponse.json({ error: "認証失敗" }, { status: 401 });
        }

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
