/**
 * 未決済メンバーの当日処理 Cron
 *
 * vercel.json の crons に追加して使用する:
 * {
 *   "crons": [
 *     { "path": "/api/cron/unpaid-members", "schedule": "0 8 * * *" }
 *   ]
 * }
 *
 * 動作:
 * 1. 今日のスタジオ予約 (isSplitPayment=true) を検索
 * 2. 未決済のメンバーがいる場合、店舗の unpaidAction 設定に従って処理
 *    - "notify"  : 店舗と代表者にメール通知のみ（デフォルト）
 *    - "force"   : 代表者の決済で残額を強制まとめて請求
 *    - "cancel"  : 予約全体をキャンセルして払済メンバーに返金
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Resend } from "resend";
import { getStudioByIdFromFirestore } from "@/lib/db-firestore";

// prisma の型を any にキャスト（スキーマが最新でない環境への対応）
const db = prisma as any;

const resend = new Resend(process.env.RESEND_API_KEY);
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
    // セキュリティチェック（Vercel Cron からのリクエストのみ許可）
    const { searchParams } = new URL(request.url);
    const secret = request.headers.get("authorization");
    if (!CRON_SECRET || secret !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    try {
        // 今日のスタジオ予約（割り勘・未確定）を取得
        const todayReservations = await db.reservation.findMany({
            where: {
                isSplitPayment: true,
                status: "Pending",
                // 予約日が今日のものを絞り込み（startTime で判定）
                startTime: {
                    gte: new Date(`${todayStr}T00:00:00Z`),
                    lt: new Date(`${todayStr}T23:59:59Z`),
                },
            },
            include: {
                splitPayments: true,
                band: {
                    include: {
                        leader: true,
                        members: { include: { user: true } },
                    },
                },
            },
        });

        const results: any[] = [];

        for (const reservation of todayReservations) {
            const unpaidPayments = reservation.splitPayments.filter(
                (p: any) => p.paymentStatus === "Pending"
            );
            const paidPayments = reservation.splitPayments.filter(
                (p: any) => p.paymentStatus === "Paid"
            );

            if (unpaidPayments.length === 0) continue; // 全員支払済みならスキップ

            // 店舗の unpaidAction 設定を取得
            let unpaidAction = "notify";
            try {
                const studio = await getStudioByIdFromFirestore(reservation.studioId || "");
                unpaidAction = (studio as any)?.unpaidAction || "notify";
            } catch (e) {
                console.error(`[unpaid-members] Studio fetch error for reservation ${reservation.id}:`, e);
            }

            const leaderEmail = reservation.band?.leader?.email;
            const reservationInfo = {
                id: reservation.id,
                date: todayStr,
                bandName: reservation.band?.name || "不明",
                unpaidCount: unpaidPayments.length,
                unpaidTotal: unpaidPayments.reduce((sum: number, p: any) => sum + p.amount, 0),
            };

            if (unpaidAction === "cancel") {
                // ── キャンセル処理 ──
                await db.$transaction(async (tx: any) => {
                    await tx.reservation.update({
                        where: { id: reservation.id },
                        data: { status: "Cancelled" },
                    });

                    for (const payment of paidPayments) {
                        try {
                            const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId!);
                            if (session.payment_intent) {
                                await stripe.refunds.create({
                                    payment_intent: session.payment_intent as string,
                                });
                            }
                            await tx.splitPayment.update({
                                where: { id: payment.id },
                                data: { paymentStatus: "Refunded" },
                            });
                        } catch (e) {
                            console.error(`[unpaid-members] Refund error for payment ${payment.id}:`, e);
                        }
                    }

                    for (const payment of unpaidPayments) {
                        await tx.splitPayment.update({
                            where: { id: payment.id },
                            data: { paymentStatus: "Cancelled" },
                        });
                    }
                });

                // キャンセル通知メール
                if (leaderEmail) {
                    await resend.emails.send({
                        from: "Studi-Go <system@studi-go.com>",
                        to: [leaderEmail],
                        subject: "【Studi-Go】予約がキャンセルされました（未決済メンバーあり）",
                        text: `${reservationInfo.bandName} の本日の予約がキャンセルされました。\n\n` +
                            `未決済メンバーが ${reservationInfo.unpaidCount} 名いたため、自動キャンセルされました。\n` +
                            `支払済みのメンバーには自動的に返金処理が行われます。\n\n` +
                            `予約ID: ${reservation.id}`,
                    }).catch(console.error);
                }

                results.push({ reservationId: reservation.id, action: "cancelled", unpaidCount: unpaidPayments.length });

            } else if (unpaidAction === "force") {
                // ── 代表者への強制まとめ請求 ──
                // 代表者の決済済みセッションIDを取得
                const leaderPayment = reservation.splitPayments.find(
                    (p: any) => p.userId === reservation.band?.leaderId
                );

                if (leaderPayment?.stripeSessionId) {
                    try {
                        const session = await stripe.checkout.sessions.retrieve(leaderPayment.stripeSessionId);
                        const customerId = session.customer as string;

                        if (customerId) {
                            const totalUnpaid = unpaidPayments.reduce((sum: number, p: any) => sum + p.amount, 0);
                            // 代表者に追加請求（Payment Intents）
                            const paymentIntent = await stripe.paymentIntents.create({
                                amount: totalUnpaid,
                                currency: "jpy",
                                customer: customerId,
                                payment_method: session.payment_method_types?.[0] as string,
                                confirm: false,
                                description: `割り勘残額（${reservationInfo.bandName}）`,
                                metadata: {
                                    reservationId: reservation.id,
                                    type: "force_collect",
                                },
                            });

                            // 未決済を"ForceCollect"ステータスに更新
                            for (const payment of unpaidPayments) {
                                await db.splitPayment.update({
                                    where: { id: payment.id },
                                    data: { paymentStatus: "ForceCollect" },
                                });
                            }

                            // 代表者に通知
                            if (leaderEmail) {
                                await resend.emails.send({
                                    from: "Studi-Go <system@studi-go.com>",
                                    to: [leaderEmail],
                                    subject: "【Studi-Go】未払いメンバーの残額について",
                                    text: `${reservationInfo.bandName} の本日の予約について、\n` +
                                        `${reservationInfo.unpaidCount} 名のメンバーが未払いです。\n\n` +
                                        `未払い総額: ¥${reservationInfo.unpaidTotal.toLocaleString()}\n\n` +
                                        `この金額の支払いについて、スタジオから連絡が来る場合があります。\n\n` +
                                        `予約ID: ${reservation.id}`,
                                }).catch(console.error);
                            }

                            results.push({ reservationId: reservation.id, action: "force_notified", unpaidCount: unpaidPayments.length });
                        }
                    } catch (e) {
                        console.error(`[unpaid-members] Force collect error for reservation ${reservation.id}:`, e);
                        results.push({ reservationId: reservation.id, action: "force_failed", error: String(e) });
                    }
                }

            } else {
                // ── notify（デフォルト）: 通知のみ ──
                const adminEmail = process.env.ADMIN_EMAIL || "support@studi-go.com";

                // 店舗（運営）へ通知
                await resend.emails.send({
                    from: "Studi-Go <system@studi-go.com>",
                    to: [adminEmail],
                    subject: `【Studi-Go】本日予約：未決済メンバーあり - ${reservationInfo.bandName}`,
                    text: `本日の予約に未決済メンバーがいます。\n\n` +
                        `バンド: ${reservationInfo.bandName}\n` +
                        `未決済人数: ${reservationInfo.unpaidCount} 名\n` +
                        `未決済金額: ¥${reservationInfo.unpaidTotal.toLocaleString()}\n\n` +
                        `予約ID: ${reservation.id}\n\n` +
                        `当日、スタジオ窓口で対応してください。`,
                }).catch(console.error);

                // 代表者へ通知
                if (leaderEmail) {
                    await resend.emails.send({
                        from: "Studi-Go <system@studi-go.com>",
                        to: [leaderEmail],
                        subject: "【Studi-Go】本日の予約：未決済メンバーがいます",
                        text: `${reservationInfo.bandName} の本日の予約について、\n` +
                            `${reservationInfo.unpaidCount} 名のメンバーが未決済です。\n\n` +
                            `未払い総額: ¥${reservationInfo.unpaidTotal.toLocaleString()}\n\n` +
                            `当日スタジオにて確認・精算をお願いします。\n\n` +
                            `予約ID: ${reservation.id}`,
                    }).catch(console.error);
                }

                results.push({ reservationId: reservation.id, action: "notified", unpaidCount: unpaidPayments.length });
            }
        }

        return NextResponse.json({
            success: true,
            date: todayStr,
            processed: todayReservations.length,
            results,
        });

    } catch (error: any) {
        console.error("[unpaid-members cron] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
