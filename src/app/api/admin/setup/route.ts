import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const adminEmail = "kantoku@studi-go.com"; // 🌟 ここを好きなIDに変更してください
    const adminPassword = "password123";      // 🌟 ここを好きなPWに変更してください

    const admin = await prisma.admin.upsert({
        where: { email: adminEmail },
        update: { password: adminPassword },
        create: {
            email: adminEmail,
            password: adminPassword,
            name: "監督"
        }
    });

    return NextResponse.json({ message: "Admin ID/PW Updated!", email: admin.email });
}