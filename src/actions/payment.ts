"use server";

import { v4 as uuidv4 } from "uuid";
import { getAuthInfo } from "./admin-auth";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import {
    getAllPaymentsFromFirestore,
    getPaymentsByStudioIdFromFirestore,
    savePaymentToFirestore,
    updatePaymentStatusInFirestore
} from "@/lib/db-firestore";

export interface Payment {
    id: string;
    bookingId: string;
    studioId: string;
    studioName: string;
    userName: string;
    userEmail: string;
    userPhone?: string;
    amount: number;
    status: "paid" | "pending" | "failed";
    paymentMethod: "stripe" | "credit" | "other" | "bank_transfer";
    date: string;
    dueDate?: string;
    createdAt: string;
}

export async function fetchPayments(): Promise<any[]> {
    const auth = await getAuthInfo();

    if (auth.isAdmin) {
        return getAllPaymentsFromFirestore();
    }
    if (auth.studioId) {
        return getPaymentsByStudioIdFromFirestore(auth.studioId);
    }
    return [];
}

export async function sendReminderEmail(paymentId: string, email: string) {
    console.log(`[Email] Reminder to ${email} for ${paymentId}`);
    return { success: true };
}

export async function createPayment(data: any) {
    const newPayment: Payment = {
        id: uuidv4(),
        ...data,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
    };

    await savePaymentToFirestore(newPayment);
    revalidatePath("/admin/payments");
    return { success: true, paymentId: newPayment.id };
}

export async function updatePaymentStatus(paymentId: string, status: "paid" | "pending" | "failed") {
    noStore();
    try {
        await updatePaymentStatusInFirestore(paymentId, status);
        revalidatePath("/admin/payments");
        revalidatePath("/admin");
        revalidatePath("/", "layout");
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function processPaymentForBooking(bookingId: string) {
    noStore();
    try {
        const payments = await getAllPaymentsFromFirestore();
        const payment = payments.find(p => p.bookingId === bookingId);
        if (payment) {
            await updatePaymentStatusInFirestore(payment.id, "paid");
            revalidatePath("/bookings");
            return { success: true };
        } else {
            // Payment record wasn't created properly at booking time (likely old data)
            // Let's create it now then mark it as paid.
            const { getBookingByIdFromFirestore, getStudioByIdFromFirestore } = await import("@/lib/db-firestore");
            const booking = await getBookingByIdFromFirestore(bookingId);
            if (!booking) {
                return { success: false, message: "予約情報が見つかりません" };
            }
            const studio = await getStudioByIdFromFirestore(booking.studioId);

            const newPaymentResult = await createPayment({
                bookingId: booking.id,
                studioId: booking.studioId,
                studioName: studio?.storeName || "Unknown Studio",
                userName: "User",
                userEmail: "",
                amount: booking.totalPrice || 0,
                paymentMethod: "stripe"
            });

            if (newPaymentResult.success && newPaymentResult.paymentId) {
                await updatePaymentStatusInFirestore(newPaymentResult.paymentId, "paid");
                revalidatePath("/bookings");
                return { success: true };
            }
        }
        return { success: false, message: "支払い情報の生成に失敗しました" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
