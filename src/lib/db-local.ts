import {
    getAllBookingsFromFirestore,
    getBookingByIdFromFirestore,
    saveBookingToFirestore,
    updateBookingInFirestore,
    checkAvailabilityFromFirestore
} from './db-firestore';

export interface Booking {
    id: string;
    userId: string;
    studioId: string;
    roomName?: string;
    date: string;       // YYYY-MM-DD
    startTime: string;  // HH:mm
    durationHours: number;
    userCount: number;
    totalPrice: number;
    status: 'active' | 'cancelled' | 'modified' | 'no_show';
    createdAt: string;
    isPersonalPractice?: boolean;
}

export const getBookings = async (): Promise<Booking[]> => {
    return getAllBookingsFromFirestore();
};

export const getBookingById = async (id: string): Promise<Booking | undefined> => {
    return getBookingByIdFromFirestore(id);
};

export const saveBooking = async (booking: Booking): Promise<void> => {
    await saveBookingToFirestore(booking);
};

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<boolean> => {
    return updateBookingInFirestore(id, updates);
};

// Check for overlaps
export const checkAvailability = async (
    studioId: string,
    roomName: string | undefined,
    date: string,
    startTime: string,
    duration: number,
    excludeBookingId?: string
): Promise<boolean> => {
    return checkAvailabilityFromFirestore(studioId, roomName, date, startTime, duration, excludeBookingId);
};
