// LPからの資料請求・相談リード受付API
// 単体HTMLのLP（lp-switch.html / lp-start.html）から fetch で呼ばれるため CORS 対応
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { storeName, email, phone, interest, currentSystem, source } = body || {};

        if (!storeName || !email) {
            return NextResponse.json(
                { error: "スタジオ名とメールアドレスは必須です。" },
                { status: 400, headers: CORS_HEADERS }
            );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
            return NextResponse.json(
                { error: "メールアドレスの形式が正しくありません。" },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const lead = {
            id: uuidv4(),
            storeName: String(storeName).slice(0, 200),
            email: String(email).slice(0, 200),
            phone: phone ? String(phone).slice(0, 50) : "",
            interest: ["docs", "consult", "demo"].includes(interest) ? interest : "docs",
            currentSystem: currentSystem ? String(currentSystem).slice(0, 200) : "",
            source: ["lp-switch", "lp-start"].includes(source) ? source : "unknown",
            status: "new", // new -> contacted -> closed
            createdAt: new Date().toISOString(),
        };

        await adminDb.collection("lpLeads").doc(lead.id).set(lead);

        return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    } catch (error: any) {
        console.error("lp-leads error:", error);
        return NextResponse.json(
            { error: "送信に失敗しました。" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
