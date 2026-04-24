import { NextResponse } from "next/server";
import { updateBookingInFirestore } from "@/lib/db-firestore";

export const dynamic = "force-dynamic";

// 消し込みAPI — 店頭で支払いを受けた際に入金済みに更新
export async function PUT(request: Request) {
    try {
        const { bookingId, paymentMethod, paidAmount, note } = await request.json();

        if (!bookingId) {
            return NextResponse.json({ error: "bookingIdが必要です" }, { status: 400 });
        }

        if (!paymentMethod) {
            return NextResponse.json({ error: "支払い方法を選択してください" }, { status: 400 });
        }

        const updates: Record<string, any> = {
            paymentStatus: "paid",
            paymentMethod,      // cash, paypay, rakuten_pay, d_pay, au_pay, ic_card, other
            paidAt: new Date().toISOString(),
        };
        if (paidAmount !== undefined) updates.paidAmount = paidAmount;
        if (note) updates.paymentNote = note;

        const success = await updateBookingInFirestore(bookingId, updates);

        if (!success) {
            return NextResponse.json({ error: "予約の更新に失敗しました" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[booking-payment] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 未払いに戻すAPI（取り消し）
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const bookingId = searchParams.get("bookingId");

        if (!bookingId) {
            return NextResponse.json({ error: "bookingIdが必要です" }, { status: 400 });
        }

        const success = await updateBookingInFirestore(bookingId, {
            paymentStatus: "unpaid",
            paymentMethod: "onsite",
            paidAt: null,
            paymentNote: null,
        } as any);

        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
