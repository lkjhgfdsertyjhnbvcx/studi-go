import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function GET() {
    const expiredTime = new Date(Date.now() - 30 * 60 * 1000)

    try {
        const expiredReservations = await prisma.reservation.findMany({
            where: {
                status: 'Pending',
                isSplitPayment: true,
                createdAt: { lt: expiredTime },
            },
            include: {
                splitPayments: true,
            }
        })

        for (const reservation of expiredReservations) {
            await prisma.$transaction(async (tx) => {
                // 全Paymentsをステータスキャンセル
                await tx.reservation.update({
                    where: { id: reservation.id },
                    data: { status: 'Cancelled' },
                })

                for (const payment of reservation.splitPayments) {
                    if (payment.paymentStatus === 'Paid') {
                        // Stripe返金処理
                        const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId!)
                        if (session.payment_intent) {
                            await stripe.refunds.create({
                                payment_intent: session.payment_intent as string,
                                amount: payment.amount,
                            })
                        }
                        // クーポンを返還する場合はここでロジックを追加

                        await tx.splitPayment.update({
                            where: { id: payment.id },
                            data: { paymentStatus: 'Refunded' },
                        })
                    } else if (payment.paymentStatus === 'Pending') {
                        await tx.splitPayment.update({
                            where: { id: payment.id },
                            data: { paymentStatus: 'Cancelled' },
                        })
                        // セッション期限切れはStripeで自動で行われるが、明示的にExpireすることも可能
                        try {
                            await stripe.checkout.sessions.expire(payment.stripeSessionId!)
                        } catch (ignored) {
                            // 既に期限切れの場合があるため無視
                        }
                    }
                }
            })
        }
        return NextResponse.json({ success: true, processed: expiredReservations.length })
    } catch (error) {
        console.error('Cron job error:', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
