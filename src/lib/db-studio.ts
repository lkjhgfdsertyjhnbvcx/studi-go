import { v4 as uuidv4 } from 'uuid';
import {
    getAllStudiosFromFirestore,
    getStudioByIdFromFirestore,
    saveStudioToFirestore,
    deleteStudioFromFirestore
} from './db-firestore';

// --- Types ---
export interface TimeSlotPrice {
    start: string;
    end: string;
    price: number;
    pricingType?: 'fixed' | 'discount';
    discountRate?: number; // Percentage (e.g., 20 for 20% off)
}
export interface DaySchedule {
    slots: TimeSlotPrice[];
}
export interface RoomPricing {
    weekday: DaySchedule;
    saturday: DaySchedule;
    sundayHoliday: DaySchedule;
}
export interface Room {
    id: string; // generated uuid or simple ID
    name: string;
    description?: string;
    images?: string[];
    basePrice: number;
    pricing: RoomPricing;
}
export interface EquipmentOption {
    name: string;
    pricePerHour: number;
}
export interface BusinessHours {
    weekday: string;
    saturday: string;
    sundayHoliday: string;
}
export interface StaffMember {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'staff';
    createdAt: string;
}

export interface BlacklistEntry {
    userId: string;
    userName: string;
    email?: string;
    reason: string;
    createdAt: string;
}

export interface PersonalPracticeSettings {
    enabled: boolean;
    reservationWindowType: 'hours' | 'days';
    reservationWindowValue: number;
    maxPeople: number;
}

export interface DesignSettings {
    logoSize: number; // percentage
    backgroundColor: string;
    backgroundImageUrl?: string;
    backgroundType: 'color' | 'image';
    showMap?: boolean;
}

export interface StudioProfile {
    id: string; // UUID
    storeName: string;
    companyName?: string;
    representative: string;
    representativeEmail?: string;
    manager: string; // 担当者名 (or using contactPerson)
    contactPerson: string;
    contactPersonEmail?: string;
    postalCode?: string;
    address: string;
    phone: string;
    email: string; // 店舗全体メール
    businessHours: BusinessHours;
    url: string;
    studioCount: number;
    rooms: Room[];
    equipmentOptions: EquipmentOption[];
    options?: string;
    images?: string[]; // Array of image URLs or base64
    appealPoint?: string; // Marketing text
    monthlyRevenueTarget?: number; // Target for Analytics
    logoUrl?: string; // Studio Logo
    invoiceNumber?: string; // Qualified Invoice Issuer Number (T-number)
    staff?: StaffMember[];
    blacklist?: BlacklistEntry[];
    studentDiscount?: {
        enabled: boolean;
        discountType: 'amount' | 'percentage';
        value: number;
    };
    otherDiscounts?: Array<{
        name: string;
        enabled: boolean;
        discountType: 'amount' | 'percentage';
        value: number;
    }>;
    personalPracticeSettings?: PersonalPracticeSettings;
    designSettings?: DesignSettings;
    createdAt: string;
}

// --- Helpers (Bridging to Firestore) ---

export const getAllStudios = async (): Promise<StudioProfile[]> => {
    return getAllStudiosFromFirestore();
};

export const getStudioById = async (id: string): Promise<StudioProfile | null> => {
    return getStudioByIdFromFirestore(id);
};

export const saveStudio = async (profile: StudioProfile): Promise<void> => {
    await saveStudioToFirestore(profile);
};

export const deleteStudio = async (id: string): Promise<void> => {
    await deleteStudioFromFirestore(id);
}

export const createEmptyStudio = (): StudioProfile => {
    return {
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
};
