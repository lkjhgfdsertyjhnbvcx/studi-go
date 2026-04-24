import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { saveBookingToFirestore, getAllBookingsFromFirestore, getStudioByIdFromFirestore } from "@/lib/db-firestore";
import { getPlanLimits, normalizePlanKey } from "@/lib/plan-features";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            studioId, studioName, roomId, roomName,
            date, startTime, durationHours,
            totalPrice, userId, userName, userEmail,
            selectedOptions,
            // 割り勘2人目以降: skipBooking=true の場合は予約を新規作成しない
            skipBooking, existingBookingId,
            // 割り勘情報
            splitPerson, splitTotal, splitMemberCount,
        } = body;

        let bookingId = existingBookingId || "";

        if (!skipBooking) {
            // ダブルブッキングチェック（分単位で正確に計算）
            const toMinutes = (t: string) => {
                const [h, m] = t.split(":").map(Number);
                return h * 60 + (m || 0);
            };
            const allBookings = await getAllBookingsFromFirestore();
            const conflict = allBookings.find(b => {
                if (b.studioId !== studioId) return false;
                if (b.roomName !== roomName) return false;
                if (b.date !== date) return false;
                if (b.status === "confirmed" || b.status === "pending") {
                    const bStart = toMinutes(b.startTime);
                    const bEnd = bStart + (b.durationHours || 1) * 60;
                    const newStart = toMinutes(startTime);
                    const newEnd = newStart + (durationHours || 1) * 60;
                    return newStart < bEnd && newEnd > bStart;
                }
                return false;
            });
            if (conflict) {
                return NextResponse.json({ error: "この時間帯はすでに予約が入っています。別の時間帯を選択してください。" }, { status: 409 });
            }

            // 仮予約をFirestoreに保存
            bookingId = crypto.randomUUID();
            await saveBookingToFirestore({
                id: bookingId,
                userId: userId ?? "guest",
                userEmail: userEmail ?? "",
                studioId,
                studioName,
                roomName,
                date,
                startTime,
                durationHours,
                totalPrice: splitTotal || totalPrice,
                status: "pending",
                createdAt: new Date().toISOString(),
                ...(splitMemberCount ? { splitMemberCount, splitPaidCount: 1 } : {}),
            });
        } else {
            // 割り勘2人目以降：ログイン必須チェック
            if (!userId || userId === "guest") {
                return NextResponse.json({ error: "割り勘の2人目以降はログインが必要です。", requireLogin: true }, { status: 401 });
            }
        }

        // Stripe Checkout Session作成
        const studioData = studioId ? await getStudioByIdFromFirestore(studioId) : null;
        const connectedAccountId = studioData?.stripeAccountId || null;

        // プラットフォーム手数料の計算
        // ベース: Stripe決済手数料 5%（全プラン共通）
        // フリープランのみ追加: 予約手数料 5%（合計10%）
        const planKey = normalizePlanKey(studioData?.planKey);
        const planLimits = getPlanLimits(planKey);
        const baseFeeRate = 0.05; // Stripe決済手数料 5%
        const bookingFeeRate = planLimits.bookingFeeRate; // フリー: 0.05, 他: 0
        const totalFeeRate = baseFeeRate + bookingFeeRate;
        const applicationFeeAmount = connectedAccountId && studioData?.stripeAccountStatus === "active"
            ? Math.max(1, Math.round(totalPrice * totalFeeRate))
            : 0;

        const personLabel = splitPerson ? ` (${splitPerson}人目)` : "";
        const session = await stripe.checkout.sessions.create({
            // payment_method_types を省略 → Stripeダッシュボードで有効にした決済方法が自動表示
            // （カード、コンビニ払い、Apple Pay、Google Pay など）
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: {
                            name: `${studioName} - ${roomName}${personLabel}`,
                            description: `${date} ${startTime}〜 (${durationHours}時間)`,
                        },
                        unit_amount: totalPrice,
                    },
                    quantity: 1,
                },
            ],
            // application_fee_amount は transfer_data.destination と一緒に指定する必要がある
            payment_intent_data: (applicationFeeAmount > 0 && connectedAccountId) ? {
                application_fee_amount: applicationFeeAmount,
                transfer_data: { destination: connectedAccountId },
            } : undefined,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3002"}/pay/success?bookingId=${bookingId}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/studio/${studioId}`,
            metadata: { bookingId, studioId, roomName, date, startTime, durationHours: String(durationHours), userId: userId ?? "guest", userEmail: userEmail ?? "", skipBooking: skipBooking ? "true" : "false" },
            customer_email: userEmail || undefined,
        });

        return NextResponse.json({ sessionId: session.id, sessionUrl: session.url, bookingId });
    } catch (error: any) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}