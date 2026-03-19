// app/api/studios/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const studiosRef = collection(db, "studios");
    const snapshot = await getDocs(studiosRef);
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
    await deleteDoc(doc(db, "studios", id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("【studios DELETE エラー】", error?.message || error);
    return NextResponse.json({
      error: "Failed to delete studio",
      detail: error?.message || String(error)
    }, { status: 500 });
  }
}
