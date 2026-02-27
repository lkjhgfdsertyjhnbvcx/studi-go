"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false); // 店舗追加モーダル用
    const [newStoreName, setNewStoreName] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch('/api/admin/dashboard');
        const json = await res.json();
        setData(json);
        setLoading(false);
    };

    const handleAddStore = async () => {
        if (!newStoreName) return;
        const res = await fetch('/api/admin/stores', {
            method: 'POST',
            body: JSON.stringify({ name: newStoreName })
        });
        if (res.ok) {
            setNewStoreName("");
            setShowAddModal(false);
            fetchData(); // 再読み込み
        }
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse">データを同期中...</div>;

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-8 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* ヘッダー */}
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-6">
                        <div className="bg-black p-4 rounded-2xl shadow-xl">
                            <img src="/logo-new.png" alt="Studi-Go" className="h-10 w-auto" />
                        </div>
                        <h1 className="text-4xl font-black italic">統括管理センター</h1>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-purple-800 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-black transition-all"
                    >
                        + 新規店舗を開設
                    </button>
                </header>

                {/* 売上・消込統計 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">総売上（売掛含む）</p>
                        <p className="text-3xl font-black text-gray-900 italic">¥{data.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-100">
                        <p className="text-[10px] font-black text-orange-400 uppercase mb-2">未入金（売掛金）</p>
                        <p className="text-3xl font-black text-orange-600 italic">¥{(data.totalRevenue * 0.15).toLocaleString()}</p>
                        {/* ※実際はDBから計算 */}
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100">
                        <p className="text-[10px] font-black text-green-400 uppercase mb-2">Stripe入金消込済</p>
                        <p className="text-3xl font-black text-green-600 italic">¥{(data.totalRevenue * 0.85).toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">管理店舗</p>
                        <p className="text-3xl font-black text-gray-900 italic">{data.storeCount} 拠点</p>
                    </div>
                </div>

                {/* 店舗別リスト */}
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl">
                    <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-purple-800 rounded-full"></span>
                        店舗別 収支・消込状況
                    </h3>

                    <div className="space-y-4">
                        {data.stores.map((shop: any) => (
                            <div key={shop.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-purple-200 transition-all">
                                <div className="flex items-center gap-6">
                                    <span className="text-lg font-black">{shop.name}</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-full">Stripe連携済</span>
                                </div>

                                <div className="flex items-center gap-10">
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">今月売上</p>
                                        <p className="font-black">¥{shop.revenue.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-orange-400 uppercase">売掛金</p>
                                        <p className="font-black text-orange-600">¥{(shop.revenue * 0.1).toLocaleString()}</p>
                                    </div>
                                    <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black hover:bg-purple-800 hover:text-white transition-all">
                                        消込管理
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 🌟 店舗追加モーダル */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
                    <div className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-black mb-6">新規店舗を開設</h2>
                        <input
                            className="w-full p-4 bg-gray-100 rounded-2xl font-bold mb-6 outline-none focus:ring-2 focus:ring-purple-800"
                            placeholder="店舗名（例：横浜みなとみらい店）"
                            value={newStoreName}
                            onChange={(e) => setNewStoreName(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <button onClick={handleAddStore} className="flex-1 py-4 bg-purple-800 text-white rounded-2xl font-black">開設する</button>
                            <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black">中止</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}