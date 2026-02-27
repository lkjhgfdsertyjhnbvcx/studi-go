"use client";
import React, { useEffect, useState } from "react";

export default function BookingComplete() {
    const [adCode, setAdCode] = useState("");
    useEffect(() => {
        fetch('/api/admin/config').then(res => res.json()).then(data => setAdCode(data.adCode || ""));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 font-sans">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl text-center max-w-2xl w-full border-t-[12px] border-red-500">
                <h1 className="text-6xl font-black mb-6 text-red-600 tracking-tighter">予約完了</h1>
                <p className="text-xl font-bold mb-12 text-gray-700">予約が確定しました。当日お待ちしております。</p>
                <div className="w-full bg-gray-100 rounded-[3rem] p-8 min-h-[280px] flex flex-col items-center justify-center border-2 border-dashed">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-widest">Sponsored Information</p>
                    <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: adCode }} />
                    {!adCode && <div className="text-gray-300 font-black text-xl italic">Enjoy your session!</div>}
                </div>
                <button onClick={() => window.location.href = '/'} className="mt-12 text-sm font-black text-gray-400 hover:text-red-500 uppercase tracking-widest">← BACK TO HOME</button>
            </div>
        </div>
    );
}