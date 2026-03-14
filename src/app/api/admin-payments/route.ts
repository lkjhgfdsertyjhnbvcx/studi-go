import { NextResponse } from "next/server";
import { getAllPaymentsFromFirestore } from "@/lib/db-firestore";
export async function GET() {
    try {
        const payments = await getAllPaymentsFromFirestore();
        return NextResponse.json(payments);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
