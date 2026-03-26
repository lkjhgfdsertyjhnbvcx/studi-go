import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });

const PLAN_PRICES: Record<string, number> = {
    free: 0,
    light: 2980,
    standard: 5980,
    pro: 12800,
};

const OPTION_PRICES: Record<string, number> = {
    custom_domain: 1000,
    setup_support: 12000,
};

export async function POST(request: Request) {
    try {
        const { studioId, planKey, options = [], storeEmail, trialDays } = await request.json();
        const planPrice = PLAN_PRICES[planKey] || 0;
        const optionTotal = (options as string[]).reduce((sum, k) => sum + (OPTION_PRICES[k] || 0), 0);
        const total = planPrice + optionTotal;

        // 無料期間の設定（店舗ごとに個別設定）
        const subscriptionData: Record<string, any> = {};
        if (trialDays && trialDays > 0) {
            subscriptionData.trial_period_days = trialDays;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: { name: `Studi-Go ${planKey}プラン` + (options.length > 0 ? ` + オプション` : "") },
                        unit_amount: total,
                        recurring: { interval: "month" },
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            ...(Object.keys(subscriptionData).length > 0 ? { subscription_data: subscriptionData } : {}),
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3002"}/store/dashboard?plan=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3002"}/store/dashboard`,
            customer_email: storeEmail || undefined,
            metadata: { studioId, planKey, options: options.join(","), trialDays: String(trialDays || 0) },
        });

        return NextResponse.json({ sessionUrl: session.url });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
