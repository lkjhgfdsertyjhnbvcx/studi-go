"use client";
import React, { useEffect, useState } from "react";

export default function AdminConfigPage() {
    const [adCode, setAdCode] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/admin/config').then(res => res.json()).then(data => setAdCode(data.adCode || ""));
    }, []);

    const save = async () => {
        setLoading(true);
        await fetch('/api/admin/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adCode }) });
        alert("広告を更新しました");
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black mb-10 tracking-tighter uppercase italic">Admin Config</h1>
                <div className="bg-zinc-900 p-10 rounded-[3rem] border border-zinc-800 shadow-2xl">
                    <textarea className="w-full h-80 bg-black rounded-[2rem] p-8 font-mono text-green-400 border-2 border-zinc-800 outline-none" placeholder="HTML Ad Code Here..." value={adCode} onChange={(e) => setAdCode(e.target.value)} />
                    <button onClick={save} disabled={loading} className="w-full mt-8 py-6 bg-purple-800 rounded-[2.5rem] font-black text-xl hover:bg-white hover:text-black transition-all">
                        {loading ? "SAVING..." : "UPDATE ADVERTISEMENT"}
                    </button>
                </div>
            </div>
        </div>
    );
}