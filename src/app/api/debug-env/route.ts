import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
    return NextResponse.json({
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "SET" : "NOT SET",
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "SET" : "NOT SET",
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "SET" : "NOT SET",
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "SET" : "NOT SET",
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? "SET" : "NOT SET",
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? "SET (length:" + process.env.FIREBASE_PRIVATE_KEY.length + ")" : "NOT SET",
    });
}
