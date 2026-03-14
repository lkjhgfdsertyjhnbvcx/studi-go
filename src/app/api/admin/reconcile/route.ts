import { NextResponse } from "next/server";
import {
    getAllBookingsFromFirestore,
    updateBookingInFirestore,
} from "@/lib/db-firestore";
import Stripe from "stripe";

export async function POST() {
    try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeKey) return NextResponse.json({ error: "Stripe key未設定" }, { status: 500 });

        const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" as any });

        const payments = await stripe.paymentIntents.list({
            limit: 100,
            created: { gte: Math.floor(Date.now() / 1000) - 86400 },
        });

        const allBookings = await getAllBookingsFromFirestore();
        let count = 0;
        let totalAmount = 0;

        for (const payment of payments.data) {
            if (payment.status === "succeeded") {
                const booking = allBookings.find(
                    (b) => (b as any).stripePaymentId === payment.id && b.status === "active"
                );
                if (booking) {
                    await updateBookingInFirestore(booking.id, { status: "active" });
                    count++;
                    totalAmount += booking.totalPrice;
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `${count}件（計 ¥${totalAmount.toLocaleString()}）の売掛金を消し込みました。`,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
