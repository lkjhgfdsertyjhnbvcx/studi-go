"use server";

import {
    checkAvailabilityFromFirestore,
    saveBookingToFirestore,
    getBookingByIdFromFirestore,
    updateBookingInFirestore,
    getAllBookingsFromFirestore,
    getAllStudiosFromFirestore,
    getAllPaymentsFromFirestore
} from "@/lib/db-firestore";
import { Booking } from "@/lib/db-local";
import { addMyStudioAction, getUserById } from "./user";
import { fetchStudio } from "./studio";
import { createPayment } from "./payment";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingRequest {
    userId: string;
    studioId: string;
    roomName?: string;
    date: string;
    startTime: string;
    durationHours: number;
    userCount: number;
    equipmentIds: string[];
    totalPriceOverride?: number;
    isPersonalPractice?: boolean;
    isSplitPayment?: boolean;
    bandId?: string;
    optionPaymentMode?: "split" | "booker";
    guaranteeMode?: "auth" | "provisional";
    optionsAmount?: number;
}

interface BookingResponse {
    success: boolean;
    message: string;
    price?: number;
    bookingId?: string;
    splitPaymentUrl?: string;
}

const PRICE_BAND_HOURLY = 2500;
const PRICE_INDIVIDUAL_HOURLY = 800;
const PRICE_LOCKOUT_FLAT = 20000;

