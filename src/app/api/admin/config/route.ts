import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { requirePlatformAdmin } from "@/lib/api-auth";

const CONFIG_DOC = "admin_config";

export async function GET() {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const snap = await getDoc(doc(db, "config", CONFIG_DOC));
        return NextResponse.json(snap.exists() ? snap.data() : { adCode: "" });
    } catch (error) {
        return NextResponse.json({ adCode: "" });
    }
}

export async function POST(request: Request) {
    try {
        const denied = await requirePlatformAdmin();
        if (denied) return denied;
        const { adCode } = await request.json();
        await setDoc(doc(db, "config", CONFIG_DOC), { adCode });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
