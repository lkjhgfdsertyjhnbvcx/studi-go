import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PLAN_DEFINITIONS, PLAN_OPTIONS } from "@/lib/plan-features";

export async function POST(request: Request) {
    try {
        const { studioId, planKey, options = [], storeEmail, trialDays } = await request.json();

        // 価格・課金種別は plan-features を単一ソースとして参照
        const planPrice = PLAN_DEFINITIONS.find(p => p.id === planKey)?.price ?? 0;
        const selectedOptions = (options as string[])
            .map(k => PLAN_OPTIONS.find(o => o.id === k))
            .filter((o): o is NonNullable<typeof o> => Boolean(o));

        // 月額オプション（プラン本体に合算）と、買い切りオプション（初回のみ）を分離
        const monthlyOptionTotal = selectedOptions
            .filter(o => o.billingType === "monthly")
            .reduce((sum, o) => sum + o.price, 0);
        const onceOptions = selectedOptions.filter(o => o.billingType === "once");

        const recurringAmount = planPrice + monthlyOptionTotal;

        // 無料期間の設定（店舗ごとに個別設定）
        const subscriptionData: Record<string, any> = {};
        if (trialDays && trialDays > 0) {
            subscriptionData.trial_period_days = trialDays;
        }

        // 月額（サブスク）行 + 買い切り（初回のみ請求される one-time）行
        const lineItems: any[] = [
            {
                price_data: {
                    currency: "jpy",
                    product_data: { name: `Studi-Go ${planKey}プラン` + (monthlyOptionTotal > 0 ? ` + 月額オプション` : "") },
                    unit_amount: recurringAmount,
                    recurring: { interval: "month" },
                },
                quantity: 1,
            },
            ...onceOptions.map(o => ({
                price_data: {
                    currency: "jpy",
                    product_data: { name: `${o.name}（初回のみ）` },
                    unit_amount: o.price,
                },
                quantity: 1,
            })),
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
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
