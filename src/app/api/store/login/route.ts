import { NextResponse } from "next/server";
import { getAllStudiosFromFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const studios = await getAllStudiosFromFirestore();

        // 1. スタッフメールアドレス + パスワードで検索（メインの認証方法）
        for (const s of studios) {
            const staffMember = s.staff?.find(
                (sm: any) => sm.email === email && sm.password === password
            );
            if (staffMember) {
                return NextResponse.json({
                    success: true,
                    storeId: s.id,
                    name: s.storeName,
                    role: staffMember.role,
                });
            }
        }

        // 2. 店舗メインメール + パスワードで検索（後方互換）
        const studio = studios.find((s) => s.email === email);
        if (studio) {
            const staff = studio.staff?.find(
                (s: any) => s.email === email && s.password === password
            );
            if (staff) {
                return NextResponse.json({
                    success: true,
                    storeId: studio.id,
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
