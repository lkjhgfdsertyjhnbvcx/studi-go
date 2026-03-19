import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
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
            createdAt: new Date().toISOString(),
            staff: [
                {
                    id: crypto.randomUUID(),
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    role: "admin" as const,
                    createdAt: new Date().toISOString(),
                },
            ],
        };

        await setDoc(doc(db, "studios", studioId), newStudio);

        return NextResponse.json({ success: true, store: { id: studioId, name: newStudio.storeName } });
    } catch (error: any) {
        console.error("【APIエラー詳細】:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
