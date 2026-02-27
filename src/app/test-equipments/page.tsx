"use client";
import React, { useEffect, useState } from "react";

export default function EquipmentsManagerPage() {
    const [equipments, setEquipments] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchEquipments = () => {
        fetch('/api/equipments').then(res => res.json()).then(data => {
            if (!data.error) setEquipments(data);
        });
    };

    useEffect(() => { fetchEquipments(); }, []);

    const handleAddEquipment = async () => {
        setIsProcessing(true);
        await fetch('/api/equipments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "ギターアンプ", price: 500, priceType: "PER_USE" })
        });
        fetchEquipments();
        setIsProcessing(false);
    };

    const handleSaveEquipment = async (equipment: any) => {
        setIsProcessing(true);
        const res = await fetch('/api/equipments', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equipment)
        });
        if (res.ok) alert(`✅ ${equipment.name} の設定を保存しました`);
        else alert("保存に失敗しました");
        setIsProcessing(false);
    };

    const handleDeleteEquipment = async (id: number, name: string) => {
        if (!confirm(`本当に「${name}」を削除しますか？`)) return;
        setIsProcessing(true);
        await fetch(`/api/equipments?id=${id}`, { method: 'DELETE' });
        fetchEquipments();
        setIsProcessing(false);
    };

    const handleChange = (id: number, field: string, value: any) => {
        setEquipments(equipments.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-100 text-purple-800 rounded-xl not-italic">🔌</span>
                            Options & Equipments
                        </h1>
                        <p className="text-xs text-gray-500 font-bold mt-2 tracking-widest uppercase">オプション機材・レンタルの設定</p>
                    </div>
                    <button
                        onClick={handleAddEquipment}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-lg shadow-purple-800/20 transition-all active:scale-95"
                    >
                        ＋ 新しい機材を追加
                    </button>
                </div>

                <div className="space-y-6">
                    {equipments.map(equipment => (
                        <div key={equipment.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-end gap-4 relative overflow-hidden">
                            <div className="absolute left-0 top-0 w-2 h-full bg-purple-800"></div>

                            <div className="flex-1 w-full">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">機材名</label>
                                <input
                                    type="text"
                                    value={equipment.name}
                                    onChange={(e) => handleChange(equipment.id, 'name', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-bold focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none"
                                />
                            </div>

                            {/* 🌟 課金方式の選択プルダウン */}
                            <div className="w-full md:w-40">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">課金方式</label>
                                <select
                                    value={equipment.priceType || "PER_USE"}
                                    onChange={(e) => handleChange(equipment.id, 'priceType', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-bold focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none cursor-pointer"
                                >
                                    <option value="PER_USE">1回あたり</option>
                                    <option value="PER_HOUR">1時間あたり</option>
                                </select>
                            </div>

                            <div className="w-full md:w-40">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">追加料金 (¥)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-500 font-bold">¥</span>
                                    <input
                                        type="number"
                                        value={equipment.price}
                                        onChange={(e) => handleChange(equipment.id, 'price', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-8 pr-4 py-3 text-gray-900 font-bold focus:border-purple-800 focus:ring-1 focus:ring-purple-800 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={() => handleSaveEquipment(equipment)}
                                    disabled={isProcessing}
                                    className="flex-1 md:w-24 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-sm transition-colors text-sm"
                                >
                                    💾 保存
                                </button>
                                <button
                                    onClick={() => handleDeleteEquipment(equipment.id, equipment.name)}
                                    className="flex-1 md:w-20 py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold hover:bg-red-50 transition-colors text-sm"
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}

                    {equipments.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-bold bg-white border border-gray-200 rounded-2xl shadow-sm">
                            機材が登録されていません。「＋ 新しい機材を追加」ボタンから作成してください。
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}