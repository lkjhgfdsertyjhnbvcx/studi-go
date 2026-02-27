"use server";

import { getBookings, updateBooking } from "@/lib/db-local";
import { getAllUsersFromFirestore, getUserByIdFromFirestore } from "@/lib/db-firestore";
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
    const users = await getAllUsersFromFirestore();
    return users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

    const allBookings = await getBookings();
    const userBookings = allBookings
        .filter(b => b.userId === userId)
        .sort((a, b) => new Date(b.date + 'T' + b.startTime).getTime() - new Date(a.date + 'T' + a.startTime).getTime());

    return {
        ...user,
        bookings: userBookings
    };
}
