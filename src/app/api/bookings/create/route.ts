import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBookingAmount, createBookingAtomic } from "@/lib/booking-server";

// 入力バリデーション（型・形式・範囲）
const BookingInput = z.object({
    studioId: z.string().min(1),
    roomId: z.string().optional(),
    roomName: z.string().max(200).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{1,2}:\d{2}$/),
    durationHours: z.coerce.number().int().min(1).max(24).optional(),
    userCount: z.coerce.number().int().min(1).max(1000).optional(),
    totalPrice: z.coerce.number().int().min(0).max(10_000_000).optional(),
    userId: z.string().max(200).optional(),
});

export async function POST(request: Request) {
    try {
        const parsed = BookingInput.safeParse(await request.json());
        if (!parsed.success) {
            return NextResponse.json({ error: "入力内容が正しくありません。" }, { status: 400 });
        }
        const data = parsed.data;

        const durationHours = data.durationHours ?? 1;

        // 価格改ざん対策: クライアント申告額が正規料金を下回らないか検証
        const amountCheck = await validateBookingAmount({
            studioId: data.studioId,
            roomId: data.roomId,
            roomName: data.roomName,
            date: data.date,
            startTime: data.startTime,
            durationHours,
            claimedTotal: data.totalPrice ?? 0,
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
            totalPrice: data.totalPrice ?? 0,
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
