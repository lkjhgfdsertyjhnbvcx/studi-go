// app/api/studios/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const snapshot = await adminDb.collection("studios").get();
    let studios = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];

    if (publishedOnly) {
      studios = studios.filter((s) => s.isPublished === true);
    }

    return NextResponse.json(studios);
  } catch (error: any) {
    console.error("【studios API エラー】", error?.message || error);
    return NextResponse.json({
      error: "Failed to fetch studios",
      detail: error?.message || String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "studio id required" }, { status: 400 });
    await adminDb.collection("studios").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("【studios DELETE エラー】", error?.message || error);
    return NextResponse.json({
      error: "Failed to delete studio",
      detail: error?.message || String(error)
    }, { status: 500 });
  }
}
