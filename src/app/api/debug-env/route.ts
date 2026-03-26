import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
    const results: any = {
        envCheck: {
            NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "NOT SET",
        },
        clientSDK: { status: "not tested" },
        adminSDK: { status: "not tested" },
    };

    // Test 1: Client SDK Firestore read
    try {
        const snapshot = await getDocs(collection(db, "studios"));
        results.clientSDK = {
            status: "OK",
            studioCount: snapshot.size,
        };
    } catch (e: any) {
        results.clientSDK = {
            status: "ERROR",
            message: e.message,
            code: e.code,
            name: e.name,
        };
    }

    // Test 2: Admin SDK Firestore read
    try {
        const { initializeAdmin } = require("@/lib/firebase-admin");
        const adminDb = initializeAdmin();
        const snap = await adminDb.collection("studios").get();
        results.adminSDK = {
            status: "OK",
            studioCount: snap.size,
        };
    } catch (e: any) {
        results.adminSDK = {
            status: "ERROR",
            message: e.message,
            code: e.code,
            name: e.name,
        };
    }

    return NextResponse.json(results);
}
