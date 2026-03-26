import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getStudioByIdFromFirestore, saveStudioToFirestore } from "@/lib/db-firestore";

export async function POST(request: Request) {
    try {
        const { studioId } = await request.json();
        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio) return NextResponse.json({ error: "Studio not found" }, { status: 404 });

        let accountId = studio.stripeAccountId;
        if (!accountId) {
            const account = await stripe.accounts.create({
                type: "express",
                country: "JP",
                email: studio.email,
                capabilities: { transfers: { requested: true } },
                business_type: "company",
                metadata: { studioId },
            });
            accountId = account.id;
            await saveStudioToFirestore({ ...studio, stripeAccountId: accountId, stripeAccountStatus: "pending" });
        }

        const origin = request.headers.get("origin") || "http://localhost:3000";
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${origin}/store/dashboard?connect=refresh`,
            return_url: `${origin}/store/dashboard?connect=success`,
            type: "account_onboarding",
        });

        return NextResponse.json({ url: accountLink.url });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get("studioId");
        if (!studioId) return NextResponse.json({ error: "studioId required" }, { status: 400 });

        const studio = await getStudioByIdFromFirestore(studioId);
        if (!studio?.stripeAccountId) return NextResponse.json({ status: "none" });

        const account = await stripe.accounts.retrieve(studio.stripeAccountId);
        const status = account.charges_enabled ? "active" : "pending";
        await saveStudioToFirestore({ ...studio, stripeAccountStatus: status });
        return NextResponse.json({ status, accountId: studio.stripeAccountId });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
