"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchStudio } from "@/actions/studio";
import { getBookingsAction } from "@/actions/schedule";
import { ScheduleView } from "@/components/ScheduleView";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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

    const { backgroundColor, backgroundImage } = useTheme();

    if (!studio) return <div className="p-20 text-white">Loading...</div>;

    const room = studio.rooms[roomIndex];
    if (!room) return <div className="p-20 text-white">Room not found</div>;

    const handleSlotSelect = (d: Date, h: number, duration: number) => {
        // Prepare modal data
        const dateStr = format(d, "yyyy-MM-dd");
        const timeStr = `${h.toString().padStart(2, '0')}:00`;

        setSelectedSlot({ date: dateStr, time: timeStr, duration: duration.toString() });
        setIsBookingOpen(true);
    };

    return (
        <div
            className="min-h-screen text-white p-6 md:p-12 font-sans transition-all duration-500"
            style={{
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center'
            }}
        >
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                <Button variant="ghost" onClick={() => router.back()} className="text-gray-400 hover:text-white pl-0">
                    <ArrowLeft className="mr-2 h-4 w-4" /> 店舗トップに戻る
                </Button>

                <header className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5">
                    <div className="text-sm font-mono text-cyan-400 mb-2">{studio.storeName}</div>
                    <h1 className="text-4xl font-bold mb-4">{room.name} 空き状況</h1>
                    <p className="text-gray-400">カレンダーの空いている時間をクリックして予約へ進んでください。</p>
                </header>

                <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(8,145,178,0.1)]">
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
