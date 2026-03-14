import { NextResponse } from "next/server";
import { getStudioByIdFromFirestore, getAllBookingsFromFirestore } from "@/lib/db-firestore";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "IDが必要です" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(id);
        if (!studio) return NextResponse.json({ error: "スタジオが見つかりません" }, { status: 404 });

        const allBookings = await getAllBookingsFromFirestore();
        const studioBookings = allBookings
            .filter((b) => b.studioId === id && b.status !== "cancelled")
            .map((b) => ({
                id: b.id,
                studioName: studio.rooms.find((r) => r.id === b.roomName)?.name ?? b.roomName ?? "",
                date: b.date,
                startTime: b.startTime,
                totalPrice: b.totalPrice,
            }));

        return NextResponse.json({
            ...studio,
            bookings: studioBookings,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}