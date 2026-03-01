"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PhysicsHero from "@/components/PhysicsHero";

export default function StudioDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [studio, setStudio] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(`/api/stores/${params.id}`);
                const data = await res.json();
                if (data && !data.error) {
                    setStudio(data);
                } else {
                    setStudio({
                        storeName: "Studio Detail",
                        description: "スタジオの詳細情報を読み込んでいます。",
                        address: "住所情報",
                        primaryColor: "neon"
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [params.id]);

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center italic">Loading...</div>;

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* 🌟 渡すデータを studioName と primaryColor だけに絞り、エラーを回避 */}
            <PhysicsHero 
                studioName={studio?.storeName} 
                primaryColor={studio?.primaryColor || "neon"} 
            />

            <div className="max-w-4xl mx-auto p-8">
                <button onClick={() => router.push('/')} className="mb-8 text-purple-800 font-bold">← トップへ戻る</button>
                
                <h1 className="text-4xl font-black mb-4">{studio?.storeName}</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">{studio?.description}</p>
                
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10">
                    <p className="font-bold text-gray-400 uppercase text-xs mb-2">Location</p>
                    <p className="font-bold">{studio?.address}</p>
                </div>
                
                <button 
                    onClick={() => router.push(`/booking?storeId=${params.id}`)}
                    className="w-full py-4 bg-purple-800 text-white rounded-2xl font-black text-xl shadow-xl shadow-purple-800/30 hover:scale-[1.02] transition-transform"
                >
                    このスタジオを予約する
                </button>
            </div>
        </div>
    );
}
