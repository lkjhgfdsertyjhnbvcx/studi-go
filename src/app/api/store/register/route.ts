import { NextResponse } from "next/server";
import { initializeAdmin } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const studioId = uuidv4();

        const newStudio = {
            id: studioId,
            storeName: body.name,
            email: body.email,
            representative: "",
            manager: "",
            contactPerson: "",
            address: "",
            phone: "",
            businessHours: { weekday: "10:00-22:00", saturday: "10:00-22:00", sundayHoliday: "10:00-22:00" },
            url: "",
            studioCount: 0,
            rooms: [],
            studentDiscount: { enabled: false, discountType: "amount", value: 0 },
            otherDiscounts: [],
            personalPracticeSettings: { enabled: true, reservationWindowType: "days", reservationWindowValue: 1, maxPeople: 2 },
            designSettings: { logoSize: 100, backgroundColor: "#000000", backgroundType: "color" },
            equipmentOptions: [],
            isPublished: false,
            createdAt: new Date().toISOString(),
            staff: [
                {
                    id: crypto.randomUUID(),
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    role: "admin",
                    createdAt: new Date().toISOString(),
                },
            ],
        };

        const db = initializeAdmin();
        await db.collection("studios").doc(studioId).set(newStudio);

        return NextResponse.json({ success: true, store: { id: studioId, name: newStudio.storeName } });
    } catch (error: any) {
        console.error("【店舗登録APIエラー】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