export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
    const { userId, studioId, roomName, date, startTime, durationHours, userCount, totalPriceOverride } = data;

    // Fetch user info for payment and email
    const user = await getUserById(userId);
    const userName = user?.name || "Guest User";
    const userEmail = user?.email || "";

    const isAvailable = await checkAvailabilityFromFirestore(studioId, roomName, date, startTime, durationHours);
    if (!isAvailable) {
        return {
            success: false,
            message: "🚫 この時間帯は既に予約されています。別の時間を選択してください。"
        };
    }

    const studio = await fetchStudio(studioId);

    // 機材在庫チェック
    if (data.equipmentIds && data.equipmentIds.length > 0 && studio?.equipmentOptions) {
        const allBookings = await getAllBookingsFromFirestore();
        const [reqStartH, reqStartM] = startTime.split(':').map(Number);
        const reqStart = reqStartH * 60 + reqStartM;
        const reqEnd = reqStart + durationHours * 60;

        // 同日同時間帯の予約を取得
        const overlapping = allBookings.filter(b => {
            if (b.studioId !== studioId || b.date !== date || b.status === 'cancelled') return false;
            const [bh, bm] = (b.startTime || '00:00').split(':').map(Number);
            const bStart = bh * 60 + bm;
            const bEnd = bStart + (b.durationHours || 1) * 60;
            return reqStart < bEnd && reqEnd > bStart;
        });

        for (const eqName of data.equipmentIds) {
            const eqOption = studio.equipmentOptions.find((o: any) => o.name === eqName);
            if (!eqOption) continue;
            if (eqOption.status === 'broken' || eqOption.status === 'maintenance') {
                return { success: false, message: `${eqName} は現在使用できません（${eqOption.status === 'broken' ? '故障中' : 'メンテナンス中'}）。` };
            }
            const maxQty = eqOption.quantity ?? 1;
            const usedCount = overlapping.filter(b => (b as any).equipmentIds?.includes(eqName)).length;
            if (usedCount >= maxQty) {
                return { success: false, message: `${eqName} はこの時間帯に空きがありません（${maxQty}台中${usedCount}台使用中）。` };
            }
        }
    }
    if (data.isPersonalPractice) {
        if (!studio?.personalPracticeSettings?.enabled) {
            return { success: false, message: "個人練習の受付は現在停止しています。" };
        }

        const settings = studio.personalPracticeSettings;
        const targetDateTime = new Date(`${date}T${startTime}`);
        const now = new Date();
        let diffMs = targetDateTime.getTime() - now.getTime();

        if (settings.reservationWindowType === 'days') {
            const diffDays = diffMs / (1000 * 60 * 60 * 24);
            if (diffDays > settings.reservationWindowValue) {
                return { success: false, message: `個人練習は利用日の${settings.reservationWindowValue}日前から予約可能です。` };
            }
        } else {
            const diffHours = diffMs / (1000 * 60 * 60);
            if (diffHours > settings.reservationWindowValue) {
                return { success: false, message: `個人練習は利用の${settings.reservationWindowValue}時間前から予約可能です。` };
            }
        }

        if (userCount > settings.maxPeople) {
            return { success: false, message: `個人練習は最大${settings.maxPeople}名までです。` };
        }
    }

    let totalPrice = 0;
    if (totalPriceOverride !== undefined) {
        totalPrice = totalPriceOverride;
    } else {
        if (durationHours >= 10) {
            totalPrice = PRICE_LOCKOUT_FLAT;
        } else if (userCount <= 2) {
            totalPrice = PRICE_INDIVIDUAL_HOURLY * userCount * durationHours;
        } else {
            totalPrice = PRICE_BAND_HOURLY * durationHours;
        }
    }

    const newBooking: Booking = {
        id: Math.random().toString(36).substring(7),
        userId,
        studioId,
        roomName,
        date,
        startTime,
        durationHours,
        userCount,
        totalPrice,
        status: 'active',
        createdAt: new Date().toISOString(),
        isPersonalPractice: data.isPersonalPractice
    };

    try {
        await saveBookingToFirestore(newBooking);

        await createPayment({
            bookingId: newBooking.id,
            studioId: studioId,
            studioName: studio?.storeName || "Unknown Studio",
            userName: userName,
            userEmail: userEmail,
            amount: totalPrice,
            paymentMethod: "stripe"
        });

        await addMyStudioAction(studioId);

        let splitPaymentUrl: string | undefined;

        if (data.isSplitPayment) {
            // Prismaにモックデータを作成して割り勘機能をテスト可能にする
            const { prisma } = await import('@/lib/prisma');
            const { createSplitPayments } = await import('./split-payments');

            // Userの確保
            let prismaUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!prismaUser) {
                // セッション情報から取得を試みる
                const { getCurrentUser } = await import('./login');
                const currentUser = await getCurrentUser();
                prismaUser = await prisma.user.create({
                    data: {
                        id: userId,
                        email: currentUser?.email || 'guest@example.com',
                        name: currentUser?.name || 'Guest User'
                    }
                });
            }

            let finalBandId = data.bandId;

            // バンドが指定されていない、または存在しない場合のフォールバック（テスト用）
            if (!finalBandId) {
                let prismaBand = await prisma.band.findFirst({
                    where: { leaderId: userId }
                });
                if (!prismaBand) {
                    prismaBand = await prisma.band.create({
                        data: {
                            name: 'Test Band',
                            leaderId: userId,
                            members: { create: { userId: userId } }
                        }
                    });
                    // テスト用にメンバー追加
                    const subUser = await prisma.user.upsert({
                        where: { email: 'member@example.com' },
                        update: {},
                        create: { email: 'member@example.com', name: 'バンドメンバーA' }
                    });
                    await prisma.bandMember.upsert({
                        where: { userId_bandId: { userId: subUser.id, bandId: prismaBand.id } },
                        update: {},
                        create: { userId: subUser.id, bandId: prismaBand.id }
                    });
                }
                finalBandId = prismaBand.id;
            }

            // Prisma予約データの作成 (既存の予約IDと重複しないように注意が必要だが、Firestore IDをそのまま使う)
            const prismaReservation = await prisma.reservation.create({
                data: {
                    id: newBooking.id,
                    band: { connect: { id: finalBandId } },
                    status: data.guaranteeMode === 'auth' ? 'Confirmed' : 'Pending', // 与信枠確保の場合は本予約として扱う
                    isSplitPayment: true,
                    optionPaymentMode: data.optionPaymentMode,
                    guaranteeMode: data.guaranteeMode,
                    optionsAmount: data.optionsAmount || 0,
                    totalAmount: totalPrice,
                    studioId: studioId,
                    startTime: new Date(`${date}T${startTime}`),
                    endTime: new Date(new Date(`${date}T${startTime}`).getTime() + durationHours * 60 * 60 * 1000),
                }
            });

            // 割り勘セッションを発行（StripeアカウントIDは一旦ダミーもしくは環境変数から）
            await createSplitPayments(prismaReservation.id, 'acct_dummy', userId); // userIdを代表者として渡す

            splitPaymentUrl = `/split-payment/${prismaReservation.id}`;
        }

        // 予約完了メール（または割り勘用URLメール）を送信
        if (userEmail) {
            try {
                const emailContent = data.isSplitPayment
                    ? `予約（割り勘支払い待ち）を受け付けました。\n以下のURLからご自身のお支払いをお願いします。\n全員の支払いが完了次第、予約が確定します。\n\n支払URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${splitPaymentUrl}`
                    : `ご予約が完了しました。\n利用日時: ${date} ${startTime}\nご利用料金: ${totalPrice}円`;

                await resend.emails.send({
                    from: 'Studi-Go <system@studi-go.com>',
                    to: [userEmail],
                    subject: data.isSplitPayment ? '【Studi-Go】割り勘決済のご案内' : '【Studi-Go】ご予約完了のお知らせ',
                    text: emailContent
                });
                console.log(`Email sent successfully to ${userEmail}`);
            } catch (err) {
                console.error("Failed to send email", err);
            }
        }

        return {
            success: true,
            message: "予約が完了しました。",
            price: totalPrice,
            bookingId: newBooking.id,
            splitPaymentUrl
        };
    } catch (e: any) {
        console.error("Booking Error:", e);
        return { success: false, message: "予約に失敗しました。 " + e.message };
    }
}

