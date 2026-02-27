import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const updatedUser = await prisma.user.update({
            where: { id: 1 }, // テスト用ユーザーID
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email,   // 🌟 追加
                address: body.address // 🌟 追加
            }
        });
        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}