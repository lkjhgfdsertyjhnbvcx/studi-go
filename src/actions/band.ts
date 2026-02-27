"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./login";
import { revalidatePath } from "next/cache";

export async function createBandAction(name: string) {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: "ログインが必要です。" };
    }

    try {
        // Prisma側にUserが存在することを確認（いなければ作成）
        let prismaUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (!prismaUser) {
            prismaUser = await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    jocollaRegistered: true // JOCOLLA経由としての登録
                }
            });
        }

        const band = await prisma.band.create({
            data: {
                name,
                leaderId: user.id,
                members: {
                    create: {
                        userId: user.id
                    }
                }
            }
        });

        revalidatePath("/");
        return { success: true, bandId: band.id, inviteToken: band.inviteToken };
    } catch (e: any) {
        console.error("Create Band Error:", e);
        return { success: false, message: "バンドの作成に失敗しました。" };
    }
}

export async function fetchMyBands() {
    const user = await getCurrentUser();
    if (!user) return [];

    try {
        const members = await prisma.bandMember.findMany({
            where: { userId: user.id },
            include: {
                band: {
                    include: {
                        members: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });

        return members.map((m: any) => m.band);
    } catch (e) {
        console.error("Fetch Bands Error:", e);
        return [];
    }
}

export async function joinBandAction(inviteToken: string) {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: "ログインが必要です。", needsLogin: true };
    }

    try {
        const band = await prisma.band.findUnique({
            where: { inviteToken },
            include: { members: true }
        });

        if (!band) {
            return { success: false, message: "招待URLが無効です。" };
        }

        // 既にメンバーかチェック
        const isAlreadyMember = band.members.some((m: any) => m.userId === user.id);
        if (isAlreadyMember) {
            return { success: true, message: "既に参加しています。", bandId: band.id };
        }

        // User確保
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

        await prisma.bandMember.create({
            data: {
                bandId: band.id,
                userId: user.id
            }
        });

        revalidatePath("/");
        return { success: true, message: `${band.name} に参加しました！`, bandId: band.id };
    } catch (e) {
        console.error("Join Band Error:", e);
        return { success: false, message: "参加処理に失敗しました。" };
    }
}

export async function getBandByTokenAction(inviteToken: string) {
    try {
        const band = await prisma.band.findUnique({
            where: { inviteToken },
            select: {
                id: true,
                name: true,
                leader: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (!band) return { success: false, message: "バンドが見つかりません。" };
        return { success: true, band };
    } catch (e) {
        return { success: false, message: "データ取得に失敗しました。" };
    }
}

export async function getBandTokenByReservationAction(reservationId: string) {
    try {
        const res = await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: { band: true }
        });
        if (res?.band?.inviteToken) {
            return { success: true, inviteToken: res.band.inviteToken };
        }
        return { success: false, message: "バンド情報が見つかりません。" };
    } catch (e) {
        return { success: false, message: "データ取得に失敗しました。" };
    }
}
