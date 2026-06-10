import { NextResponse } from "next/server";
import { validateBookingAmount, createBookingAtomic } from "@/lib/booking-server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 必須項目チェック
        if (!data.studioId || !data.date || !data.startTime) {
            return NextResponse.json({ error: "必須項目が不足しています。" }, { status: 400 });
        }

        const durationHours = data.durationHours ?? 1;

        // 価格改ざん対策: クライアント申告額が正規料金を下回らないか検証
        const amountCheck = await validateBookingAmount({
            studioId: data.studioId,
            roomId: data.roomId,
            roomName: data.roomName,
            date: data.date,
            startTime: data.startTime,
            durationHours,
            claimedTotal: parseInt(data.totalPrice ?? "0"),
        });
        if (!amountCheck.ok) {
            return NextResponse.json({ error: amountCheck.message ?? "金額が正しくありません。" }, { status: 400 });
        }

        const newBooking = {
            id: crypto.randomUUID(),
            userId: data.userId ?? "guest",
            studioId: data.studioId,
            roomName: data.roomName ?? "",
            date: data.date,
            startTime: data.startTime,
            durationHours,
            userCount: data.userCount ?? 1,
            totalPrice: parseInt(data.totalPrice ?? "0"),
            status: "active" as const,
            createdAt: new Date().toISOString(),
        };

        // 空き確認 → 作成をトランザクションで原子化（ダブルブッキング防止）
        try {
            await createBookingAtomic(newBooking);
        } catch (e: any) {
            if (e?.message === "SLOT_TAKEN") {
                return NextResponse.json({ error: "この時間帯はすでに予約が入っています" }, { status: 409 });
            }
            throw e;
        }

        return NextResponse.json({ success: true, bookingId: newBooking.id });
    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: "予約処理中にエラーが発生しました。" }, { status: 500 });
    }
}
