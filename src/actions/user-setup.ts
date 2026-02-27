"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./login";

export async function checkUserSetupAction() {
    const user = await getCurrentUser();
    if (!user) return { success: false };

    try {
        let prismaUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (!prismaUser) {
            await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    jocollaRegistered: true
                }
            });
        }
        return { success: true, userId: user.id };
    } catch (e) {
        console.error("User setup error:", e);
        return { success: false };
    }
}
