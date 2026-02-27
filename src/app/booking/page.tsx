"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const getEventStyle = (status: string, isAdmin: boolean) => {
    if (!isAdmin) return 'bg-gray-100 text-gray-500 border-gray-200';
    switch (status) {
        case 'メンテナンス': return 'bg-gray-400 text-white';
        case 'レッスン': return 'bg-blue-500 text-white';
        default: return 'bg-purple-700 text-white';
    }
};

const HOURS = Array.from({ length: 15 }, (_, i) => i + 9);

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const storeId = searchParams.get("storeId") || "1";
    const isAdminRequest = searchParams.get("admin") === "true";

    const [store, setStore] = useState<any>(null);
    const [studios, setStudios] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week'); // 🌟 月を追加
    const [activeStudioId, setActiveStudioId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [storeRes, stdRes, bkgRes] = await Promise.all([
                    fetch('/api/store'),
                    fetch('/api/studios'),
                    fetch('/api/bookings')
                ]);
                const storeData = await storeRes.json();
                const stdData = await stdRes.json();
                const bkgData = await bkgRes.json();
                setStore(storeData);
                const filtered = Array.isArray(stdData) ? stdData.filter((s: any) => s.storeId === parseInt(storeId)) : [];
                setStudios(filtered);
                setBookings(Array.isArray(bkgData) ? bkgData : []);
                if (filtered.length > 0) setActiveStudioId(filtered[0].id);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        }
        fetchData();
    }, [storeId]);

    // 🌟 日付操作
    const changeDate = (offset: number) => {
        const d = new Date(currentDate);
        if (viewMode === 'day') d.setDate(d.getDate() + offset);
        else if (viewMode === 'week') d.setDate(d.getDate() + (offset * 7));
        else if (viewMode === 'month') d.setMonth(d.getMonth() + offset);
        setCurrentDate(d);
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse">CONNECTING...</div>;

    // --- 月表示用のロジック ---
    const renderMonthView = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

        return (
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
                    <div key={d} className={`bg-gray-50 p-4 text-center text-[11px] font-black ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-600' : 'text-gray-900'}`}>{d}</div>
                ))}
                {days.map((day, idx) => (
                    <div key={idx} className="bg-white min-h-[120px] p-2">
                        {day && (
                            <>
                                <p className={`text-sm font-black mb-2 ${day.toDateString() === new Date().toDateString() ? 'text-purple-600 bg-purple-50 w-7 h-7 flex items-center justify-center rounded-full' : 'text-gray-900'}`}>{day.getDate()}</p>
                                <div className="space-y-1">
                                    {bookings.filter(b => b.studioId === activeStudioId && new Date(b.startTime).toDateString() === day.toDateString()).slice(0, 3).map(b => (
                                        <div key={b.id} className={`text-[8px] font-black p-1 rounded border truncate ${getEventStyle(b.status, isAdminRequest)}`}>
                                            {new Date(b.startTime).getUTCHours()}:00 {isAdminRequest ? b.status : 'Reserved'}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // --- 日・週表示用のロジック ---
    const displayDays = viewMode === 'week'
        ? Array.from({ length: 7 }, (_, i) => {
            const d = new Date(currentDate); d.setDate(d.getDate() - d.getDay() + i); return d;
        })
        : [currentDate];

    return (
        <div className="min-h-screen bg-[#F8F9FD] text-gray-800 font-sans pb-10">
            <header className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <img src="/logo-new.png" alt="" className="h-10 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">{store?.name}</h2>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
                    {['day', 'week', 'month'].map((m: any) => (
                        <button key={m} onClick={() => setViewMode(m)} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${viewMode === m ? 'bg-white shadow-sm text-purple-800' : 'text-gray-400'}`}>{m.toUpperCase()}</button>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-6 font-black">
                        <button onClick={() => changeDate(-1)} className="text-xl">◀</button>
                        <span className="text-lg text-gray-900">{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</span>
                        <button onClick={() => changeDate(1)} className="text-xl">▶</button>
                    </div>
                    {isAdminRequest && <div className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black shadow-lg">ADMIN MODE</div>}
                </div>
            </header>

            <main className="p-4 md:p-8">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {studios.map(studio => (
                        <button key={studio.id} onClick={() => setActiveStudioId(studio.id)} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-sm border ${activeStudioId === studio.id ? 'bg-purple-800 text-white' : 'bg-white text-gray-500'}`}>{studio.name}</button>
                    ))}
                </div>

                {viewMode === 'month' ? renderMonthView() : (
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden overflow-x-auto">
                        <table className="w-full border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="w-24 p-6 border-b text-[12px] font-black text-gray-900 text-center uppercase border-r border-gray-100">Time</th>
                                    {displayDays.map(day => (
                                        <th key={day.toISOString()} className={`p-6 border-b border-r last:border-r-0 border-gray-100 ${day.toDateString() === new Date().toDateString() ? 'bg-purple-50/50' : ''}`}>
                                            <p className={`text-[12px] font-black uppercase text-center mb-1 ${day.getDay() === 0 ? 'text-red-500' : day.getDay() === 6 ? 'text-blue-600' : 'text-gray-900'}`}>{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][day.getDay()]}</p>
                                            <p className={`text-4xl font-black text-center leading-none ${day.toDateString() === new Date().toDateString() ? 'text-purple-600' : 'text-gray-900'}`}>{day.getDate()}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {HOURS.map(hour => (
                                    <tr key={hour} className="border-b border-gray-50 last:border-0">
                                        <td className="p-6 text-center text-[14px] font-black text-gray-900 bg-gray-50/30 border-r border-gray-100">{hour}:00</td>
                                        {displayDays.map(day => {
                                            const booking = bookings.find(b => b.studioId === activeStudioId && new Date(b.startTime).getUTCHours() === hour && new Date(b.startTime).toDateString() === day.toDateString());
                                            return (
                                                <td key={day.toISOString()} className="p-2 border-r border-gray-50 last:border-r-0 align-top">
                                                    <div className="h-24 relative">
                                                        {booking ? (
                                                            <div className={`w-full h-full p-4 rounded-2xl text-[12px] font-black shadow-sm flex flex-col justify-center text-center border ${getEventStyle(booking.status, isAdminRequest)}`}>
                                                                {isAdminRequest ? booking.status : "Reserved"}
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => router.push(`/reservation?studioId=${activeStudioId}&start=${hour}:00&end=${hour + 1}:00&dayData=${day.toISOString()}`)} className="w-full h-full rounded-2xl border-2 border-dashed border-gray-100 hover:border-purple-400 hover:bg-purple-50 transition-all text-transparent hover:text-purple-600 font-black flex items-center justify-center uppercase">Book</button>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function BookingPage() { return <Suspense fallback={null}><BookingContent /></Suspense>; }