// 店舗セットアップ（招待リンク方式）の共通型・変換ロジック
import { v4 as uuidv4 } from "uuid";
import type { StudioProfile, Room, EquipmentOption } from "./db-studio";

export type IntakeStatus = "pending" | "in_progress" | "submitted" | "approved";

export interface IntakeRoom {
    id: string;
    name: string;
    description?: string;
    basePrice: number;        // 平日 1時間あたり料金
    saturdayPrice?: number;   // 未入力なら basePrice
    sundayPrice?: number;     // 未入力なら basePrice
    images: string[];
}

export interface IntakeEquipment {
    name: string;
    pricePerHour: number;
    priceType: "per_use" | "per_hour";
    quantity?: number;
    category?: "amp" | "drums" | "mic" | "pa" | "guitar" | "bass" | "keys" | "other";
}

export interface IntakeData {
    storeName: string;
    companyName?: string;
    representative?: string;
    contactPerson?: string;
    postalCode?: string;
    address: string;
    phone: string;
    email: string;
    url?: string;
    businessHours: { weekday: string; saturday: string; sundayHoliday: string };
    appealPoint?: string;
    logoUrl?: string;
    bgImageUrl?: string;
    images: string[];
    rooms: IntakeRoom[];
    equipmentOptions: IntakeEquipment[];
}

export interface StoreIntake {
    id: string;             // 招待トークン（URLの一部）
    label: string;          // 運営が招待時につける店舗名（仮）
    note?: string;
    status: IntakeStatus;
    data: IntakeData | null;
    createdAt: string;
    updatedAt: string;
    submittedAt?: string;
    approvedAt?: string;
    studioId?: string;      // 承認後に紐付く studios のID
}

export const INTAKE_COLLECTION = "storeIntakes";

export function emptyIntakeData(label: string): IntakeData {
    return {
        storeName: label,
        address: "",
        phone: "",
        email: "",
        businessHours: { weekday: "10:00-22:00", saturday: "10:00-22:00", sundayHoliday: "10:00-22:00" },
        images: [],
        rooms: [],
        equipmentOptions: [],
    };
}

function daySchedule(price: number) {
    return { slots: [{ start: "00:00", end: "24:00", price, pricingType: "fixed" as const }] };
}

/** 提出された入力内容から StudioProfile を生成（承認時に使用） */
export function intakeToStudioProfile(data: IntakeData): StudioProfile & { isPublished: boolean } {
    const rooms: Room[] = (data.rooms || []).map((r) => ({
        id: r.id || uuidv4(),
        name: r.name,
        description: r.description || "",
        images: r.images || [],
        basePrice: r.basePrice || 0,
        pricing: {
            weekday: daySchedule(r.basePrice || 0),
            saturday: daySchedule(r.saturdayPrice ?? r.basePrice ?? 0),
            sundayHoliday: daySchedule(r.sundayPrice ?? r.basePrice ?? 0),
        },
    }));

    const equipmentOptions: EquipmentOption[] = (data.equipmentOptions || []).map((e) => ({
        name: e.name,
        pricePerHour: e.pricePerHour || 0,
        priceType: e.priceType || "per_hour",
        quantity: e.quantity ?? 1,
        category: e.category || "other",
        status: "active",
    }));

    return {
        id: uuidv4(),
        storeName: data.storeName,
        companyName: data.companyName || "",
        representative: data.representative || "",
        representativeEmail: "",
        manager: data.contactPerson || "",
        contactPerson: data.contactPerson || "",
        postalCode: data.postalCode || "",
        address: data.address,
        phone: data.phone,
        email: data.email,
        businessHours: data.businessHours,
        url: data.url || "",
        appealPoint: data.appealPoint || "",
        logoUrl: data.logoUrl || "",
        bgImageUrl: data.bgImageUrl || "",
        images: data.images || [],
        studioCount: rooms.length,
        rooms,
        equipmentOptions,
        studentDiscount: { enabled: false, discountType: "amount", value: 0 },
        otherDiscounts: [],
        personalPracticeSettings: { enabled: true, reservationWindowType: "days", reservationWindowValue: 1, maxPeople: 2 },
        designSettings: {
            logoSize: 100,
            backgroundColor: "#000000",
            backgroundType: data.bgImageUrl ? "image" : "color",
            backgroundImageUrl: data.bgImageUrl || undefined,
        },
        isPublished: true, // 運営が確認・承認した時点で公開
        createdAt: new Date().toISOString(),
    };
}
