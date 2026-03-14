import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        if (!userId) return NextResponse.json({ error: "userIdが必要です" }, { status: 400 });

        // ユーザー取得
        const userDoc = await adminDb.collection("users").doc(userId).get();
        if (!userDoc.exists) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
        const userData = userDoc.data() as any;
        const { password, ...safeUser } = userData;

        // 予約取得（userIdで絞り込み）
        const bookingsSnap = await adminDb.collection("bookings").where("userId", "==", userId).get();
        const filtered = bookingsSnap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // studioName補完
        const userBookings = await Promise.all((filtered as any[]).map(async (b: any) => {
            if (!b.studioName && b.studioId) {
                try {
                    const studioDoc = await adminDb.collection("studios").doc(b.studioId).get();
                    const studioData = studioDoc.data() as any;
                    return { ...b, studioName: studioData?.storeName || b.studioId };
                } catch { return b; }
            }
            return b;
        }));

        return NextResponse.json({ user: { id: userId, ...safeUser }, bookings: userBookings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ error: "idが必要です" }, { status: 400 });
        await adminDb.collection("bookings").doc(body.id).update({ status: "cancelled" });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("booking cancel error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
