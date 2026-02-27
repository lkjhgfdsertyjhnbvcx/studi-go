"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
};

export default function StudioAdminPage() {
    const params = useParams();
    const studioId = params.id as string;

    const [activeTab, setActiveTab] = useState("settings");
    const [isSaving, setIsSaving] = useState(false);
    const [bookings, setBookings] = useState<any[]>([]);
    const [baseDate, setBaseDate] = useState(getMonday(new Date()));

    const [formData, setFormData] = useState({
        name: "読み込み中...",
        allowCash: true,
        allowOnlineStripe: true
    });

    // 🌟 データベースから「本物の予約」と「本物の店舗設定」を両方読み込む！
    useEffect(() => {
        // 予約の読み込み
        fetch('/api/bookings').then(res => res.json()).then(data => {
            if (!data.error) setBookings(data);
        });

        // 店舗設定の読み込み
        if (studioId) {
            fetch('/api/studios').then(res => res.json()).then(data => {
                const found = data.find((s: any) => s.id === parseInt(studioId));
                if (found) {
                    setFormData({
                        name: found.room,
                        allowCash: found.allowCash,
                        allowOnlineStripe: found.allowOnlineStripe
                    });
                }
            });
        }
    }, [activeTab, studioId]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    // 🌟 修正：先ほど作ったケーブル（PUT）を使ってデータベースに保存する！
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/studios', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: studioId,
                    allowCash: formData.allowCash,
                    allowOnlineStripe: formData.allowOnlineStripe
                })
            });

            if (response.ok) {
                alert("✅ 店舗の決済設定を本物のデータベースに保存しました！\n（お客様の支払い画面に即座に反映されます）");
            } else {
                alert("保存に失敗しました。");
            }
        } catch (error) {
            alert("通信エラーが発生しました。");
        } finally {
            setIsSaving(false);
        }
    };

    const days = [...Array(7)].map((_, i) => {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + i);
        return { label: `${d.getMonth() + 1}/${d.getDate()}`, dayOfWeek: ["日", "月", "火", "水", "木", "金", "土"][d.getDay()], fullDate: d };
    });

    const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const changeWeek = (num: number) => { const newDate = new Date(baseDate); newDate.setDate(newDate.getDate() + (num * 7)); setBaseDate(newDate); };

    return (
        <div className="min-h-screen bg-[#0a0f16] text-gray-300 font-sans p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">🏢</span>
                            店舗管理: {formData.name}
                        </h1>
                        <p className="text-xs text-gray-500 mt-2">ID: {studioId}</p>
                    </div>
                    <button onClick={handleSave} disabled={isSaving} className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg ${isSaving ? 'bg-gray-600 text-gray-400' : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20'}`}>
                        {isSaving ? '保存中...' : '💾 設定を保存'}
                    </button>
                </div>

                <div className="flex gap-6 border-b border-gray-800 mb-8 text-sm">
                    <button onClick={() => setActiveTab("settings")} className={`pb-3 border-b-2 transition-all font-bold ${activeTab === "settings" ? "border-cyan-500 text-cyan-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>店舗設定</button>
                    <button onClick={() => setActiveTab("calendar")} className={`pb-3 border-b-2 transition-all font-bold flex items-center gap-2 ${activeTab === "calendar" ? "border-cyan-500 text-cyan-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>📅 予約状況</button>
                </div>

                {activeTab === "settings" && (
                    <div className="animate-fade-in space-y-10 max-w-4xl">
                        <div>
                            <h2 className="text-lg font-bold text-white border-l-4 border-cyan-500 pl-3 mb-6">決済設定</h2>
                            <div className="bg-[#111823] border border-gray-800 rounded-xl p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold text-sm">オンライン決済（Apple Pay / クレジット）</p>
                                        <p className="text-xs text-gray-500 mt-1">Studi-Go Payでの事前決済を許可し、予約を即座に確定させます。</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" name="allowOnlineStripe" checked={formData.allowOnlineStripe} onChange={handleChange} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </label>
                                </div>
                                <div className="h-px bg-gray-800 w-full"></div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold text-sm">店頭支払い（現金・QR決済など）</p>
                                        <p className="text-xs text-gray-500 mt-1">カレンダーの枠のみを押さえ、当日にスタジオ受付で決済を行います。</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" name="allowCash" checked={formData.allowCash} onChange={handleChange} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "calendar" && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white border-l-4 border-cyan-500 pl-3">今週の予約状況</h2>
                            <div className="flex items-center gap-4 px-4 py-1.5 rounded-lg bg-[#111823] border border-gray-800">
                                <button onClick={() => changeWeek(-1)} className="text-cyan-500 font-black px-2 hover:text-white">←</button>
                                <p className="text-sm font-bold w-24 text-center">{days[0].label} 〜</p>
                                <button onClick={() => changeWeek(1)} className="text-cyan-500 font-black px-2 hover:text-white">→</button>
                            </div>
                        </div>

                        <div className="bg-[#111823] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                            <div className="grid grid-cols-8 bg-[#0a0f16] text-gray-400 border-b border-gray-800">
                                <div className="p-4 text-center font-black text-[10px] tracking-widest text-cyan-500 border-r border-gray-800">TIME</div>
                                {days.map((d, i) => (
                                    <div key={i} className="p-3 text-center border-r border-gray-800 last:border-0">
                                        <p className="text-[10px] font-bold mb-1">{d.label}</p>
                                        <p className={`text-sm font-black ${d.dayOfWeek === '日' ? 'text-red-500' : d.dayOfWeek === '土' ? 'text-blue-500' : 'text-gray-300'}`}>{d.dayOfWeek}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-8 h-[600px] overflow-y-auto">
                                {hours.map((hour) => (
                                    <React.Fragment key={hour}>
                                        <div className="border-b border-r border-gray-800 bg-[#0a0f16] flex items-center justify-center font-mono font-bold text-gray-500 text-xs">
                                            {hour}:00
                                        </div>
                                        {days.map((d, dayIdx) => {
                                            const cellTime = new Date(d.fullDate);
                                            cellTime.setHours(hour, 0, 0, 0);

                                            const bookingHere = bookings.find(b => {
                                                const bStart = new Date(b.startTime);
                                                const bEnd = new Date(b.endTime);
                                                return cellTime >= bStart && cellTime < bEnd;
                                            });

                                            const isReserved = bookingHere?.status === "支払い済み";
                                            const isPending = bookingHere?.status === "未入金" || bookingHere?.status === "未入金（当日払い）";

                                            return (
                                                <div key={dayIdx} className={`h-16 border-b border-r border-gray-800 relative p-1`}>
                                                    {isReserved && (
                                                        <div className="w-full h-full bg-cyan-500/20 border border-cyan-500/50 rounded flex flex-col items-center justify-center text-cyan-400">
                                                            <span className="text-[8px] font-bold tracking-widest uppercase">事前決済済</span>
                                                            <span className="text-[10px] font-black">{bookingHere.user?.name || "ゲスト"}</span>
                                                        </div>
                                                    )}
                                                    {isPending && (
                                                        <div className="w-full h-full bg-orange-500/20 border border-orange-500/50 rounded flex flex-col items-center justify-center text-orange-400">
                                                            <span className="text-[8px] font-bold tracking-widest uppercase">当日払い</span>
                                                            <span className="text-[10px] font-black">{bookingHere.user?.name || "ゲスト"}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}