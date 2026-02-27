import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, companyName, ownerName, address, tel, url } = body;

        const updatedStore = await prisma.store.update({
            where: { id: parseInt(id) },
            data: {
                name,
                companyName,
                ownerName,
                address,
                tel,
                url
            }
        });

        return NextResponse.json({ success: true, store: updatedStore });
    } catch (error: any) {
        console.error("Profile Update Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}