import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "@/lib/password";

export async function POST(request: Request) {
    try {
        const { name, email, password, phone } = await request.json();
        if (!name || !email || !password || !phone) {
            return NextResponse.json({ error: "全ての項目を入力してください。" }, { status: 400 });
        }
        // メール重複チェック（Admin SDK使用）
        const existing = await adminDb.collection("users").where("email", "==", email).limit(1).get();
        if (!existing.empty) {
            return NextResponse.json({ error: "このメールアドレスは既に登録されています。" }, { status: 400 });
        }
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashPassword(password), // ハッシュ化して保存
            phone,
            authProvider: "email",
            createdAt: new Date().toISOString(),
            isJocollaUser: true,
            myStudios: [],
            bands: [],
        };
        await adminDb.collection("users").doc(newUser.id).set(newUser);
        return NextResponse.json({ success: true, userId: newUser.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
