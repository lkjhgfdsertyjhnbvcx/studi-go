import { db } from "./firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp
} from "firebase/firestore";
import { StudioProfile } from "./db-studio";
import { User } from "@/actions/auth";
import { Booking } from "./db-local";
import { Payment } from "@/actions/payment";

/**
 * Robust data cleaner for Firestore.
 * Ensures plain objects, converts NaNs, and handles nested structures.
 */
function toPlainObject(obj: any): any {
    if (obj === null || obj === undefined) return null;

    // Primitives
    if (typeof obj !== 'object') {
        if (typeof obj === 'number' && (isNaN(obj) || !isFinite(obj))) return 0;
        return obj;
    }

    if (obj instanceof Date) return obj.toISOString();

    // Arrays
    if (Array.isArray(obj)) {
        return obj.map(toPlainObject);
    }

    // Objects
    const result: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value === undefined) continue;

            // Deep clean nested designSettings specifically if it exists
            if (key === 'designSettings' && value && typeof value === 'object') {
                result[key] = {
                    logoSize: Number(value.logoSize) || 100,
                    backgroundColor: String(value.backgroundColor || "#000000"),
                    backgroundType: String(value.backgroundType || "color"),
                    backgroundImageUrl: value.backgroundImageUrl ? String(value.backgroundImageUrl) : "",
                    showMap: value.showMap !== false
                };
            } else {
                result[key] = toPlainObject(value);
            }
        }
    }
    return result;
}

export interface Campaign {
    id: string;
    title: string;
    description: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    target: "all" | "specific";
    targetStudioIds: string[];
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
}

export interface Coupon {
    id: string;
    code: string;
    title: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxUses: number;
    usedCount: number;
    validFrom: string;
    validUntil: string;
    targetStudioIds: string[];
    isActive: boolean;
    createdAt: string;
}

// --- STUDIOS ---
export const getAllStudiosFromFirestore = async (): Promise<StudioProfile[]> => {
    try {
        const snapshot = await getDocs(collection(db, "studios"));
        return snapshot.docs.map(doc => doc.data() as StudioProfile);
    } catch (e) {
        console.error("Error fetching studios:", e);
        return [];
    }
};

export const getStudioByIdFromFirestore = async (id: string): Promise<StudioProfile | null> => {
    try {
        const docRef = doc(db, "studios", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? (docSnap.data() as StudioProfile) : null;
    } catch (e) {
        console.error("Error fetching studio:", e);
        return null;
    }
};

export const saveStudioToFirestore = async (studio: StudioProfile): Promise<void> => {
    try {
        const cleanedData = toPlainObject(studio);

        console.log(`[saveStudioToFirestore] Saving studio: ${studio.id} (${studio.storeName})`);

        await setDoc(doc(db, "studios", studio.id), cleanedData);
    } catch (e) {
        console.error("[saveStudioToFirestore] Error saving studio:", e);
        throw e;
    }
};

export const deleteStudioFromFirestore = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "studios", id));
    } catch (e) {
        console.error("Error deleting studio:", e);
        throw e;
    }
};

// --- USERS ---
export const getAllUsersFromFirestore = async (): Promise<User[]> => {
    try {
        const snapshot = await getDocs(collection(db, "users"));
        return snapshot.docs.map(doc => doc.data() as User);
    } catch (e) {
        console.error("Error fetching users:", e);
        return [];
    }
};

export const getUserByIdFromFirestore = async (id: string): Promise<User | undefined> => {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? (docSnap.data() as User) : undefined;
    } catch (e) {
        console.error("Error fetching user:", e);
        return undefined;
    }
};

export const saveUserToFirestore = async (user: User): Promise<void> => {
    try {
        const cleanedData = toPlainObject(user);
        await setDoc(doc(db, "users", user.id), cleanedData);
    } catch (e) {
        console.error("Error saving user:", e);
        throw e;
    }
};

// --- BOOKINGS ---
export const getAllBookingsFromFirestore = async (): Promise<Booking[]> => {
    try {
        const snapshot = await getDocs(collection(db, "bookings"));
        return snapshot.docs.map(doc => doc.data() as Booking);
    } catch (e) {
        console.error("Error fetching bookings:", e);
        return [];
    }
};

