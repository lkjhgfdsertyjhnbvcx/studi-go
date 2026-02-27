"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UserBookingPage() {
    const params = useParams();
    const router = useRouter();
    const [store, setStore] = useState<any>(null);
    const [selectedStudio, setSelectedStudio] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedHour, setSelectedHour] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/api/store/detail?id=${params.storeId}`).then(res => res.json()).then(data => {
            const studiosWithPricing = data.studios.map((s: any) => ({
                ...s,
                pricing: s.pricingJson ? JSON.parse(s.pricingJson) : { weekday: Array(24).fill(2000), weekend: Array(24).fill(3000) }
            }));
            setStore({ ...data, studios: studiosWithPricing });
            setSelectedStudio(studiosWithPricing[0]);
        });
    }, [params.storeId]);

    const handleBooking = async () => {
        if (selectedHour === null) return alert("時間を選択してください");
        const isWeekend = [0, 6].includes(new Date(selectedDate).getDay());
        const price = isWeekend ? selectedStudio.pricing.weekend[selectedHour] : selectedStudio.pricing.weekday[selectedHour];
        const res = await fetch('/api/booking/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storeId: params.storeId, studioId: selectedStudio.id, studioName: selectedStudio.name, date: selectedDate, startTime: selectedHour, totalPrice: price })
        });
        if (res.ok) router.push('/booking/complete');
    };

    if (!store) return <div className="min-h-screen flex items-center justify-center font-black">LOADING...</div>;

    return (
        <div style={{ backgroundColor: store.bgColor, backgroundImage: `url(${store.bgImageUrl})`, backgroundSize: 'cover' }} className="min-h-screen pb-20 font-sans text-black">
            <header className="bg-white/90 p-6 shadow-sm flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-4">{store.logoUrl && <img src={store.logoUrl} className="h-10 w-10 object-contain" />}<h1 className="font-black italic">{store.name}</h1></div>
            </header>
            <main className="max-w-4xl mx-auto mt-10 px-4">
                <div className="flex gap-2 overflow-x-auto mb-8">
                    {store.studios.map((s: any) => (
                        <button key={s.id} onClick={() => { setSelectedStudio(s); setSelectedHour(null); }} className={`px-8 py-4 rounded-3xl font-black transition-all ${selectedStudio?.id === s.id ? 'bg-black text-white shadow-xl' : 'bg-white/80'}`}>{s.name}</button>
                    ))}
                </div>
                {selectedStudio && (
                    <div className="bg-white/95 rounded-[3.5rem] p-10 shadow-2xl">
                        <h2 className="text-3xl font-black italic mb-6 uppercase">{selectedStudio.name}</h2>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-5 bg-gray-100 rounded-2xl font-black mb-8 border-none outline-none" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Array.from({ length: 24 }).map((_, h) => {
                                const isWeekend = [0, 6].includes(new Date(selectedDate).getDay());
                                const price = isWeekend ? selectedStudio.pricing.weekend[h] : selectedStudio.pricing.weekday[h];
                                return (
                                    <button key={h} onClick={() => setSelectedHour(h)} className={`p-6 rounded-[2rem] border-4 transition-all ${selectedHour === h ? 'border-purple-800 bg-purple-50' : 'border-gray-50'}`}>
                                        <p className="text-[10px] font-black text-gray-400">{h}:00</p>
                                        <p className="text-xl font-black">¥{price.toLocaleString()}</p>
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={handleBooking} className="w-full mt-10 py-8 bg-purple-800 text-white rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-black transition-all">RESERVE NOW</button>
                    </div>
                )}
            </main>
        </div>
    );
}