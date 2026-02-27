import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { Resend } from 'resend'
import { updatePaymentStatusInFirestore, getAllPaymentsFromFirestore } from '@/lib/db-firestore'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'support@studi-go.com'

export async function POST(req: Request) {
    const body = await req.text()
    const headersList = await headers()
    const sig = headersList.get('Stripe-Signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        const metadata = session.metadata

        if (metadata?.reservationId && metadata?.userId) {
            await prisma.$transaction(async (tx: any) => {
                // 更新 SplitPayment
                await tx.splitPayment.update({
                    where: { stripeSessionId: session.id },
                    data: { paymentStatus: 'Paid' },
                })

                if (metadata.usedCoupon === 'true') {
                    await tx.user.update({
                        where: { id: metadata.userId },
                        data: { activaCouponBalance: { decrement: 1 } },
                    })
                }

                const reservationId = metadata.reservationId

                // 全員の支払いが完了したか確認
                const reservation = await tx.reservation.findUnique({
                    where: { id: reservationId },
                    include: {
                        splitPayments: true,
                        band: {
                            include: {
                                leader: true,
                                members: { include: { user: true } }
                            }
                        }
                    },
                })

                if (reservation) {
                    const allPaid = reservation.splitPayments.every(
                        (payment: any) => payment.paymentStatus === 'Paid'
                    )

                    if (allPaid && reservation.status !== 'Confirmed') {
                        await tx.reservation.update({
                            where: { id: reservationId },
                            data: { status: 'Confirmed' },
                        })

                        // ── Firestoreの支払いレコードも消し込み ──
                        try {
                            const firestorePayments = await getAllPaymentsFromFirestore()
                            const targetPayment = firestorePayments.find((p: any) => p.bookingId === reservationId)
                            if (targetPayment) {
                                await updatePaymentStatusInFirestore(targetPayment.id, 'paid')
                                console.log(`[Firestore] Payment for booking ${reservationId} marked as paid.`)
                            }
                        } catch (err) {
                            console.error('[Firestore] Failed to reconcile payment:', err)
                        }

                        const studioInfo = reservation.band?.name || '不明なバンド'
                        const startTime = reservation.startTime
                            ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(reservation.startTime))
                            : '不明'
                        const totalAmount = reservation.splitPayments.reduce((sum: number, p: any) => sum + p.amount, 0)

                        // ── 店舗への完了メール ──
                        try {
                            await resend.emails.send({
                                from: 'Studi-Go <system@studi-go.com>',
                                to: [ADMIN_EMAIL],
                                subject: `【Studi-Go】割り勘決済が完了しました - ${studioInfo}`,
                                text: `割り勘決済がすべて完了しました。\n\n` +
                                    `予約ID: ${reservationId}\n` +
                                    `バンド/プロジェクト: ${studioInfo}\n` +
                                    `利用日時: ${startTime}\n` +
                                    `合計入金額: ¥${totalAmount.toLocaleString()}\n\n` +
                                    `全メンバーの支払いが確認されました。予約が正式に確定しています。\n` +
                                    `管理パネルにて未入金リストの消し込みを確認してください。`
                            })
                            console.log(`[Email] Completion email sent to: ${ADMIN_EMAIL}`)
                        } catch (emailErr) {
                            console.error('[Email] Failed to send completion email to studio:', emailErr)
                        }

                        // ── 代表者（バンドリーダー）への完了通知 ──
                        try {
                            const leaderEmail = reservation.band?.leader?.email
                            if (leaderEmail) {
                                await resend.emails.send({
                                    from: 'Studi-Go <system@studi-go.com>',
                                    to: [leaderEmail],
                                    subject: '【Studi-Go】割り勘決済が完了しました！予約が確定しました',
                                    text: `${studioInfo} の全員の支払いが完了しました！\n\n予約ID: ${reservationId}\n利用日時: ${startTime}\n\n予約が正式に確定しました。スタジオをお楽しみください！`
                                })
                            }
                        } catch (emailErr) {
                            console.error('[Email] Failed to send completion email to leader:', emailErr)
                        }
                    }
                }
            })
        }
    }

    return NextResponse.json({ received: true })
}
