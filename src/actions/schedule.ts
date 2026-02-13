"use server";

import { getBookings } from "@/lib/db-local";

export async function getBookingsAction() {
    const bookings = await getBookings();
    // Re-map or sanitize if needed
    return bookings;
}
