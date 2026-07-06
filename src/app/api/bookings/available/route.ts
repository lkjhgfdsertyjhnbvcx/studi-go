import { NextResponse } from "next/server";
import { getAllBookingsFromFirestore, getBlockedSlotsByStudioFromFirestore } from "@/lib/db-firestore";
import { isSlotOccupying } from "@/lib/booking-server";

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
        isSlotOccupying(b) &&
        (!roomName || b.roomName === roomName)
    );

    const bookedSlots = dayBookings.map(b => ({
        start: parseInt((b.startTime || "00:00").split(":")[0]),
        duration: b.durationHours || 1,
        roomName: b.roomName,
    }));

    // ブロック枠も「予約済み」として返す（お客様には理由は見えない）
    const blockedSlots = await getBlockedSlotsByStudioFromFirestore(studioId);
    const dayBlocked = (blockedSlots as any[]).filter(bs =>
        bs.date === date &&
        (bs.roomName === "all" || !roomName || bs.roomName === roomName)
    );

    for (const bs of dayBlocked) {
        const [startH, startM] = (bs.startTime || "00:00").split(":").map(Number);
        const [endH, endM] = (bs.endTime || "00:00").split(":").map(Number);
        const durationHours = (endH * 60 + endM - startH * 60 - startM) / 60;
        bookedSlots.push({
            start: startH,
            duration: Math.ceil(durationHours),
            roomName: bs.roomName === "all" ? (roomName || "") : bs.roomName,
        });
    }

    return NextResponse.json({ bookedSlots });
}
