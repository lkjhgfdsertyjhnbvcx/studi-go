"use client";

import React, { useEffect, useState } from "react";
import { ScheduleView } from "./ScheduleView";
import { getBookingsAction } from "@/actions/schedule";

export const ScheduleViewWrapper = () => {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getBookingsAction();
            setBookings(data);
        };
        fetch();
    }, []);

    // Also poll/refresh occasionally? For now just load once.
    return <ScheduleView bookings={bookings} />;
}
