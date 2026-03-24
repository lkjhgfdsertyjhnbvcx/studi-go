import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Admin SDKでstudiosを全件取得
        const snapshot = await adminDb.collection("studios").get();
        const studios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];

        // メインの店舗メールアドレスで検索
        const studio = studios.find((s: any) => s.email === email);

        if (!studio) {
            // スタッフメールアドレスでも検索
            const matchedByStaff = studios.find((s: any) =>
                s.staff?.some((sm: any) => sm.email === email && sm.password === password)
            );
            if (!matchedByStaff) {
                return NextResponse.json({ error: "認証失敗" }, { status: 401 });
            }
            const staffMember = matchedByStaff.staff.find(
                (sm: any) => sm.email === email && sm.password === password
            );
            return NextResponse.json({
                success: true,
                storeId: matchedByStaff.id,
                name: matchedByStaff.storeName,
                role: staffMember.role,
            });
        }

        // スタッフ認証
        const staff = studio.staff?.find(
            (s: any) => s.email === email && s.password === password
        );

        if (!staff) {
            return NextResponse.json({ error: "認証失敗" }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            storeId: studio.id,
            name: studio.storeName,
            role: staff.role,
        });
    } catch (error: any) {
        console.error("【店舗ログインAPIエラー】:", error.message);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
