import { NextResponse } from "next/server";
import { saveBookingToFirestore, checkAvailabilityFromFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 空き確認
        const available = await checkAvailabilityFromFirestore(
            data.studioId,
            data.roomName,
            data.date,
            data.startTime,
            data.durationHours ?? 1
        );

        if (!available) {
            return NextResponse.json({ error: "この時間帯はすでに予約が入っています" }, { status: 409 });
        }

        const newBooking = {
            id: crypto.randomUUID(),
            userId: data.userId ?? "guest",
            studioId: data.studioId,
            roomName: data.roomName ?? "",
            date: data.date,
            startTime: data.startTime,
            durationHours: data.durationHours ?? 1,
            userCount: data.userCount ?? 1,
            totalPrice: parseInt(data.totalPrice ?? "0"),
            status: "active" as const,
            createdAt: new Date().toISOString(),
        };

        await saveBookingToFirestore(newBooking);
        return NextResponse.json({ success: true, bookingId: newBooking.id });
    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}