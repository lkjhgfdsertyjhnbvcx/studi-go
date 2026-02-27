"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";

function PayContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [studio, setStudio] = useState<any>(null);

    const studioId = searchParams.get("studioId") || "1";
    const start = searchParams.get("start") || "10:00";
    const end = searchParams.get("end") || "11:00";
    const dayData = searchParams.get("dayData") || new Date().toISOString();
    const totalPrice = searchParams.get("total") || "0";

    useEffect(() => {
        fetch('/api/studios').then(res => res.json()).then(data => {
            const found = data.find((s: any) => s.id === parseInt(studioId)) || data[0];
            setStudio(found);
        });
    }, [studioId]);

    const handlePay = async () => {
        setIsProcessing(true);
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studioId,
                startTime: `${dayData.split('T')[0]}T${start}:00.000Z`,
                endTime: `${dayData.split('T')[0]}T${end}:00.000Z`,
                totalPrice,
                status: "支払い済み"
            })
        });

        if (res.ok) {
            alert("✅ 決済完了！マイページへ移動します。");
            router.push('/mypage');
        } else {
            alert("❌ 決済処理に失敗しました。");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white border border-gray-200 rounded-[2.5rem] p-10 shadow-xl">
                <h1 className="text-2xl font-black italic text-center mb-8">Payment</h1>
                <div className="space-y-4 mb-10">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-400 font-bold text-xs uppercase">Studio</span>
                        <span className="font-black">{studio?.name || "Loading..."}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-400 font-bold text-xs uppercase">Total</span>
                        <span className="text-2xl font-black text-purple-800">¥{parseInt(totalPrice).toLocaleString()}</span>
                    </div>
                </div>
                <button onClick={handlePay} disabled={isProcessing} className="w-full py-6 bg-purple-800 text-white rounded-3xl font-black text-xl shadow-lg active:scale-95 disabled:bg-gray-200">
                    {isProcessing ? "PROCESSING..." : "PAY NOW"}
                </button>
            </div>
        </div>
    );
}

export default function PayPage() { return <Suspense fallback={null}><PayContent /></Suspense>; }