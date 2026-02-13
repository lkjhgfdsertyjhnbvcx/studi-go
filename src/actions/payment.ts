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
