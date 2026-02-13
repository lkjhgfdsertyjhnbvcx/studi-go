"use server";

import { v4 as uuidv4 } from "uuid";
import { getAllStudios } from "@/lib/db-studio";
import {
    getAllCouponsFromFirestore,
    saveCouponToFirestore,
    deleteCouponFromFirestore,
    Coupon
} from "@/lib/db-firestore";

// Generate random coupon code
function generateCouponCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Get all coupons
export async function fetchCoupons(): Promise<Coupon[]> {
    return getAllCouponsFromFirestore();
}

// Get studios (for target selection)
export async function fetchStudios() {
    return await getAllStudios();
}

// Generate new coupon
export async function generateCoupon(data: {
    title: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxUses: number;
    validFrom: string;
    validUntil: string;
    targetStudioIds: string[];
}): Promise<{ success: boolean; couponId: string; code: string }> {
    const coupons = await fetchCoupons();

    // Generate unique code
    let code = generateCouponCode();
    while (coupons.some((c) => c.code === code)) {
        code = generateCouponCode();
    }

    // Check if coupon is currently valid
    const today = new Date().toISOString().split("T")[0];
    const isActive = data.validFrom <= today && data.validUntil >= today;

    const newCoupon: Coupon = {
        id: uuidv4(),
        code,
        ...data,
        usedCount: 0,
        isActive,
        createdAt: new Date().toISOString(),
    };

    await saveCouponToFirestore(newCoupon);

    return { success: true, couponId: newCoupon.id, code };
}

// Delete coupon
export async function deleteCoupon(id: string): Promise<{ success: boolean }> {
    try {
        await deleteCouponFromFirestore(id);
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

// Validate and apply coupon
export async function validateCoupon(
    code: string,
    studioId: string
): Promise<{
    valid: boolean;
    discount?: { type: "percentage" | "fixed"; value: number };
    message?: string;
}> {
    const coupons = await fetchCoupons();
    const coupon = coupons.find((c) => c.code === code);

    if (!coupon) {
        return { valid: false, message: "クーポンコードが無効です" };
    }

    const today = new Date().toISOString().split("T")[0];

    if (!coupon.isActive) {
        return { valid: false, message: "このクーポンは無効です" };
    }

    if (today < coupon.validFrom || today > coupon.validUntil) {
        return { valid: false, message: "クーポンの有効期限外です" };
    }

    if (coupon.usedCount >= coupon.maxUses) {
        return { valid: false, message: "クーポンの利用上限に達しています" };
    }

    // Check if coupon is valid for this studio
    if (
        coupon.targetStudioIds.length > 0 &&
        !coupon.targetStudioIds.includes(studioId)
    ) {
        return { valid: false, message: "このスタジオでは使用できません" };
    }

    return {
        valid: true,
        discount: {
            type: coupon.discountType,
            value: coupon.discountValue,
        },
    };
}

// Use coupon (increment usage count)
export async function useCoupon(code: string): Promise<{ success: boolean }> {
    const coupons = await fetchCoupons();
    const couponIndex = coupons.findIndex((c) => c.code === code);

    if (couponIndex === -1) {
        return { success: false };
    }

    const coupon = coupons[couponIndex];
    coupon.usedCount += 1;

    // Deactivate if max uses reached
    if (coupon.usedCount >= coupon.maxUses) {
        coupon.isActive = false;
    }

    await saveCouponToFirestore(coupon);

    return { success: true };
}

// Update coupon status (called by cron job to deactivate expired coupons)
export async function updateCouponStatus(): Promise<void> {
    const coupons = await fetchCoupons();
    const today = new Date().toISOString().split("T")[0];

    let updated = false;

    for (const coupon of coupons) {
        const shouldBeActive =
            coupon.validFrom <= today &&
            coupon.validUntil >= today &&
            coupon.usedCount < coupon.maxUses;

        if (coupon.isActive !== shouldBeActive) {
            coupon.isActive = shouldBeActive;
            await saveCouponToFirestore(coupon);
        }
    }
}
