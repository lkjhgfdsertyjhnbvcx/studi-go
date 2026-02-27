"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchStudio } from "@/actions/studio";
import { getBookingsAction } from "@/actions/schedule";
import { ScheduleView } from "@/components/ScheduleView";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "@/lib/theme-context";

export default function RoomSchedulePage() {
    const params = useParams();
    const storeId = params.id as string;
    const roomIndexStr = params.roomIndex as string;
    const roomIndex = parseInt(roomIndexStr);

    const [studio, setStudio] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Pre-fill state for modal
    const [selectedSlot, setSelectedSlot] = useState<{ date: string, time: string, duration: string } | null>(null);

    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const sData = await fetchStudio(storeId);
            if (!sData) return;
            setStudio(sData);

            const bData = await getBookingsAction();
            setBookings(bData);
        };
        load();
    }, [storeId]);

    const { backgroundColor, backgroundImage, mode } = useTheme();

    if (!studio) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground gap-4">
            <div className="h-2 w-24 bg-cyan-500 rounded-full animate-pulse"></div>
            <p className="font-mono text-xs uppercase tracking-widest animate-pulse">ACCESSING_SCHEDULE_DATA...</p>
        </div>
    );

    const room = studio.rooms[roomIndex];
    if (!room) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground gap-4">
            <XCircle className="h-10 w-10 text-red-500" />
            <p className="font-mono text-xs uppercase tracking-widest">ERROR: ROOM_NOT_FOUND</p>
            <Button onClick={() => router.back()}>戻る</Button>
        </div>
    );

    const handleSlotSelect = (d: Date, h: number, duration: number) => {
        // Prepare modal data
        const dateStr = format(d, "yyyy-MM-dd");
        const timeStr = `${h.toString().padStart(2, '0')}:00`;

        setSelectedSlot({ date: dateStr, time: timeStr, duration: duration.toString() });
        setIsBookingOpen(true);
    };

    return (
        <div
            className="min-h-screen text-foreground p-6 md:p-12 font-sans transition-all duration-500"
            style={{
                backgroundColor: backgroundColor === "#000000" && mode === "light" ? "hsl(var(--background))" : backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center'
            }}
        >
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                <Button variant="ghost" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground pl-0">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {studio.storeName} に戻る
                </Button>

                <header className="bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border">
                    <div className="text-sm font-mono text-cyan-400 mb-2">{studio.storeName}</div>
                    <h1 className="text-4xl font-bold mb-4">{room.name} 空き状況</h1>
                    <p className="text-muted-foreground">カレンダーの空いている時間をクリックして予約へ進んでください。</p>
                </header>

                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl overflow-hidden shadow-2xl">
                    <ScheduleView
                        bookings={bookings}
                        roomId={room.name}
                        onSlotSelect={handleSlotSelect}
                    />
                </div>

                {isBookingOpen && (
                    <BookingModal
                        isOpen={isBookingOpen}
                        onOpenChange={setIsBookingOpen}
                        studioData={studio}
                        initialRoomIndex={roomIndexStr}
                        initialDate={selectedSlot?.date}
                        initialTime={selectedSlot?.time}
                        initialDuration={selectedSlot?.duration}
                    />
                )}
            </div>
        </div>
    );
}
