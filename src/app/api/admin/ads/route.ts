import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DOC_REF = "platform/adSettings";

export async function GET() {
    try {
        const snap = await getDoc(doc(db, "platform", "adSettings"));
        if (!snap.exists()) return NextResponse.json({ error: "not found" });
        return NextResponse.json(snap.data());
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await setDoc(doc(db, "platform", "adSettings"), data);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
