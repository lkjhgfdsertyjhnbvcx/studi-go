"use client";
import React, { useEffect, useState } from "react";

export default function StudiosManagerPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // 画面を開いた時に部屋一覧を取得
    const fetchStudios = () => {
        fetch('/api/studios')
            .then(res => res.json())
            .then(data => {
                if (!data.error) setStudios(data);
            });
    };

    useEffect(() => {
        fetchStudios();
    }, []);

    // 新しい部屋を追加
    const handleAddStudio = async () => {
        setIsProcessing(true);
        await fetch('/api/studios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "新規スタジオ", pricePerHour: 1500 })
        });
        fetchStudios();
        setIsProcessing(false);
    };

    // 部屋の設定を保存
    const handleSaveStudio = async (studio: any) => {
        setIsProcessing(true);
        const res = await fetch('/api/studios', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studio)
        });
        if (res.ok) alert(`✅ ${studio.name} の設定を保存しました`);
        else alert("保存に失敗しました");
        setIsProcessing(false);
    };

    // 部屋を削除
    const handleDeleteStudio = async (id: number, name: string) => {
        if (!confirm(`本当に「${name}」を削除しますか？\n※この操作は元に戻せません`)) return;
        setIsProcessing(true);
        await fetch(`/api/studios?id=${id}`, { method: 'DELETE' });
        fetchStudios();
        setIsProcessing(false);
    };

    // 入力欄の変更を反映
    const handleChange = (id: number, field: string, value: any) => {
        setStudios(studios.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    return (
        <div className="min-h-screen bg-[#0a0f16] text-gray-300 font-sans p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-600/20 text-purple-400 rounded-xl not-italic">🎸</span>
                            Rooms & Pricing
                        </h1>
                        <p className="text-xs text-purple-500/80 font-bold mt-2 tracking-widest uppercase">スタジオ（部屋）ごとの料金と設定</p>
                    </div>
                    <button
                        onClick={handleAddStudio} disabled={isProcessing}
                        className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
                    >
                        ＋ 新しい部屋を追加
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {studios.map(studio => (
                        <div key={studio.id} className="bg-[#111823] border border-gray-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>

                            <div className="flex justify-between items-start mb-6">
                                <input
                                    type="text"
                                    value={studio.name}
                                    onChange={(e) => handleChange(studio.id, 'name', e.target.value)}
                                    className="bg-transparent text-2xl font-black text-white border-b border-gray-700 focus:border-purple-500 focus:outline-none pb-1 w-1/2"
                                />
                                <button onClick={() => handleDeleteStudio(studio.id, studio.name)} className="text-red-500 text-sm font-bold hover:text-red-400 bg-red-500/10 px-3 py-1 rounded-lg">
                                    削除
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">1時間の料金 (¥)</label>
                                    <input type="number" value={studio.pricePerHour} onChange={(e) => handleChange(studio.id, 'pricePerHour', e.target.value)} className="w-full bg-[#0a0f16] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">何ヶ月先まで受付</label>
                                    <input type="number" value={studio.bookingLimitMonths} onChange={(e) => handleChange(studio.id, 'bookingLimitMonths', e.target.value)} className="w-full bg-[#0a0f16] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none" />
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 p-4 bg-[#0a0f16] rounded-xl border border-gray-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-300">店頭支払いを許可</span>
                                    <input type="checkbox" checked={studio.allowCash} onChange={(e) => handleChange(studio.id, 'allowCash', e.target.checked)} className="w-5 h-5 accent-purple-600" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-300">事前決済 (Apple Pay等) を許可</span>
                                    <input type="checkbox" checked={studio.allowOnlineStripe} onChange={(e) => handleChange(studio.id, 'allowOnlineStripe', e.target.checked)} className="w-5 h-5 accent-purple-600" />
                                </div>
                            </div>

                            <button
                                onClick={() => handleSaveStudio(studio)} disabled={isProcessing}
                                className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
                            >
                                💾 この部屋の設定を保存
                            </button>
                        </div>
                    ))}

                    {studios.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500 font-bold">
                            部屋が登録されていません。「＋ 新しい部屋を追加」ボタンから作成してください。
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}