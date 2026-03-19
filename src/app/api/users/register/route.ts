import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "@/lib/password";

export async function POST(request: Request) {
    try {
        const { name, email, password, phone } = await request.json();
        if (!name || !email || !password || !phone) {
            return NextResponse.json({ error: "全ての項目を入力してください。" }, { status: 400 });
        }
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashPassword(password),
            phone,
            authProvider: "email",
            createdAt: new Date().toISOString(),
            isJocollaUser: true,
            myStudios: [],
            bands: [],
        };
        await setDoc(doc(db, "users", newUser.id), newUser);
        return NextResponse.json({ success: true, userId: newUser.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
