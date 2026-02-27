"use client";
import React, { useEffect, useState } from "react";

export default function StoreDashboard() {
    const [activeTab, setActiveTab] = useState("profile");
    const [store, setStore] = useState<any>(null);
    const [showNotify, setShowNotify] = useState(false);

    useEffect(() => {
        const storeId = localStorage.getItem("storeId") || "1";
        fetch(`/api/store/detail?id=${storeId}`).then(res => res.json()).then(data => {
            const studiosWithPricing = data.studios.map((s: any) => ({
                ...s,
                pricing: s.pricingJson ? JSON.parse(s.pricingJson) : { weekday: Array(24).fill(2000), weekend: Array(24).fill(3000) }
            }));
            setStore({ ...data, studios: studiosWithPricing, options: data.options || [] });
        });
    }, []);

    const saveAll = async () => {
        const res = await fetch('/api/store/update-full', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(store)
        });
        if (res.ok) { setShowNotify(true); setTimeout(() => setShowNotify(false), 3000); }
    };

    if (!store) return <div className="p-20 text-center font-black animate-pulse">SYNCING...</div>;

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-10 font-sans">
            {showNotify && <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-10 py-5 rounded-full font-black shadow-2xl border-2 border-purple-500">✅ SAVED!</div>}
            <div className="max-w-6xl mx-auto bg-white rounded-[4rem] shadow-2xl overflow-hidden">
                <div className="flex border-b p-4 gap-2 overflow-x-auto bg-gray-50">
                    {["profile", "branding", "studios", "options", "bookings"].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-black text-white' : 'text-gray-400'}`}>
                            {tab === "bookings" ? "予約リスト" : tab}
                        </button>
                    ))}
                </div>
                <div className="p-10 text-black">
                    {activeTab === "profile" && (
                        <div className="grid grid-cols-2 gap-6">
                            <Input label="店名" value={store.name} onChange={(v: any) => setStore({ ...store, name: v })} />
                            <Input label="代表者名" value={store.ownerName} onChange={(v: any) => setStore({ ...store, ownerName: v })} />
                            <Input label="電話" value={store.tel} onChange={(v: any) => setStore({ ...store, tel: v })} />
                            <Input label="住所" className="col-span-2" value={store.address} onChange={(v: any) => setStore({ ...store, address: v })} />
                        </div>
                    )}
                    {activeTab === "branding" && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-10">
                                <ImageUploadBox label="ロゴ" image={store.logoUrl} onUpload={(b64: any) => setStore({ ...store, logoUrl: b64 })} />
                                <ImageUploadBox label="背景" image={store.bgImageUrl} onUpload={(b64: any) => setStore({ ...store, bgImageUrl: b64 })} />
                            </div>
                            <textarea className="w-full p-8 bg-gray-50 rounded-[3rem] font-bold h-40 outline-none border-2 focus:border-purple-800" value={store.description || ""} onChange={(e) => setStore({ ...store, description: e.target.value })} placeholder="紹介文..." />
                        </div>
                    )}
                    {activeTab === "studios" && (
                        <div className="space-y-12">
                            {store.studios.map((s: any, idx: number) => (
                                <div key={idx} className="p-10 border-2 rounded-[4rem] bg-gray-50 space-y-4">
                                    <Input label="スタジオ名" value={s.name} onChange={(v: any) => { const n = [...store.studios]; n[idx].name = v; setStore({ ...store, studios: n }); }} />
                                    <Input label="広さ" value={s.size} onChange={(v: any) => { const n = [...store.studios]; n[idx].size = v; setStore({ ...store, studios: n }); }} />
                                </div>
                            ))}
                            <button onClick={() => setStore({ ...store, studios: [...store.studios, { name: "NEW", pricing: { weekday: Array(24).fill(2000), weekend: Array(24).fill(3000) } }] })} className="w-full py-10 border-4 border-dashed rounded-[4rem] font-black">+ ADD STUDIO</button>
                        </div>
                    )}
                    {activeTab === "bookings" && (
                        <div className="space-y-4">
                            {store.bookings?.map((b: any) => (
                                <div key={b.id} className="bg-gray-50 p-6 rounded-[2rem] flex justify-between items-center shadow-sm">
                                    <div><p className="text-xs font-black text-purple-800 uppercase">{b.studioName}</p><p className="text-xl font-black">{b.date} / {b.startTime}:00</p></div>
                                    <div className="text-right font-black">¥{b.totalPrice.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={saveAll} className="w-full py-8 bg-purple-800 text-white rounded-[3rem] font-black text-2xl mt-12 hover:bg-black transition-all shadow-xl">SAVE ALL SETTINGS</button>
                </div>
            </div>
        </div>
    );
}

function Input({ label, value, onChange, className = "" }: any) {
    return (
        <div className={className}><label className="block text-[10px] font-black text-purple-800 uppercase mb-2 ml-4">{label}</label>
            <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-purple-800 outline-none transition-all" value={value || ""} onChange={(e) => onChange(e.target.value)} /></div>
    );
}

function ImageUploadBox({ label, image, onUpload }: any) {
    return (
        <div><label className="block text-[10px] font-black text-purple-800 uppercase mb-2 ml-4">{label}</label>
            <div className="relative bg-gray-50 h-48 rounded-[2.5rem] overflow-hidden border-2 border-dashed flex items-center justify-center">
                {image ? <img src={image} className="w-full h-full object-cover" /> : <span className="text-gray-300 font-black">NO IMAGE</span>}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e: any) => {
                    const file = e.target.files?.[0]; if (!file) return;
                    const reader = new FileReader(); reader.onloadend = () => onUpload(reader.result as string); reader.readAsDataURL(file);
                }} />
            </div></div>
    );
}