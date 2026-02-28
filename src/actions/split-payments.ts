'use server'

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { Resend } from 'resend'
import { getAllPaymentsFromFirestore, updatePaymentStatusInFirestore } from '@/lib/db-firestore'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'support@studi-go.com'

const ACTIVA_DISCOUNT_AMOUNT = 500 // 割引額の例 (例: 500円)

export async function createSplitPayments(reservationId: string, studioStripeAccountId: string, bookerUserId: string) {
    const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: { band: { include: { members: { include: { user: true } } } } }
    })

    if (!reservation || !reservation.band) throw new Error('Reservation or Band not found')

    const members = reservation.band.members
    if (members.length === 0) throw new Error('No members in the band')

    const optionsAmount = reservation.optionsAmount || 0;
    const roomAmount = (reservation.totalAmount || 0) - optionsAmount;
    const baseSplitAmount = Math.ceil(roomAmount / members.length);

    const splitPayments = await Promise.all(
        members.map(async (member: any) => {
            // Allocate Option amount
            let memberAllocatedAmount = baseSplitAmount;
            if (reservation.optionPaymentMode === 'split') {
                memberAllocatedAmount += Math.ceil(optionsAmount / members.length);
            } else if (reservation.optionPaymentMode === 'booker' && member.userId === bookerUserId) {
                memberAllocatedAmount += optionsAmount;
            }
            const isEligibleForDiscount =
                member.user.jocollaRegistered && member.user.activaCouponBalance > 0

            // クーポン適用判定
            const finalAmount = isEligibleForDiscount
                ? Math.max(0, memberAllocatedAmount - ACTIVA_DISCOUNT_AMOUNT)
                : memberAllocatedAmount

            // Stripe Sessionの作成
            let sessionId = `mock_session_${Math.random()}`;
            if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'dummy_test_key') {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'jpy',
                                product_data: {
                                    name: `割り勘決済: ${reservation.band?.name ?? 'バンド'} - スタジオ予約`,
                                },
                                unit_amount: finalAmount,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    payment_intent_data: {
                        transfer_data: {
                            destination: studioStripeAccountId,
                        },
                    },
                    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/split-payment/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/split-payment/${reservationId}?userId=${member.userId}`,
                    metadata: {
                        reservationId: reservation.id,
                        userId: member.userId,
                        usedCoupon: isEligibleForDiscount ? 'true' : 'false',
                    },
                    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30分で期限切れ
                })
                sessionId = session.id;
            } else {
                console.warn('Skipping actual Stripe Session creation, using mock session.');
            }

            // DBへ保存
            return await (prisma as any).splitPayment.create({
                data: {
                    reservationId: reservation.id,
                    userId: member.userId,
                    amount: finalAmount,
                    stripeSessionId: sessionId,
                    paymentStatus: 'Pending',
                }
            })
        })
    )

    return splitPayments
}

export async function getSplitPaymentsAction(reservationId: string) {
    try {
        const [payments, reservation] = await Promise.all([
            await (prisma as any).splitPayment.findMany({
                where: { reservationId },
                include: { user: true }
            }),
            prisma.reservation.findUnique({
                where: { id: reservationId },
                include: {
                    band: {
                        select: {
                            leaderId: true,
                            name: true,
                            members: {
                                select: { userId: true }
                            }
                        }
                    }
                }
            })
        ])
        return {
            success: true,
            payments,
            leaderId: reservation?.band?.leaderId ?? null,
            bandName: reservation?.band?.name ?? null,
            bandMemberIds: reservation?.band?.members?.map((m: any) => m.userId) ?? []
        }
    } catch (e) {
        return { success: false, message: 'データの取得に失敗しました' }
    }
}

export async function getCheckoutUrlAction(paymentId: string) {
    try {
        const payment = await prisma.splitPayment.findUnique({
            where: { id: paymentId }
        })
        if (!payment || !payment.stripeSessionId) {
            return { success: false, message: '決済セッションが見つかりません' }
        }

        // Stripe APIで最新のSession情報を取得（URLが含まれている）
        const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId)
        if (!session.url) {
            return { success: false, message: '決済用URLの発行に失敗しました' }
        }

        return { success: true, url: session.url }
    } catch (e) {
        console.error('Stripe retrieve error:', e)
        return { success: false, message: 'Stripeとの連携に失敗しました' }
    }
}

/**
 * 全員が支払い完了した場合に:
 * 1. Prismaの予約ステータスを Confirmed に更新
 * 2. Firestoreの支払いレコードを消し込み（paid）
 * 3. 店舗（運営者）へ完了通知メールを送信
 * 4. バンドリーダーへ確定通知メールを送信
 */
export async function checkAndFinalizeReservationAction(reservationId: string) {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: {
                splitPayments: true,
                band: {
                    include: {
                        leader: true,
                        members: { include: { user: true } }
                    }
                }
            }
        })

        if (!reservation) {
            return { success: false, message: '予約が見つかりません' }
        }

        const allPaid = reservation.splitPayments.every((p: any) => p.paymentStatus === 'Paid')
        if (!allPaid) {
            return { success: false, message: 'まだ全員が支払いを完了していません' }
        }

        if (reservation.status === 'Confirmed') {
            return { success: true, message: '既に確定済みです', alreadyConfirmed: true }
        }

        // 1. Prisma 予約を Confirmed に
        await prisma.reservation.update({
            where: { id: reservationId },
            data: { status: 'Confirmed' }
        })

        // 2. Firestore 支払いレコードを消し込み
        try {
            const firestorePayments = await getAllPaymentsFromFirestore()
            const targetPayment = firestorePayments.find((p: any) => p.bookingId === reservationId)
            if (targetPayment) {
                await updatePaymentStatusInFirestore(targetPayment.id, 'paid')
                console.log(`[Firestore] Payment for ${reservationId} reconciled.`)
            }
        } catch (err) {
            console.error('[Firestore] Reconciliation failed:', err)
        }

        const studioInfo = reservation.band?.name || '不明なバンド'
        const startTime = reservation.startTime
            ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(reservation.startTime))
            : '不明'
        const totalAmount = reservation.splitPayments.reduce((sum: number, p: any) => sum + p.amount, 0)

        // 3. 店舗（運営者）への完了メール
        try {
            await resend.emails.send({
                from: 'Studi-Go <system@studi-go.com>',
                to: [ADMIN_EMAIL],
                subject: `【Studi-Go】割り勘決済完了 - ${studioInfo}`,
                text: `割り勘決済がすべて完了しました。\n\n` +
                    `予約ID: ${reservationId}\n` +
                    `バンド/プロジェクト: ${studioInfo}\n` +
                    `利用日時: ${startTime}\n` +
                    `合計入金額: ¥${totalAmount.toLocaleString()}\n\n` +
                    `全メンバーの支払いが確認されました。予約が正式に確定しています。\n` +
                    `管理パネルの未入金リストが自動的に消し込まれました。`
            })
        } catch (emailErr) {
            console.error('[Email] 店舗への完了メール送信失敗:', emailErr)
        }

        // 4. バンドリーダーへの確定通知
        try {
            const leaderEmail = reservation.band?.leader?.email
            if (leaderEmail) {
                await resend.emails.send({
                    from: 'Studi-Go <system@studi-go.com>',
                    to: [leaderEmail],
                    subject: '【Studi-Go】割り勘決済が完了しました！予約確定',
                    text: `${studioInfo} の全員の支払いが完了しました！\n\n` +
                        `予約ID: ${reservationId}\n` +
                        `利用日時: ${startTime}\n\n` +
                        `予約が正式に確定しました。スタジオをお楽しみください！`
                })
            }
        } catch (emailErr) {
            console.error('[Email] バンドリーダーへの確定通知失敗:', emailErr)
        }

        return { success: true, message: '全員の支払いが完了し、予約が確定しました。' }
    } catch (e: any) {
        console.error('checkAndFinalizeReservationAction error:', e)
        return { success: false, message: e.message }
    }
}
