// 運営：店舗招待の削除
import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { INTAKE_COLLECTION } from "@/lib/intake";

export const dynamic = "force-dynamic";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const { token } = await params;
        const db = initializeAdmin();
        await db.collection(INTAKE_COLLECTION).doc(token).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("【招待削除APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
