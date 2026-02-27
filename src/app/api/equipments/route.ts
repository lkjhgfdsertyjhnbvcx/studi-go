import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const equipments = await prisma.equipment.findMany({ orderBy: { id: 'asc' } });
        return NextResponse.json(equipments);
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const store = await prisma.store.findFirst();
        if (!store) throw new Error("店舗データがありません");

        const newEquipment = await prisma.equipment.create({
            data: {
                storeId: store.id,
                name: body.name || "新規オプション機材",
                price: parseInt(body.price) || 500,
                priceType: body.priceType || "PER_USE", // 🌟 課金方式を保存
            }
        });
        return NextResponse.json(newEquipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const updatedEquipment = await prisma.equipment.update({
            where: { id: parseInt(body.id) },
            data: {
                name: body.name,
                price: parseInt(body.price) || 0,
                priceType: body.priceType || "PER_USE", // 🌟 課金方式を更新
            }
        });
        return NextResponse.json(updatedEquipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error("IDが指定されていません");

        await prisma.equipment.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}