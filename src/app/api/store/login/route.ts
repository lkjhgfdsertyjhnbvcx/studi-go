import { NextResponse } from "next/server";
import { getAllStudiosFromFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const studios = await getAllStudiosFromFirestore();
        const studio = studios.find(
            (s) => s.email === email
        );

        if (!studio) {
            return NextResponse.json({ error: "認証失敗" }, { status: 401 });
        }

        // TODO: Phase2でFirebase Authに移行。現在は簡易照合
        const staff = studio.staff?.find(
            (s) => s.email === email && s.password === password
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
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}