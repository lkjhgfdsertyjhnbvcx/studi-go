import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

// 本来は .env から取得
const stripe = new Stripe("sk_test_51P...", {
    apiVersion: "2023-10-16" as any
});
const prisma = new PrismaClient();

export async function POST() {
    try {
        // 1. Stripeから「直近24時間の成功した支払い」を取得
        const payments = await stripe.paymentIntents.list({
            limit: 100,
            created: { gte: Math.floor(Date.now() / 1000) - 86400 }
        });

        let count = 0;
        let totalAmount = 0;

        // 2. 決済データを一件ずつチェック
        for (const payment of payments.data) {
            if (payment.status === "succeeded") {
                // StripeのPaymentIntent IDで予約データを検索
                const booking = await prisma.booking.findFirst({
                    where: {
                        stripePaymentId: payment.id,
                        isPaid: false // まだ未入金（売掛）のもの
                    }
                });

                if (booking) {
                    // 3. 一致したら「入金済み」に更新（消し込み）
                    await prisma.booking.update({
                        where: { id: booking.id },
                        data: {
                            isPaid: true,
                            reconciled: true
                        }
                    });
                    count++;
                    totalAmount += booking.totalPrice;
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `${count}件（計 ¥${totalAmount.toLocaleString()}）の売掛金を消し込みました。`
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}