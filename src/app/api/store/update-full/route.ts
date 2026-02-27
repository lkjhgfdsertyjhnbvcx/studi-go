import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { id, studios, options, ...storeData } = data;

        await prisma.store.update({
            where: { id: parseInt(id) },
            data: { ...storeData, useActivaCoupon: Boolean(storeData.useActivaCoupon) }
        });

        await prisma.option.deleteMany({ where: { storeId: parseInt(id) } });
        if (options && options.length > 0) {
            await prisma.option.createMany({
                data: options.map((o: any) => ({
                    name: o.name,
                    price: parseInt(o.price) || 0,
                    isHourly: Boolean(o.isHourly),
                    storeId: parseInt(id)
                }))
            });
        }

        for (const s of studios) {
            const payload = {
                name: s.name, size: s.size, description: s.description,
                photoUrl: s.photoUrl, equipment: s.equipment,
                pricingJson: JSON.stringify(s.pricing), storeId: parseInt(id)
            };
            if (s.id && typeof s.id === 'number') {
                await prisma.studio.update({ where: { id: s.id }, data: payload });
            } else {
                await prisma.studio.create({ data: payload });
            }
        }
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}