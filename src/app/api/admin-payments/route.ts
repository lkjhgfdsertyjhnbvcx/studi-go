import { NextResponse } from "next/server";
import { getAllPaymentsFromFirestore } from "@/lib/db-firestore";
import { getApiAuth } from "@/lib/api-auth";

export async function GET() {
    try {
        const auth = await getApiAuth();
        if (!auth.isAdmin && !auth.studioId) {
            return NextResponse.json({ error: "権限がありません" }, { status: 403 });
        }
        const payments = await getAllPaymentsFromFirestore();
        return NextResponse.json(payments);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
