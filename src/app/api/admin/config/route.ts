import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";

const CONFIG_DOC = "admin_config";

export async function GET() {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const snap = await adminDb.collection("config").doc(CONFIG_DOC).get();
        return NextResponse.json(snap.exists ? snap.data() : { adCode: "" });
    } catch (error) {
        return NextResponse.json({ adCode: "" });
    }
}

export async function POST(request: Request) {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const { adCode } = await request.json();
        await adminDb.collection("config").doc(CONFIG_DOC).set({ adCode });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
