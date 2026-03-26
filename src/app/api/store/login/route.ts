import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { verifyPassword } from "@/lib/password";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください" }, { status: 400 });
        }

        // Client SDKでFirestoreからスタジオ一覧を取得
        const snapshot = await getDocs(collection(db, "studios"));
        const studios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];

        // 1. スタッフメールアドレス + パスワードで検索
        for (const s of studios) {
            const staffMember = (s.staff ?? []).find(
                (sm: any) => sm.email === email
            );
            if (staffMember && verifyPassword(password, staffMember.password || "")) {
                return NextResponse.json({
                    success: true,
                    storeId: s.id,
                    staffId: staffMember.id,
                    name: s.storeName,
                    role: staffMember.role,
                });
            }
        }

        // 2. 店舗メインメール + パスワードで検索（後方互換）
        const studio = studios.find((s: any) => s.email === email);
        if (studio) {
            const staff = (studio.staff ?? []).find(
                (s: any) => s.email === email
            );
            if (staff && verifyPassword(password, staff.password || "")) {
                return NextResponse.json({
                    success: true,
                    storeId: studio.id,
                    staffId: staff.id,
                    name: studio.storeName,
                    role: staff.role,
                });
            }
        }

        return NextResponse.json({ error: "認証失敗" }, { status: 401 });
    } catch (error: any) {
        console.error("【店舗ログインAPIエラー】:", error.message);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
