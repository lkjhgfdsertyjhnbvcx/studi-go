"use client";

import React, { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, startOfMonth, addMonths, isSameDay, getHours } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface ScheduleViewProps {
    bookings: any[];
    roomId?: string; // Optional filter
    onSlotSelect?: (date: Date, startTime: number, duration: number) => void;
}

export const ScheduleView = ({ bookings = [], roomId, onSlotSelect }: ScheduleViewProps) => {
    const [viewMode, setViewMode] = useState<"month" | "week">("week");
    const [currentDate, setCurrentDate] = useState(new Date());

    // Filter Bookings by Room if roomId provided
    // Note: booking.studioId is currently storing Room Name in simple version.
    const filteredBookings = roomId
        ? bookings.filter(b => b.studioId === roomId)
        : bookings;

    const renderMonth = () => {
        const start = startOfMonth(currentDate);
        const gridStart = startOfWeek(start);
        const days = [];
        for (let i = 0; i < 35; i++) days.push(addDays(gridStart, i));

        return (
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["日", "月", "火", "水", "木", "金", "土"].map(d => <div key={d} className="text-gray-400 py-1">{d}</div>)}
                {days.map((d, idx) => {
                    const isToday = isSameDay(d, new Date());
                    const dayBookings = filteredBookings.filter(b => isSameDay(new Date(b.date), d));
                    // Simple logic: if many bookings, show busy
                    const busyLevel = dayBookings.length;

                    return (
                        <div key={idx} className={`p-2 border border-white/5 min-h-[60px] cursor-pointer hover:bg-white/5 transition-colors ${isToday ? 'bg-cyan-900/20 text-cyan-200 border-cyan-500/30' : ''}`}
                            onClick={() => setViewMode('week')} // Drill down
                        >
                            <div className="opacity-50 mb-1">{format(d, "d")}</div>
                            {busyLevel > 0 && (
                                <div className="text-[10px] text-red-400 font-mono">
                                    {busyLevel}件予約
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    };

    const [selectionStart, setSelectionStart] = useState<{ dateStr: string, hour: number } | null>(null);
    const [hoverHover, setHoverHover] = useState<{ dateStr: string, hour: number } | null>(null);

    const handleMouseDown = (dateStr: string, hour: number) => {
        setSelectionStart({ dateStr, hour });
        setHoverHover({ dateStr, hour });
    };

    const handleMouseEnter = (dateStr: string, hour: number) => {
        if (selectionStart) {
            // Only update if same day
            if (selectionStart.dateStr === dateStr) {
                setHoverHover({ dateStr, hour });
            }
        }
    };

    const handleMouseUp = () => {
        if (selectionStart && hoverHover && selectionStart.dateStr === hoverHover.dateStr) {
            // Calculate start, end, duration
            const startH = Math.min(selectionStart.hour, hoverHover.hour);
            const endH = Math.max(selectionStart.hour, hoverHover.hour); // inclusive of the hour clicked
            // Duration is endH - startH + 1
            // Example: click 18, drag to 21. Range: 18, 19, 20, 21. Duration: 4 hours.
            // Wait, user perception "18~22" is usually 4 hours (18, 19, 20, 21). 
            // If I click 18 and 18, it's 1 hour (18:00-19:00).
            const duration = endH - startH + 1;

            if (onSlotSelect) {
                const date = new Date(selectionStart.dateStr);
                onSlotSelect(date, startH, duration);
            }
        }
        setSelectionStart(null);
        setHoverHover(null);
    };

    // Attach global mouse up listener or just put on wrapper?
    // Wrapper is safer but might miss if mouse leaves. For now wrapper is okay.

    const renderWeek = () => {
        const start = startOfWeek(currentDate);
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) days.push(addDays(start, i));

        const hours = Array.from({ length: 15 }, (_, i) => i + 10); // 10..24

        return (
            <div className="overflow-x-auto select-none" onMouseLeave={() => { setSelectionStart(null); setHoverHover(null); }}>
                <div className="grid grid-cols-[50px_repeat(7,1fr)] min-w-[600px] text-xs" onMouseUp={handleMouseUp}>
                    {/* Header */}
                    <div className="p-2 border-b border-white/10"></div>
                    {days.map((d, idx) => (
                        <div key={idx} className={`p-2 border-b border-white/10 text-center ${isSameDay(d, new Date()) ? 'text-cyan-400' : 'text-gray-400'}`}>
                            {format(d, "M/d")}<br />({format(d, "EE", { locale: ja })})
                        </div>
                    ))}

                    {/* Grid */}
                    {hours.map(h => (
                        <React.Fragment key={h}>
                            <div className="p-2 border-r border-b border-white/10 text-right text-gray-500 relative -top-3">
                                {h}:00
                            </div>
                            {days.map((d, dIdx) => {
                                const slotDateStr = format(d, 'yyyy-MM-dd');
                                const booking = filteredBookings.find(b => {
                                    if (b.date !== slotDateStr) return false;
                                    const start = parseInt(b.startTime.split(':')[0]);
                                    const end = start + b.durationHours;
                                    return h >= start && h < end;
                                });

                                // Check selection highlight
                                let isSelected = false;
                                if (selectionStart && hoverHover && selectionStart.dateStr === slotDateStr) {
                                    const minH = Math.min(selectionStart.hour, hoverHover.hour);
                                    const maxH = Math.max(selectionStart.hour, hoverHover.hour);
                                    if (h >= minH && h <= maxH) isSelected = true;
                                }

                                return (
                                    <div
                                        key={dIdx}
                                        className={`border-r border-b border-white/10 h-10 transition-all 
                                            ${booking ? 'bg-red-900/40 cursor-not-allowed' : 'cursor-pointer'}
                                            ${isSelected ? 'bg-cyan-500/50' : (!booking && 'hover:bg-cyan-500/20')}
                                        `}
                                        title={booking ? 'Booked' : 'Available'}
                                        onMouseDown={() => !booking && handleMouseDown(slotDateStr, h)}
                                        onMouseEnter={() => handleMouseEnter(slotDateStr, h)}
                                    >
                                        {booking && booking.userId === 'me' && <div className="w-full h-full bg-cyan-600/50"></div>}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-black/90 text-white rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold font-mono text-cyan-400">
                        {roomId ? `${roomId} SCHEDULE` : 'SCHEDULE'}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant={viewMode === 'month' ? 'default' : 'outline'} onClick={() => setViewMode('month')}>月</Button>
                    <Button size="sm" variant={viewMode === 'week' ? 'default' : 'outline'} onClick={() => setViewMode('week')}>週</Button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 bg-white/5 p-2 rounded">
                <Button size="sm" variant="ghost" onClick={() => setCurrentDate(curr => viewMode === 'month' ? addMonths(curr, -1) : addWeeks(curr, -1))}>← PREV</Button>
                <span className="font-bold text-lg">{format(currentDate, "yyyy年 M月", { locale: ja })}</span>
                <Button size="sm" variant="ghost" onClick={() => setCurrentDate(curr => viewMode === 'month' ? addMonths(curr, 1) : addWeeks(curr, 1))}>NEXT →</Button>
            </div>

            {viewMode === 'month' ? renderMonth() : renderWeek()}
        </div>
    );
};
