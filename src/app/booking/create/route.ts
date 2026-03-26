import { NextResponse } from "next/server";
import { saveBookingToFirestore } from "@/lib/db-firestore";
import { Booking } from "@/lib/db-local";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const bookingId = crypto.randomUUID();
        const newBooking: Booking = {
            id: bookingId,
            userId: data.userId ?? "guest",
            studioId: data.studioId,
            studioName: data.studioName,
            date: data.date,
            startTime: data.startTime,
            durationHours: data.durationHours ?? 1,
            totalPrice: data.totalPrice,
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        await saveBookingToFirestore(newBooking);
        return NextResponse.json({ success: true, bookingId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
