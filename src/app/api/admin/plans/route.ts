// /api/admin/plans - 運営側による店舗プラン編集
import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function PUT(request: Request) {
    try {
        const { studioId, planKey, planOptions, planPayMethod, planTrialDays } = await request.json();

        if (!studioId) {
            return NextResponse.json({ error: "studioId is required" }, { status: 400 });
        }

        const updateData: Record<string, any> = {
            planUpdatedAt: new Date().toISOString(),
        };

        // planKey が空文字・null なら削除（未契約）
        if (planKey) {
            updateData.planKey = planKey;
        } else {
            updateData.planKey = null;
        }
        updateData.planOptions = planOptions || [];
        updateData.planPayMethod = planPayMethod || null;
        updateData.planTrialDays = planTrialDays ? Number(planTrialDays) : 0;

        await updateDoc(doc(db, "studios", studioId), updateData);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[admin/plans PUT]", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
