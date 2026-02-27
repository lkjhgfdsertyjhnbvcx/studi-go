"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [reconciling, setReconciling] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/dashboard');
            const json = await res.json();
            if (json.error) throw new Error(json.error);
            setData(json);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleReconcile = async () => {
        if (!confirm("Stripeと照合し入金消込を開始しますか？")) return;
        setReconciling(true);
        try {
            const res = await fetch('/api/admin/reconcile', { method: 'POST' });
            const result = await res.json();
            alert(`同期完了: ${result.message}`);
            fetchData();
        } catch (e) {
            alert("同期に失敗しました");
        } finally {
            setReconciling(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-800 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black text-purple-800 animate-pulse text-xl">全店舗データを同期中...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-6 md:p-12 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* ロゴ付きヘッダー */}
                <header className="flex flex-wrap justify-between items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <div className="bg-black p-4 rounded-2xl shadow-xl hover:rotate-2 transition-transform">
                            <img src="/logo-new.png" alt="Studi-Go" className="h-12 w-auto" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black italic tracking-tighter text-gray-900">統括管理センター</h1>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1">Studi-Go Global Control</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleReconcile} disabled={reconciling} className={`px-8 py-4 rounded-2xl font-black shadow-lg transition-all ${reconciling ? 'bg-gray-400' : 'bg-green-600 text-white hover:bg-black'}`}>
                            {reconciling ? "Stripe照合中..." : "🔄 Stripe入金一括消込"}
                        </button>
                    </div>
                </header>

                {/* 収支統計 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-300 uppercase mb-2">総売上（売掛含）</p>
                        <p className="text-4xl font-black text-purple-800 italic">¥{data?.totalRevenue?.toLocaleString() || 0}</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-orange-100">
                        <p className="text-[10px] font-black text-orange-400 uppercase mb-2">未入金（売掛金）</p>
                        <p className="text-4xl font-black text-orange-600 italic">¥{data?.unpaidRevenue?.toLocaleString() || 0}</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-green-100">
                        <p className="text-[10px] font-black text-green-400 uppercase mb-2">Stripe入金消込済</p>
                        <p className="text-4xl font-black text-green-600 italic">¥{data?.paidRevenue?.toLocaleString() || 0}</p>
                    </div>
                </div>

                {/* 店舗別リスト */}
                <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-gray-100">
                    <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                        <span className="w-2.5 h-10 bg-purple-800 rounded-full shadow-[0_0_15px_rgba(107,33,168,0.5)]"></span>
                        拠点別 稼働状況
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        {data?.stores?.map((shop: any) => (
                            <div key={shop.id} className="flex flex-wrap items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] hover:bg-purple-50 transition-all border border-transparent hover:border-purple-200 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-2xl font-black text-gray-900">{shop.name}</span>
                                </div>
                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-300 uppercase">店舗売上</p>
                                        <p className="text-xl font-black font-mono">¥{shop.revenue.toLocaleString()}</p>
                                    </div>
                                    <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-purple-800 group-hover:text-white transition-all text-2xl">▶</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}