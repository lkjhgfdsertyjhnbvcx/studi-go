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
    let studios = await getAllStudiosFromFirestore();

    // Fallback if Firestore is empty
    if (studios.length === 0) {
        try {
            const fs = await import('fs');
            const path = await import('path');
            const studioPath = path.join(process.cwd(), 'data', 'studios.json');
            if (fs.existsSync(studioPath)) {
                studios = JSON.parse(fs.readFileSync(studioPath, 'utf-8'));
            }
        } catch (e) { }
    }
    return studios;
}

// Get One
export async function fetchStudio(id: string) {
    let studio = await getStudioByIdFromFirestore(id);

    // Fallback to local JSON if Firestore fails or is empty
    if (!studio) {
        try {
            const fs = await import('fs');
            const path = await import('path');
            const studioPath = path.join(process.cwd(), 'data', 'studios.json');
            if (fs.existsSync(studioPath)) {
                const studios: StudioProfile[] = JSON.parse(fs.readFileSync(studioPath, 'utf-8'));
                studio = studios.find(s => s.id === id) || null;
            }
        } catch (e) { }
    }

    console.log(`[fetchStudio] ID: ${id}, Result: ${studio ? studio.storeName : 'NOT FOUND'}`);
    return studio;
}

// Upsert
export async function updateStudio(data: StudioProfile) {
    console.log("[updateStudio] ID:", data.id);
    if (data.designSettings) {
        console.log("[updateStudio] designSettings:", JSON.stringify(data.designSettings));
    }
    try {
        await saveStudioToFirestore(data);
        revalidatePath("/studios");
        revalidatePath(`/admin/studios/${data.id}`);
        return { success: true, message: "Studio saved successfully." };
    } catch (e: any) {
        console.error("[updateStudio] Error:", e);
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
