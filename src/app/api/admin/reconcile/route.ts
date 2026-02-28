import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

/**
 * 手動消込（Reconciliation）実行
 * Stripeの直近の支払い成功データを取得し、
 * DB上の「未入金(isPaid: false)」かつ「Stripe IDが一致する」予約を
 * 自動的に「入金済み(isPaid: true)」に更新する。
 */
export async function POST() {
  try {
    // 1. Stripeから直近の支払い成功リストを取得（最大100件）
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });

    let updatedCount = 0;

    // 2. 支払い成功データをループしてDBと照合
    for (const payment of paymentIntents.data) {
      if (payment.status === "succeeded") {
        // StripeのPaymentIntent IDで予約データを検索
        const booking = await (prisma as any).booking.findFirst({
          where: {
            stripePaymentId: payment.id,
            isPaid: false // まだ未入金（売掛）のもの
          }
        });

        if (booking) {
          // 一致するものがあれば「入金済み」に更新
          await (prisma as any).booking.update({
            where: { id: booking.id },
            data: { isPaid: true }
          });
          updatedCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `${updatedCount} 件の予約を入金済みに更新しました。`
    });
  } catch (error: any) {
    console.error("Reconciliation error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
