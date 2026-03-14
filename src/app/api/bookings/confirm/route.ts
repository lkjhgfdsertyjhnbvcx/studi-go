import { NextResponse } from "next/server";
import { getBookingByIdFromFirestore, saveBookingToFirestore } from "@/lib/db-firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { bookingId } = await request.json();
        if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

        const booking = await getBookingByIdFromFirestore(bookingId);
        if (!booking) return NextResponse.json({ error: "not found" }, { status: 404 });

        const confirmed = { ...booking, status: "confirmed" as const, confirmedAt: new Date().toISOString() };
        await saveBookingToFirestore(confirmed);

        if (booking.userEmail) {
            await resend.emails.send({
                from: "Studi-Go <noreply@studi-go.com>",
                to: booking.userEmail,
                subject: "【予約確定】ご予約が完了しました",
                html: `
                    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
                        <h2 style="color:#7c3aed;">予約が確定しました 🎸</h2>
                        <p>部屋: ${booking.roomName}</p>
                        <p>日付: ${booking.date}</p>
                        <p>時間: ${booking.startTime}〜 (${booking.durationHours}時間)</p>
                        <p style="color:#7c3aed;font-weight:bold;">料金: ¥${booking.totalPrice?.toLocaleString()}</p>
                    </div>
                `,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}