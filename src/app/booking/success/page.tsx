"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-24 h-24 text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
                </div>

                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                    予約完了
                </h1>
                <p className="text-gray-400">
                    ご予約ありがとうございます。<br />
                    確認メールを送信しましたのでご確認ください。
                </p>

                {id && (
                    <div className="bg-slate-900 border border-white/10 p-4 rounded-lg font-mono text-sm">
                        Booking ID: <span className="text-cyan-400">{id}</span>
                    </div>
                )}

                <div className="py-8 space-y-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded min-h-[250px] flex items-center justify-center text-gray-500">
                        {/* Google AdSense Placeholder */}
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest mb-2">Advertisement</p>
                            {/* Simulated Ad Block */}
                            <div className="w-[300px] h-[250px] bg-slate-800 flex items-center justify-center">
                                <span className="text-xs">Google AdSense Area</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Link href="/my-studios">
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-500">
                            My Studioを確認
                        </Button>
                    </Link>
                    <Link href="/studios">
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                            トップへ戻る
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function BookingSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
