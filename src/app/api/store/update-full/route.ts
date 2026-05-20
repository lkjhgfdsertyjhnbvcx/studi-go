import { NextResponse } from "next/server";
import { saveStudioToFirestore } from "@/lib/db-firestore";
import { getApiAuth } from "@/lib/api-auth";

export async function POST(request: Request) {
    try {
        const auth = await getApiAuth();
        // 管理者 or 該当スタジオのオーナーのみ許可
        const data = await request.json();
        if (!data.id) return NextResponse.json({ error: "Missing studio id" }, { status: 400 });

        if (!auth.isAdmin && auth.studioId !== data.id) {
            return NextResponse.json({ error: "権限がありません" }, { status: 403 });
        }

        // SAVE ALL のたびに updatedAt を更新（運営管理画面の更新状況に反映される）
        const dataWithTimestamp = {
            ...data,
            updatedAt: new Date().toISOString(),
            ...(auth.isAdmin ? { lastEditedByAdmin: true, adminEditedAt: new Date().toISOString() } : {}),
        };
        await saveStudioToFirestore(dataWithTimestamp);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[update-full] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
