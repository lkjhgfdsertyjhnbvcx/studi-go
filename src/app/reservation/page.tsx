"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ReservationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [store, setStore] = useState<any>(null);
    const [studio, setStudio] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 🌟 会員登録済みかどうかのフラグ

    const [isStudent, setIsStudent] = useState(false);
    const [useActivaCoupon, setUseActivaCoupon] = useState(false);

    useEffect(() => {
        // 店の設定（学割額など）を取得
        fetch('/api/store').then(res => res.json()).then(data => setStore(data));
        // 部屋情報を取得
        const studioId = searchParams.get("studioId") || "1";
        fetch('/api/studios').then(res => res.json()).then(data => {
            setStudio(data.find((s: any) => s.id === parseInt(studioId)));
        });
        // 🌟 会員チェック（今回は「ユーザーが1人でも存在すればログイン中」とみなす簡易仕様）
        fetch('/api/users').then(res => res.json()).then(users => {
            if (users && users.length > 0) setIsLoggedIn(true);
        });
    }, []);

    if (!studio || !store) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold">LOADING...</div>;

    const basePrice = studio.pricePerHour || 0;

    // 💰 割引計算
    let discount = 0;
    if (isStudent) discount += store.studentDiscount; // 店側が設定した金額
    if (useActivaCoupon) discount += 1000; // Activaクーポン（固定1000円）

    const totalPrice = Math.max(0, basePrice - discount);

    const handleCouponCheck = (checked: boolean) => {
        if (checked && !isLoggedIn) {
            alert("⚠️ Activaクーポンを利用するには、まず会員登録（マイページ作成）が必要です！");
            router.push('/mypage'); // 登録を促すためにマイページへ誘導
            return;
        }
        setUseActivaCoupon(checked);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 flex flex-col items-center font-sans">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-black italic text-gray-900">Booking Confirmation</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{store.name} / {studio.name}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 mb-6 shadow-sm space-y-6">
                    <p className="text-purple-800 font-bold text-[10px] uppercase border-b border-gray-100 pb-2">Select Discounts</p>

                    {/* 学割（店が設定した金額が反映されます） */}
                    <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${isStudent ? 'border-purple-800 bg-purple-50' : 'border-gray-50 bg-gray-50'}`}>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🎓</span>
                            <div>
                                <p className="font-black text-sm">学生割引を適用</p>
                                <p className="text-[10px] text-purple-600 font-bold">-{store.studentDiscount}円引き</p>
                            </div>
                        </div>
                        <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} className="w-6 h-6 accent-purple-800" />
                    </label>

                    {/* Activaクーポン（未登録ならアラートが出る） */}
                    <label className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${useActivaCoupon ? 'border-purple-800 bg-purple-50' : 'border-gray-50 bg-gray-50'}`}>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">✨</span>
                            <div>
                                <p className="font-black text-sm">Activaクーポン</p>
                                {isLoggedIn ? (
                                    <p className="text-[10px] text-purple-600 font-bold">-1,000円引き適用可能</p>
                                ) : (
                                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter italic">※会員限定特典</p>
                                )}
                            </div>
                        </div>
                        <input type="checkbox" checked={useActivaCoupon} onChange={(e) => handleCouponCheck(e.target.checked)} className="w-6 h-6 accent-purple-800" />
                    </label>
                </div>

                {/* 料金表示 */}
                <div className="px-6 mb-8">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-gray-400 font-bold text-xs uppercase">Subtotal</span>
                        <span className="text-gray-600 font-bold">¥{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-t border-gray-100 pt-4">
                        <span className="text-gray-500 font-bold text-sm">Total Pay</span>
                        <span className="text-4xl font-black text-purple-800 tracking-tighter">¥{totalPrice.toLocaleString()}</span>
                    </div>
                </div>

                <button onClick={() => router.push(`/pay/req_123?total=${totalPrice}`)} className="w-full py-6 bg-purple-800 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-purple-900 transition-all">
                    決済画面へ進む
                </button>
            </div>
        </div>
    );
}

export default function ReservationPage() {
    return <Suspense fallback={null}><ReservationContent /></Suspense>;
}