export async function cancelBookingAction(bookingId: string): Promise<{ success: boolean; message: string }> {
    const success = await updateBookingInFirestore(bookingId, { status: 'cancelled' });
    if (success) return { success: true, message: "予約をキャンセルしました。" };
    return { success: false, message: "キャンセルの更新に失敗しました。" };
}

export async function updateBookingAction(bookingId: string, data: Partial<BookingRequest>): Promise<BookingResponse> {
    const oldBooking = await getBookingByIdFromFirestore(bookingId);
    if (!oldBooking) return { success: false, message: "予約が見つかりません。" };

    const studioId = data.studioId || oldBooking.studioId;
    const roomName = data.roomName || oldBooking.roomName;
    const date = data.date || oldBooking.date;
    const startTime = data.startTime || oldBooking.startTime;
    const durationHours = data.durationHours || oldBooking.durationHours;

    const isAvailable = await checkAvailabilityFromFirestore(studioId, roomName, date, startTime, durationHours, bookingId);
    if (!isAvailable) {
        return { success: false, message: "🚫 この時間帯は既に予約されています。" };
    }

    const success = await updateBookingInFirestore(bookingId, {
        ...data,
        status: 'modified'
    });

    if (success) return { success: true, message: "予約を更新しました。" };
    return { success: false, message: "予約の更新に失敗しました。" };
}

export async function fetchMyBookings(): Promise<any[]> {
    const { getCurrentUser } = await import("./login");
    const user = await getCurrentUser();
    if (!user) return [];

    const bookings = await getAllBookingsFromFirestore();
    const studios = await getAllStudiosFromFirestore();
    const studioMap = new Map(studios.map(s => [s.id, { name: s.storeName, invoice: s.invoiceNumber }]));

    const payments = await getAllPaymentsFromFirestore();
    const paymentStatusMap = new Map(payments.map(p => [p.bookingId, p.status]));

    return bookings
        .filter(b => b.userId === user.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(b => {
            const s = studioMap.get(b.studioId);
            return {
                ...b,
                studioName: s?.name || "Unknown Studio",
                invoiceNumber: s?.invoice || "",
                paymentStatus: paymentStatusMap.get(b.id) || "pending"
            };
        });
}
