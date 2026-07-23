// 運営：店舗招待の発行・一覧
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { INTAKE_COLLECTION, emptyIntakeData, type StoreIntake } from "@/lib/intake";

export const dynamic = "force-dynamic";

// 招待一覧
export async function GET() {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const db = initializeAdmin();
        const snap = await db.collection(INTAKE_COLLECTION).orderBy("createdAt", "desc").get();
        const invites = snap.docs.map((d) => d.data() as StoreIntake);
        return NextResponse.json({ invites });
    } catch (error: any) {
        console.error("【招待一覧APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 招待発行
export async function POST(request: Request) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const body = await request.json();
        const label = (body.label || "").trim();
        if (!label) {
            return NextResponse.json({ error: "店舗名を入力してください" }, { status: 400 });
        }

        const token = randomBytes(24).toString("hex");
        const now = new Date().toISOString();
        const intake: StoreIntake = {
            id: token,
            label,
            note: body.note || "",
            status: "pending",
            data: emptyIntakeData(label),
            createdAt: now,
            updatedAt: now,
            // 乗り換えキャンペーン（有料プラン2ヶ月無料）フラグ。指定時のみ保存
            ...(body.campaign === "switch-2m" ? { campaign: "switch-2m" } : {}),
        };

        const db = initializeAdmin();
        await db.collection(INTAKE_COLLECTION).doc(token).set(intake);

        return NextResponse.json({ success: true, invite: intake });
    } catch (error: any) {
        console.error("【招待発行APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
