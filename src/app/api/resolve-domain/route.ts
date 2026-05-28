import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

/**
 * カスタムドメインからスタジオIDを解決するAPI
 * GET /api/resolve-domain?domain=booking.mystudio.com
 */
export async function GET(request: NextRequest) {
    const domain = request.nextUrl.searchParams.get("domain");

    if (!domain) {
        return NextResponse.json({ error: "domain parameter required" }, { status: 400 });
    }

    try {
        // Firestoreでカスタムドメインが一致するスタジオを検索
        const snapshot = await adminDb
            .collection("studios")
            .where("customDomain", "==", domain.toLowerCase())
            .limit(1)
            .get();

        if (snapshot.empty) {
            return NextResponse.json({ error: "Studio not found for domain" }, { status: 404 });
        }

        const doc = snapshot.docs[0];
        return NextResponse.json({ studioId: doc.id });
    } catch (error: any) {
        console.error("Domain resolution error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
