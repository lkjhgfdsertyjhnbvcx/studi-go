// app/api/studios/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore timeout")), 6000)
    );
    const snapshot = await Promise.race([
      adminDb.collection("studios").get(),
      timeoutPromise,
    ]) as FirebaseFirestore.QuerySnapshot;
    const studios = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(studios);
  } catch (error) {
    console.error("Error fetching studios:", error);
    return NextResponse.json({ error: "Failed to fetch studios" }, { status: 500 });
  }
}
