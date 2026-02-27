import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// スタッフ一覧を取得（GET）
export async function GET() {
    try {
        const staffs = await prisma.staff.findMany({ orderBy: { id: 'asc' } });
        return NextResponse.json(staffs);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

// 新しいスタッフを追加（POST）
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const store = await prisma.store.findFirst();
        if (!store) throw new Error("店舗データがありません");

        const newStaff = await prisma.staff.create({
            data: {
                storeId: store.id,
                name: body.name || "新規スタッフ",
                email: body.email || "",
                phone: body.phone || "",
                role: body.role || "STAFF",
            }
        });
        return NextResponse.json(newStaff);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// スタッフ情報を更新（PUT）
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const updatedStaff = await prisma.staff.update({
            where: { id: parseInt(body.id) },
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                role: body.role,
            }
        });
        return NextResponse.json(updatedStaff);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// スタッフを削除（DELETE）
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error("IDが指定されていません");

        await prisma.staff.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}