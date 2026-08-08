import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase-admin";
import { slotToDate } from "@/lib/time-slots";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookingId } = body;

        // IDOR対策: セッションクッキー検証済みのuserIdを優先（無ければ互換で申告値）
        const { resolveUserId } = await import("@/lib/user-session");
        const userId = await resolveUserId(body.userId);

        if (!bookingId || !userId) {
            return NextResponse.json({ error: "bookingId と認証情報が必要です" }, { status: 400 });
        }

        // Admin SDKで予約取得
        const bookingDoc = await adminDb.collection("bookings").doc(bookingId).get();
        if (!bookingDoc.exists) {
            return NextResponse.json({ error: "予約が見つかりません" }, { status: 404 });
        }
        const booking = bookingDoc.data() as any;

        // 本人確認
        if (booking.userId !== userId) {
            return NextResponse.json({ error: "この予約をキャンセルする権限がありません" }, { status: 403 });
        }

        // すでにキャンセル済みか確認
        if (booking.status === "cancelled") {
            return NextResponse.json({ error: "この予約はすでにキャンセルされています" }, { status: 400 });
        }

        // 予約日時チェック（JST基準で過去はキャンセル不可）
        if (booking.date && booking.startTime) {
            // "25:00" のような深夜表記は翌日に繰り上げて判定する
            const bookingDateTime = slotToDate(booking.date, booking.startTime, { jst: true });
            if (bookingDateTime && bookingDateTime < new Date()) {
                return NextResponse.json({ error: "過去の予約はキャンセルできません" }, { status: 400 });
            }
        }

        // Stripe返金処理
        let refundResult: { success: boolean; message: string; refundId?: string } = {
            success: false,
            message: "Stripe情報なし（返金なし）",
        };

        if (booking.stripeSessionId) {
            try {
                const session = await stripe.checkout.sessions.retrieve(booking.stripeSessionId);
                if (session.payment_intent) {
                    const refund = await stripe.refunds.create({
                        payment_intent: session.payment_intent as string,
                    });
                    refundResult = { success: true, message: "返金処理が完了しました", refundId: refund.id };
                }
            } catch (stripeErr: any) {
                console.error("[Stripe] Refund error:", stripeErr.message);
                refundResult = { success: false, message: `返金処理エラー: ${stripeErr.message}` };
            }
        } else if (booking.stripePaymentIntentId) {
            try {
                const refund = await stripe.refunds.create({
                    payment_intent: booking.stripePaymentIntentId,
                });
                refundResult = { success: true, message: "返金処理が完了しました", refundId: refund.id };
            } catch (stripeErr: any) {
                console.error("[Stripe] Refund error:", stripeErr.message);
                refundResult = { success: false, message: `返金処理エラー: ${stripeErr.message}` };
            }
        }

        // Admin SDKで予約ステータスをキャンセルに更新
        await adminDb.collection("bookings").doc(bookingId).update({
            status: "cancelled",
            cancelledAt: new Date().toISOString(),
            cancelledBy: "user",
        });

        return NextResponse.json({
            success: true,
            message: "予約をキャンセルしました",
            refund: refundResult,
        });

    } catch (error: any) {
        console.error("[cancel-booking] Error:", error);
        return NextResponse.json({ error: "キャンセル処理中にエラーが発生しました。" }, { status: 500 });
    }
}
