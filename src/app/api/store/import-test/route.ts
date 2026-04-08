import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const steps: string[] = [];
    try {
        steps.push("1. Route loaded OK");

        // Step 2: Import admin SDK
        const { adminDb } = await import("@/lib/firebase-admin");
        steps.push("2. adminDb imported OK");

        // Step 3: Try simple Firestore read
        const snap = await adminDb.collection("users").limit(1).get();
        steps.push(`3. Firestore read OK (${snap.size} docs)`);

        // Step 4: Test uuid
        const { v4: uuidv4 } = await import("uuid");
        const testId = uuidv4();
        steps.push(`4. uuid OK (${testId})`);

        return NextResponse.json({ success: true, steps });
    } catch (error: any) {
        steps.push(`ERROR: ${error.message}`);
        return NextResponse.json({ success: false, steps, error: error.message, stack: error.stack?.substring(0, 500) }, { status: 500 });
    }
}
