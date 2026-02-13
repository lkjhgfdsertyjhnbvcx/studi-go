"use server";

import {
    getAllStudiosFromFirestore,
    getStudioByIdFromFirestore,
    saveStudioToFirestore,
    deleteStudioFromFirestore
} from "@/lib/db-firestore";
import { StudioProfile } from "@/lib/db-studio";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

// Get All
export async function fetchStudios() {
    return getAllStudiosFromFirestore();
}

// Get One
export async function fetchStudio(id: string) {
    return getStudioByIdFromFirestore(id);
}

// Upsert
export async function updateStudio(data: StudioProfile) {
    try {
        await saveStudioToFirestore(data);
        revalidatePath("/studios");
        revalidatePath(`/studios/${data.id}`);
        return { success: true, message: "Studio saved successfully." };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
}

// Create New
export async function createNewStudioAction() {
    const newStudio: StudioProfile = {
        id: uuidv4(),
        storeName: "New Studio",
        representative: "",
        manager: "",
        contactPerson: "",
        address: "",
        phone: "",
        email: "",
        businessHours: { weekday: "10:00-22:00", saturday: "10:00-22:00", sundayHoliday: "10:00-22:00" },
        url: "",
        studioCount: 0,
        rooms: [],
        studentDiscount: { enabled: false, discountType: 'amount', value: 0 },
        otherDiscounts: [],
        personalPracticeSettings: { enabled: true, reservationWindowType: 'days', reservationWindowValue: 1, maxPeople: 2 },
        designSettings: { logoSize: 100, backgroundColor: "#000000", backgroundType: 'color' },
        equipmentOptions: [],
        createdAt: new Date().toISOString()
    };
    await saveStudioToFirestore(newStudio);
    revalidatePath("/studios");
    return newStudio.id;
}

// Delete
export async function deleteStudioAction(id: string) {
    await deleteStudioFromFirestore(id);
    revalidatePath("/studios");
    return { success: true };
}
