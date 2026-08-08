"use server";

import { getBookings, updateBooking } from "@/lib/db-local";
import { getAllUsersFromFirestore, getUserByIdFromFirestore, getAllStudiosFromFirestore } from "@/lib/db-firestore";
import { User } from "./auth";

export async function fetchBookings() {
    const bookings = await getBookings();
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function fetchBookingsByStudio(studioId: string) {
    const allBookings = await getBookings();
    return allBookings
        .filter(booking => booking.studioId === studioId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateBookingStatus(id: string, status: 'active' | 'cancelled' | 'modified' | 'no_show') {
    return await updateBooking(id, { status });
}

export async function fetchUsers() {
    const [users, allBookings, studios] = await Promise.all([
        getAllUsersFromFirestore(),
        getBookings(),
        getAllStudiosFromFirestore(),
    ]);

    // 一覧でも「どの店舗を使っているか」が分かるよう、利用店舗名と予約件数を付与する
    const studioMap = new Map<string, any>(studios.map((s: any) => [s.id, s] as [string, any]));
    const todayStr = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0]; // JST基準
    const byUser = new Map<string, { names: Set<string>; count: number; upcoming: number }>();
    for (const b of allBookings) {
        if (!b.userId) continue;
        const cur = byUser.get(b.userId) || { names: new Set<string>(), count: 0, upcoming: 0 };
        if (b.status !== "cancelled") {
            const studio: any = studioMap.get(b.studioId);
            cur.names.add(studio?.storeName || (b as any).studioName || "（削除された店舗）");
            cur.count += 1;
            if (b.date >= todayStr) cur.upcoming += 1;
        }
        byUser.set(b.userId, cur);
    }

    const enriched = users.map(u => {
        const agg = byUser.get(u.id);
        return {
            ...u,
            studioNames: agg ? Array.from(agg.names) : [],
            bookingCount: agg?.count || 0,
            upcomingCount: agg?.upcoming || 0,
        };
    });

    return enriched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function fetchUsersByStudio(studioId: string) {
    const allBookings = await getBookings();
    const studioBookings = allBookings.filter(b => b.studioId === studioId);
    const users = await getAllUsersFromFirestore();

    const result = users
        .filter(user => studioBookings.some(b => b.userId === user.id))
        .map(user => ({
            ...user,
            bookings: studioBookings
                .filter(b => b.userId === user.id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }));

    return result.sort((a, b) => {
        // Sort by the most recent booking in this studio
        const lastA = new Date(a.bookings[0].createdAt).getTime();
        const lastB = new Date(b.bookings[0].createdAt).getTime();
        return lastB - lastA;
    });
}

export async function fetchUserDetail(userId: string) {
    const user = await getUserByIdFromFirestore(userId);
    if (!user) return null;

    const [allBookings, studios] = await Promise.all([
        getBookings(),
        getAllStudiosFromFirestore(),
    ]);

    // 予約レコードに studioName が入っていないもの（/api/bookings/create 経由など）があるため、
    // studioId から店舗名を解決する。これをしないと管理画面で「店舗」としか表示されない。
    const studioMap = new Map<string, any>(studios.map((s: any) => [s.id, s] as [string, any]));

    const userBookings = allBookings
        .filter(b => b.userId === userId)
        .map(b => {
            const studio: any = studioMap.get(b.studioId);
            return {
                ...b,
                studioName: studio?.storeName || (b as any).studioName || (b as any).storeName || "（削除された店舗）",
                studioAddress: studio?.address || (b as any).studioAddress || "",
            };
        })
        .sort((a, b) => new Date(b.date + 'T' + b.startTime).getTime() - new Date(a.date + 'T' + a.startTime).getTime());

    // 利用スタジオのサマリー（どの店舗を何回使ったか・直近利用日・今後の予約件数）
    const todayStr = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0]; // JST基準
    const byStudio = new Map<string, any>();
    for (const b of userBookings) {
        const key = b.studioId || "unknown";
        const cur = byStudio.get(key) || {
            studioId: b.studioId,
            studioName: b.studioName,
            total: 0,
            cancelled: 0,
            upcoming: 0,
            lastDate: "",
            totalSpent: 0,
        };
        cur.total += 1;
        if (b.status === "cancelled") cur.cancelled += 1;
        else {
            cur.totalSpent += b.totalPrice || 0;
            if (b.date >= todayStr) cur.upcoming += 1;
            if (b.date > cur.lastDate) cur.lastDate = b.date;
        }
        byStudio.set(key, cur);
    }
    const studiosUsed = Array.from(byStudio.values())
        .sort((a, b) => (b.lastDate || "").localeCompare(a.lastDate || ""));

    return {
        ...user,
        bookings: userBookings,
        studiosUsed,
        upcomingCount: userBookings.filter(b => b.status !== "cancelled" && b.date >= todayStr).length,
    };
}
