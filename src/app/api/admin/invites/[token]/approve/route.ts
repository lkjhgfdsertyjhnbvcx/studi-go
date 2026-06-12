// 運営：提出内容を承認 → studios に本登録（公開）
import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { requirePlatformAdmin } from "@/lib/api-auth";
import { v4 as uuidv4 } from "uuid";
import { INTAKE_COLLECTION, intakeToStudioProfile, type StoreIntake } from "@/lib/intake";
import { VOWCHA_REFERRALS, type VowchaReferral } from "@/lib/vowcha";

export const dynamic = "force-dynamic";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    const denied = await requirePlatformAdmin();
    if (denied) return denied;

    try {
        const { token } = await params;
        const db = initializeAdmin();
        const ref = db.collection(INTAKE_COLLECTION).doc(token);
        const snap = await ref.get();

        if (!snap.exists) {
            return NextResponse.json({ error: "招待が見つかりません" }, { status: 404 });
        }
        const intake = snap.data() as StoreIntake;

        if (intake.status === "approved") {
            return NextResponse.json({ error: "すでに承認済みです", studioId: intake.studioId }, { status: 409 });
        }
        if (!intake.data || !intake.data.storeName || !intake.data.address || !intake.data.phone) {
            return NextResponse.json({ error: "店舗名・住所・電話番号が未入力のため承認できません" }, { status: 400 });
        }

        const studio = intakeToStudioProfile(intake.data);
        const now = new Date().toISOString();

        await db.collection("studios").doc(studio.id).set(studio);

        // VOWCHA同意済みなら紹介料管理（vowchaReferrals）に登録
        if ((studio as any).useActivaCoupon === true) {
            const referralId = uuidv4();
            const referral: VowchaReferral = {
                id: referralId,
                studioId: studio.id,
                storeName: studio.storeName,
                postalCode: studio.postalCode || "",
                address: studio.address || "",
                phone: studio.phone || "",
                email: studio.email || "",
                contactPerson: studio.contactPerson || "",
                consentAt: intake.submittedAt || now,
                source: "intake",
                createdAt: now,
                exportedAt: null,
                invoiceId: null,
            };
            await db.collection(VOWCHA_REFERRALS).doc(referralId).set(referral);
        }

        await ref.update({
            status: "approved",
            approvedAt: now,
            updatedAt: now,
            studioId: studio.id,
        });

        return NextResponse.json({ success: true, studioId: studio.id });
    } catch (error: any) {
        console.error("【招待承認APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
