"use client";
import React, { useEffect, useState } from "react";

export default function StudiosManagerPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchStudios = () => {
        fetch('/api/studios').then(res => res.json()).then(data => {
            if (!data.error) setStudios(data);
        });
    };

    useEffect(() => { fetchStudios(); }, []);

    const handleAddStudio = async () => {
        setIsProcessing(true);
        await fetch('/api/studios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: "新規スタジオ" }) });
        fetchStudios();
        setIsProcessing(false);
    };

    const handleSaveStudio = async (studio: any) => {
        setIsProcessing(true);
        const res = await fetch('/api/studios', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(studio) });
        if (res.ok) alert(`✅ ${studio.name} の設定を保存しました`);
        else alert("保存に失敗しました");
        setIsProcessing(false);
    };

    const handleDeleteStudio = async (id: number, name: string) => {
        if (!confirm(`本当に「${name}」を削除しますか？`)) return;
        setIsProcessing(true);
        await fetch(`/api/studios?id=${id}`, { method: 'DELETE' });
        fetchStudios();
        setIsProcessing(false);
    };

    const handleChange = (id: number, field: string, value: any) => {
        setStudios(studios.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    // 🌟 追加：ファイル選択時に画像を文字データ（Base64）に変換して保存する魔法
    const handlePhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            handleChange(id, 'photoUrls', reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        // 🌟 全体を白ベース（ライトグレー背景）に変更
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-100 text-purple-800 rounded-xl not-italic">🎸</span>
                            Rooms & Pricing
                        </h1>
                        <p className="text-xs text-gray-500 font-bold mt-2 tracking-widest uppercase">スタジオ詳細設定（完全版）</p>
                    </div>
                    <button
                        onClick={handleAddStudio}
                        disabled={isProcessing}
                        // 🌟 ボタンを濃い紫（bg-purple-800）に変更
                        className="px-6 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-lg shadow-purple-800/20 transition-all active:scale-95"
                    >
                        ＋ 新しい部屋を追加
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {studios.map(studio => (
                        // 🌟 カードを純白（bg-white）に変更
                        <div key={studio.id} className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-purple-800"></div>

                            <div className="flex justify-between items-start mb-6">
                                <input
                                    type="text"
                                    value={studio.name}
                                    onChange={(e) => handleChange(studio.id, 'name', e.target.value)}
                                    className="bg-transparent text-2xl font-black text-gray-900 border-b border-gray-300 focus:border-purple-800 focus:outline-none pb-1 w-1/2"
                                />
                                <button onClick={() => handleDeleteStudio(studio.id, studio.name)} className="text-red-600 text-sm font-bold hover:text-red-700 bg-red-50 px-3 py-1 rounded-lg border border-red-100">削除</button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">基本料金 (1時間)</label>
                                    <input type="number" value={studio.pricePerHour} onChange={(e) => handleChange(studio.id, 'pricePerHour', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">学割 (引く金額)</label>
                                    <input type="number" value={studio.studentDiscount || 0} onChange={(e) => handleChange(studio.id, 'studentDiscount', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none" />
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">スタジオ写真</label>
                                    {/* 🌟 写真をファイル選択式に変更 */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handlePhotoUpload(studio.id, e)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-gray-900 focus:border-purple-800 focus:outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple-100 file:text-purple-800 hover:file:bg-purple-200 cursor-pointer"
                                    />
                                    {/* 選んだ写真のプレビュー表示 */}
                                    {studio.photoUrls && studio.photoUrls.startsWith('data:image') && (
                                        <img src={studio.photoUrls} alt="preview" className="mt-3 h-24 w-full object-cover rounded-xl border border-gray-200 shadow-sm" />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">スタジオ説明</label>
                                    <textarea value={studio.description || ""} onChange={(e) => handleChange(studio.id, 'description', e.target.value)} rows={2} placeholder="機材の構成や広さなどを記入" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none text-sm" />
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-700">店頭支払いを許可</span>
                                    <input type="checkbox" checked={studio.allowCash} onChange={(e) => handleChange(studio.id, 'allowCash', e.target.checked)} className="w-5 h-5 accent-purple-800" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-700">Apple Pay等を許可</span>
                                    <input type="checkbox" checked={studio.allowOnlineStripe} onChange={(e) => handleChange(studio.id, 'allowOnlineStripe', e.target.checked)} className="w-5 h-5 accent-purple-800" />
                                </div>
                                <div className="h-px w-full bg-gray-200 my-2"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-purple-800">Activaクーポンを適用</span>
                                    <input type="checkbox" checked={studio.allowActivaCoupon || false} onChange={(e) => handleChange(studio.id, 'allowActivaCoupon', e.target.checked)} className="w-5 h-5 accent-purple-800" />
                                </div>
                            </div>

                            <button
                                onClick={() => handleSaveStudio(studio)}
                                disabled={isProcessing}
                                // 🌟 ボタンを濃い紫に変更
                                className="w-full py-4 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-md transition-colors"
                            >
                                💾 この部屋の設定を保存
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}