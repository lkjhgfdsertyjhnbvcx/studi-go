import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 店舗作成
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const store = await (prisma as any).store.create({
            data: { name: body.name }
        });
        return NextResponse.json(store);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 店舗一覧取得
export async function GET() {
    try {
        const stores = await (prisma as any).store.findMany();
        return NextResponse.json(stores);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 店舗削除
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) throw new Error("IDが指定されていません");

        await (prisma as any).store.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
