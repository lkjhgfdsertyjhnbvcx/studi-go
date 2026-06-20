import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getStudioByIdFromFirestore } from "@/lib/db-firestore";
import { getPlanLimits, normalizePlanKey } from "@/lib/plan-features";
import { validateBookingAmount, createBookingAtomic } from "@/lib/booking-server";

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

        // 価格改ざん対策: クライアント申告額がスタジオ設定の正規料金を下回らないか検証。
        // 割り勘の場合は全体額(splitTotal)を、通常は totalPrice を検証対象にする。
        const intendedTotal = Number(splitTotal ?? totalPrice);
        const amountCheck = await validateBookingAmount({
            studioId, roomId, roomName, date, startTime,
            durationHours: durationHours || 1,
            claimedTotal: intendedTotal,
        });
        if (!amountCheck.ok) {
            return NextResponse.json({ error: amountCheck.message ?? "金額が正しくありません。" }, { status: 400 });
        }

        // 事前決済ガード:
        // 店舗のStripe Connect口座が「有効(active)」でなければオンライン決済を受け付けない。
        // これを行わないと、決済額がプラットフォーム(Studi-Go)に着金したまま店舗へ振り込まれず、
        // 店舗が代金を受け取れない状態になる。口座登録が完了するまで店頭払いへ誘導する。
        const studioData = studioId ? await getStudioByIdFromFirestore(studioId) : null;
        if (!studioData) {
            return NextResponse.json({ error: "店舗が見つかりません。" }, { status: 404 });
        }
        if (!studioData.stripeAccountId || studioData.stripeAccountStatus !== "active") {
            return NextResponse.json({
                error: "この店舗はオンライン事前決済の準備が完了していません。店頭払いをご利用ください。",
                code: "PREPAY_NOT_AVAILABLE",
            }, { status: 400 });
        }

        if (!skipBooking) {
            // 仮予約を作成（空き確認 → 作成をトランザクションで原子化しダブルブッキングを防止）
            bookingId = crypto.randomUUID();
            try {
                await createBookingAtomic({
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
            } catch (e: any) {
                if (e?.message === "SLOT_TAKEN") {
                    return NextResponse.json({ error: "この時間帯はすでに予約が入っています。別の時間帯を選択してください。" }, { status: 409 });
                }
                throw e;
            }
        } else {
            // 割り勘2人目以降：ログイン必須チェック
            if (!userId || userId === "guest") {
                return NextResponse.json({ error: "割り勘の2人目以降はログインが必要です。", requireLogin: true }, { status: 401 });
            }
        }

        // Stripe Checkout Session作成
        // studioData は上の事前決済ガードで取得・検証済み（口座active確定）
        const connectedAccountId = studioData.stripeAccountId || null;

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
        return NextResponse.json({ error: "決済処理中にエラーが発生しました。時間をおいて再度お試しください。" }, { status: 500 });
    }
}