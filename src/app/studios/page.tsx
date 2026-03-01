"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function StudioDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [studio, setStudio] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🌟 データを取得しに行くが、失敗してもダミーを表示するようにガード
        const fetchStudio = async () => {
            try {
                const res = await fetch(`/api/stores/${params.id}`);
                const data = await res.json();
                if (data && !data.error) {
                    setStudio(data);
                } else {
                    // データがない場合は仮の情報を入れる
                    setStudio({
                        name: "Studio Detail",
                        description: "スタジオの詳細情報です。現在、最新データを読み込んでいます。",
                        address: "店舗住所",
                        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
                    });
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudio();
    }, [params.id]);

    if (loading) return (
        <div className="min-h-screen bg-black text-cyan-400 flex items-center justify-center font-mono">
            AUTHENTICATING_STUDIO_METADATA...
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 p-8">
            <button onClick={() => router.push('/')} className="mb-8 text-purple-800 font-bold">← 戻る</button>
            
            <div className="max-w-4xl mx-auto">
                <img src={studio.image} className="w-full h-64 object-cover rounded-3xl mb-8 shadow-xl" alt="" />
                <h1 className="text-4xl font-black mb-4">{studio.name}</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">{studio.description}</p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="font-bold text-gray-400 uppercase text-xs mb-2">Location</p>
                    <p className="font-bold">{studio.address}</p>
                </div>
                
                <button 
                    onClick={() => router.push(`/booking?storeId=${params.id}`)}
                    className="w-full mt-10 py-4 bg-purple-800 text-white rounded-2xl font-black text-xl shadow-xl shadow-purple-800/30"
                >
                    このスタジオを予約する
                </button>
            </div>
        </div>
    );
}
