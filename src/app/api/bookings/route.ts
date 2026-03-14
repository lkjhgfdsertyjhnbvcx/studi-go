import { NextResponse } from "next/server";
import {
    getAllBookingsFromFirestore,
    saveBookingToFirestore,
} from "@/lib/db-firestore";

export async function GET() {
    try {
        const bookings = await getAllBookingsFromFirestore();
        // アクティブな予約のみ返す（キャンセル除外）
        const active = bookings.filter((b) => b.status !== "cancelled");
        return NextResponse.json(active);
    } catch (error: any) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newBooking = {
            id: crypto.randomUUID(),
            userId: body.userId ?? "guest",
            studioId: body.studioId,
            roomName: body.roomName ?? "",
            date: body.date,
            startTime: body.startTime,
            durationHours: body.durationHours ?? 1,
            userCount: body.userCount ?? 1,
            totalPrice: parseInt(body.totalPrice ?? "0"),
            status: "active" as const,
            createdAt: new Date().toISOString(),
        };

        await saveBookingToFirestore(newBooking);
        return NextResponse.json(newBooking);
    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}