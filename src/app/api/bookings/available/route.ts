import { NextResponse } from "next/server";
import { getAllBookingsFromFirestore } from "@/lib/db-firestore";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const studioId = searchParams.get("studioId");
    const date = searchParams.get("date");
    const roomName = searchParams.get("roomName");

    if (!studioId || !date) return NextResponse.json({ bookedSlots: [] });

    const allBookings = await getAllBookingsFromFirestore();
    const dayBookings = allBookings.filter(b =>
        b.studioId === studioId &&
        b.date === date &&
        b.status === "confirmed" &&
        (!roomName || b.roomName === roomName)
    );

    const bookedSlots = dayBookings.map(b => ({
        start: parseInt((b.startTime || "00:00").split(":")[0]),
        duration: b.durationHours || 1,
        roomName: b.roomName,
    }));

    return NextResponse.json({ bookedSlots });
}