export const getBookingByIdFromFirestore = async (id: string): Promise<Booking | undefined> => {
    try {
        const docRef = doc(db, "bookings", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? (docSnap.data() as Booking) : undefined;
    } catch (e) {
        console.error("Error fetching booking:", e);
        return undefined;
    }
};

export const saveBookingToFirestore = async (booking: Booking): Promise<void> => {
    try {
        const cleanedData = toPlainObject(booking);
        await setDoc(doc(db, "bookings", booking.id), cleanedData);
    } catch (e) {
        console.error("Error saving booking:", e);
        throw e;
    }
};

export const updateBookingInFirestore = async (id: string, updates: Partial<Booking>): Promise<boolean> => {
    try {
        await updateDoc(doc(db, "bookings", id), updates);
        return true;
    } catch (e) {
        console.error("Error updating booking:", e);
        return false;
    }
};

// --- PAYMENTS ---
export const getAllPaymentsFromFirestore = async (): Promise<Payment[]> => {
    try {
        const snapshot = await getDocs(collection(db, "payments"));
        return snapshot.docs.map(doc => doc.data() as Payment);
    } catch (e) {
        console.error("Error fetching payments:", e);
        return [];
    }
};

export const getPaymentsByStudioIdFromFirestore = async (studioId: string): Promise<Payment[]> => {
    try {
        const q = query(collection(db, "payments"), where("studioId", "==", studioId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data() as Payment);
    } catch (e) {
        console.error("Error fetching studio payments:", e);
        return [];
    }
};

export const savePaymentToFirestore = async (payment: Payment): Promise<void> => {
    try {
        const cleanedData = toPlainObject(payment);
        await setDoc(doc(db, "payments", payment.id), cleanedData);
    } catch (e) {
        console.error("Error saving payment:", e);
        throw e;
    }
};

export const updatePaymentStatusInFirestore = async (id: string, status: string): Promise<boolean> => {
    try {
        await updateDoc(doc(db, "payments", id), { status });
        return true;
    } catch (e) {
        console.error("Error updating payment status:", e);
        return false;
    }
};

// --- AVAILABILITY ---
export const checkAvailabilityFromFirestore = async (
    studioId: string,
    roomName: string | undefined,
    date: string,
    startTime: string,
    duration: number,
    excludeBookingId?: string
): Promise<boolean> => {
    try {
        const bookings = await getAllBookingsFromFirestore();

        // Convert new request to minutes from midnight
        const [startH, startM] = startTime.split(':').map(Number);
        const newStart = startH * 60 + startM;
        const newEnd = newStart + (duration * 60);

        const conflictingBookings = bookings.filter(b => {
            if (b.status === 'cancelled') return false;
            if (excludeBookingId && b.id === excludeBookingId) return false;
            if (b.date !== date) return false;
            if (b.studioId !== studioId) return false;
            if (roomName && b.roomName && b.roomName !== roomName) return false;
            return true;
        });

        for (const b of conflictingBookings) {
            const [h, m] = b.startTime.split(':').map(Number);
            const bStart = h * 60 + m;
            const bEnd = bStart + (b.durationHours * 60);

            if (newStart < bEnd && newEnd > bStart) {
                return false;
            }
        }
        return true;
    } catch (e) {
        console.error("Error checking availability:", e);
        return false;
    }
};

// --- CAMPAIGNS ---
export const getAllCampaignsFromFirestore = async (): Promise<Campaign[]> => {
    try {
        const snapshot = await getDocs(collection(db, "campaigns"));
        return snapshot.docs.map(doc => doc.data() as Campaign);
    } catch (e) {
        console.error("Error fetching campaigns:", e);
        return [];
    }
};

export const saveCampaignToFirestore = async (campaign: Campaign): Promise<void> => {
    try {
        const cleanedData = toPlainObject(campaign);
        await setDoc(doc(db, "campaigns", campaign.id), cleanedData);
    } catch (e) {
        console.error("Error saving campaign:", e);
        throw e;
    }
};

export const deleteCampaignFromFirestore = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "campaigns", id));
    } catch (e) {
        console.error("Error deleting campaign:", e);
        throw e;
    }
};

// --- COUPONS ---
export const getAllCouponsFromFirestore = async (): Promise<Coupon[]> => {
    try {
        const snapshot = await getDocs(collection(db, "coupons"));
        return snapshot.docs.map(doc => doc.data() as Coupon);
    } catch (e) {
        console.error("Error fetching coupons:", e);
        return [];
    }
};

export const saveCouponToFirestore = async (coupon: Coupon): Promise<void> => {
    try {
        const cleanedData = toPlainObject(coupon);
        await setDoc(doc(db, "coupons", coupon.id), cleanedData);
    } catch (e) {
        console.error("Error saving coupon:", e);
        throw e;
    }
};

export const deleteCouponFromFirestore = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "coupons", id));
    } catch (e) {
        console.error("Error deleting coupon:", e);
        throw e;
    }
};
