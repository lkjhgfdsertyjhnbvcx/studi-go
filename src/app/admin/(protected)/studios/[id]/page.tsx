"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
};

const DISPLAY_SECTIONS = [
    { key: "showMap",       label: "地図・アクセス",         desc: "Google マップを公開ページに表示する" },
    { key: "showRooms",     label: "部屋一覧",               desc: "スタジオの部屋・料金一覧を表示する" },
    { key: "showEquipment", label: "機材・設備",             desc: "機材・設備リストを表示する" },
    { key: "showReviews",   label: "レビュー・評価",         desc: "ユーザーのレビューを表示する" },
    { key: "showGallery",   label: "ギャラリー写真",         desc: "写真ギャラリーを表示する" },
    { key: "showSNS",       label: "SNSリンク",              desc: "Instagram・X などのリンクを表示する" },
];

export default function StudioAdminPage() {
    const params = useParams();
    const studioId = params.id as string;

    const [activeTab, setActiveTab] = useState("settings");
    const [isSaving, setIsSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");
    const [bookings, setBookings] = useState<any[]>([]);
    const [baseDate, setBaseDate] = useState(getMonday(new Date()));

    const [formData, setFormData] = useState({
        name: "読み込み中...",
        allowCash: true,
        allowOnlineStripe: true,
        // display settings
        showMap: true,
        showRooms: true,
        showEquipment: true,
        showReviews: true,
        showGallery: true,
        showSNS: true,
    });

    useEffect(() => {
        fetch('/api/bookings').then(res => res.json()).then(data => {
            if (!data.error) setBookings(data);
        });

        if (studioId) {
            fetch('/api/studios').then(res => res.json()).then(data => {
                const arr = Array.isArray(data) ? data : data.studios || [];
                const found = arr.find((s: any) => s.id === studioId);
                if (found) {
                    setFormData({
                        name: found.storeName || found.room || studioId,
                        allowCash: found.allowCash ?? true,
                        allowOnlineStripe: found.allowOnlineStripe ?? true,
                        showMap: found.showMap !== false,
                        showRooms: found.showRooms !== false,
                        showEquipment: found.showEquipment !== false,
                        showReviews: found.showReviews !== false,
                        showGallery: found.showGallery !== false,
                        showSNS: found.showSNS !== false,
                    });
                }
            });
        }
    }, [studioId]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMsg("");
        try {
            await updateDoc(doc(db, "studios", studioId), {
                allowCash: formData.allowCash,
                allowOnlineStripe: formData.allowOnlineStripe,
                showMap: formData.showMap,
                showRooms: formData.showRooms,
                showEquipment: formData.showEquipment,
                showReviews: formData.showReviews,
                showGallery: formData.showGallery,
                showSNS: formData.showSNS,
            });
            setSaveMsg("✅ 設定を保存しました");
            setTimeout(() => setSaveMsg(""), 3000);
        } catch (error) {
            setSaveMsg("❌ 保存に失敗しました");
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <span className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg text-base">🏢</span>
                        {formData.name}
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">ID: {studioId}</p>
                </div>
                <div className="flex items-center gap-3">
                    {saveMsg && (
                        <span className={`text-sm font-bold ${saveMsg.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
                            {saveMsg}
                        </span>
                    )}
                    <a
                        href={`/studio/${studioId}?preview=true`}
                        target="_blank"
                        className="px-4 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    >
                        プレビュー
                    </a>
                    <a
                        href={`/admin/studios/${studioId}/edit`}
                        className="px-4 py-2.5 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white transition-all"
                    >
                        代理編集
                    </a>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${isSaving ? 'bg-accent/20 text-muted-foreground' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                    >
                        {isSaving ? '保存中...' : '保存する'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border">
                {[
                    { key: "settings", label: "決済設定" },
                    { key: "display",  label: "表示設定" },
                    { key: "calendar", label: "予約状況" },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === tab.key
                            ? "border-purple-500 text-purple-500"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 決済設定 */}
            {activeTab === "settings" && (
                <div className="max-w-2xl space-y-4">
                    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                        <h2 className="font-bold text-foreground border-l-4 border-purple-500 pl-3">決済方法の設定</h2>
                        {[
                            {
                                name: "allowOnlineStripe",
                                label: "オンライン決済（Apple Pay / クレジット）",
                                desc: "Studi-Go Pay での事前決済を許可し、予約を即座に確定させます。"
                            },
                            {
                                name: "allowCash",
                                label: "店頭支払い（現金・QR決済など）",
                                desc: "カレンダーの枠のみを押さえ、当日にスタジオ受付で決済を行います。"
                            }
                        ].map(item => (
                            <div key={item.name} className="flex items-center justify-between gap-6 py-2">
                                <div>
                                    <p className="font-bold text-sm text-foreground">{item.label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input
                                        type="checkbox"
                                        name={item.name}
                                        checked={(formData as any)[item.name]}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 表示設定 */}
            {activeTab === "display" && (
                <div className="max-w-2xl space-y-4">
                    <div className="bg-card border border-border rounded-xl p-6 space-y-1">
                        <h2 className="font-bold text-foreground border-l-4 border-purple-500 pl-3 mb-5">公開ページの表示項目</h2>
                        <p className="text-xs text-muted-foreground mb-5">お客様が見る店舗ページに表示する項目を選択できます。</p>
                        {DISPLAY_SECTIONS.map(section => (
                            <div key={section.key} className="flex items-center justify-between gap-6 py-3.5 border-b border-border last:border-0">
                                <div>
                                    <p className="font-bold text-sm text-foreground">{section.label}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{section.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input
                                        type="checkbox"
                                        name={section.key}
                                        checked={(formData as any)[section.key]}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* カレンダー */}
            {activeTab === "calendar" && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-foreground border-l-4 border-purple-500 pl-3">今週の予約状況</h2>
                        <div className="flex items-center gap-4 px-4 py-1.5 rounded-lg bg-card border border-border">
                            <button onClick={() => changeWeek(-1)} className="text-purple-500 font-bold px-2 hover:text-foreground">←</button>
                            <p className="text-sm font-bold w-24 text-center">{days[0].label} 〜</p>
                            <button onClick={() => changeWeek(1)} className="text-purple-500 font-bold px-2 hover:text-foreground">→</button>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
                        <div className="grid grid-cols-8 bg-accent/5 text-muted-foreground border-b border-border">
                            <div className="p-4 text-center font-bold text-[10px] tracking-widest text-purple-500 border-r border-border">TIME</div>
                            {days.map((d, i) => (
                                <div key={i} className="p-3 text-center border-r border-border last:border-0">
                                    <p className="text-[10px] font-bold mb-1">{d.label}</p>
                                    <p className={`text-sm font-bold ${d.dayOfWeek === '日' ? 'text-red-500' : d.dayOfWeek === '土' ? 'text-blue-500' : 'text-foreground'}`}>{d.dayOfWeek}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-8 h-[500px] overflow-y-auto">
                            {hours.map((hour) => (
                                <React.Fragment key={hour}>
                                    <div className="border-b border-r border-border bg-accent/5 flex items-center justify-center font-mono font-bold text-muted-foreground text-xs">
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
                                            <div key={dayIdx} className="h-16 border-b border-r border-border relative p-1">
                                                {isReserved && (
                                                    <div className="w-full h-full bg-purple-500/20 border border-purple-500/50 rounded flex flex-col items-center justify-center text-purple-400">
                                                        <span className="text-[8px] font-bold tracking-widest uppercase">事前決済済</span>
                                                        <span className="text-[10px] font-bold">{bookingHere.user?.name || "ゲスト"}</span>
                                                    </div>
                                                )}
                                                {isPending && (
                                                    <div className="w-full h-full bg-orange-500/20 border border-orange-500/50 rounded flex flex-col items-center justify-center text-orange-400">
                                                        <span className="text-[8px] font-bold tracking-widest uppercase">当日払い</span>
                                                        <span className="text-[10px] font-bold">{bookingHere.user?.name || "ゲスト"}</span>
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
    );
}
