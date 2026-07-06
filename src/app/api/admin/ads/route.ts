import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";

const DOC_REF = "platform/adSettings";

export async function GET() {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const snap = await adminDb.collection("platform").doc("adSettings").get();
        if (!snap.exists) return NextResponse.json({ error: "not found" });
        return NextResponse.json(snap.data());
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const data = await request.json();
        await adminDb.collection("platform").doc("adSettings").set(data);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
