import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { verifyPassword } from "@/lib/password";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください" }, { status: 400 });
        }

        const q = query(collection(db, "users"), where("email", "==", email), limit(1));
        const snap = await getDocs(q);

        if (snap.empty) {
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
        }

        const user = snap.docs[0].data() as any;

        if (!verifyPassword(password, user.password || "")) {
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
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
