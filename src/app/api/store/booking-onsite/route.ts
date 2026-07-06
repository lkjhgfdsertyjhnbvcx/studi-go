import { NextResponse } from "next/server";
import { saveBookingToFirestore, getAllBookingsFromFirestore, savePaymentToFirestore } from "@/lib/db-firestore";

export const dynamic = "force-dynamic";

// 店頭払い予約API — Stripe決済をスキップして予約を作成（paymentStatus: unpaid）
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            studioId, studioName, roomId, roomName,
            date, startTime, durationHours,
            totalPrice, userId, userName, userEmail,
            selectedOptions,
        } = body;

        if (!studioId || !date || !startTime) {
            return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
        }

        // ダブルブッキングチェック
        const toMinutes = (t: string) => {
            const [h, m] = t.split(":").map(Number);
            return h * 60 + (m || 0);
        };
        const allBookings = await getAllBookingsFromFirestore();
        const conflict = allBookings.find(b => {
            if (b.studioId !== studioId) return false;
            if (b.roomName !== roomName) return false;
            if (b.date !== date) return false;
            if (b.status !== "cancelled") {
                const bStart = toMinutes(b.startTime);
                const bEnd = bStart + (b.durationHours || 1) * 60;
                const newStart = toMinutes(startTime);
                const newEnd = newStart + (durationHours || 1) * 60;
                return newStart < bEnd && newEnd > bStart;
            }
            return false;
        });
        if (conflict) {
            return NextResponse.json({ error: "この時間帯はすでに予約が入っています。" }, { status: 409 });
        }

        // 予約を作成（店頭払い = confirmed だが未払い）
        const bookingId = crypto.randomUUID();
        await saveBookingToFirestore({
            id: bookingId,
            userId: userId ?? "guest",
            userEmail: userEmail ?? "",
            studioId,
            studioName,
            roomName,
            date,
            startTime,
            durationHours,
            totalPrice: totalPrice || 0,
            status: "confirmed",
            paymentStatus: "unpaid",
            paymentMethod: "onsite",  // 店頭払い
            createdAt: new Date().toISOString(),
        } as any);

        // paymentsコレクションにも売上レコードを作成（店頭払い = pending）
        try {
            await savePaymentToFirestore({
                id: `pay-${bookingId}`,
                bookingId,
                studioId,
                studioName: studioName || '',
                userName: userName || 'ゲスト',
                userEmail: userEmail || '',
                amount: totalPrice || 0,
                status: 'pending',
                paymentMethod: 'other',
                date: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString(),
            } as any);
        } catch (payErr) {
            console.error("[booking-onsite] Payment record creation failed:", payErr);
        }

        return NextResponse.json({ success: true, bookingId });
    } catch (error: any) {
        console.error("[booking-onsite] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
