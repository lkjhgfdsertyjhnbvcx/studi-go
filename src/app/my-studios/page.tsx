"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchStudios } from "@/actions/studio";
import { getMyStudiosAction, toggleMyStudioAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Star } from "lucide-react";
import { ThemeProvider } from "@/lib/theme-context";
import { UserDisplay } from "@/components/UserDisplay";

export default function MyStudiosPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [myStudios, setMyStudios] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const allStudios = await fetchStudios();
            const myIds = await getMyStudiosAction();
            setMyStudios(myIds);

            // Filter only my studios
            const filtered = allStudios.filter((s: any) => myIds.includes(s.id));
            setStudios(filtered);
            setLoading(false);
        };
        load();
    }, []);

    const handleToggleFavorite = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await toggleMyStudioAction(id);
        if (res.success) {
            const updatedList = res.myStudios || [];
            setMyStudios(updatedList);
            // Re-filter list immediately to reflect removal? 
            // Better to keep showing it until refresh to prevent accidental disappear? 
            // But usually "My List" page removes items immediately.
            setStudios(prev => prev.filter(s => updatedList.includes(s.id)));
        } else {
            alert("ログインが必要です");
        }
    };

    if (loading) return <div className="min-h-screen bg-black text-white p-20">Loading...</div>;

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-black text-white p-6 md:p-20 font-sans relative">
                {/* Logo Top Left */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 flex items-center gap-8">
                    <Link href="/studios">
                        <Image
                            src="/logo-new.png"
                            alt="Logo"
                            width={200}
                            height={60}
                            className="h-12 w-auto object-contain invert hover:opacity-80 transition-opacity"
                            priority
                        />
                    </Link>
                </div>

                {/* User Display / Logout */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
                    <UserDisplay />
                </div>

                <header className="mb-12 text-center pt-10">
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                        MY STUDIOS
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        これまでに利用したスタジオや登録したスタジオの一覧です。
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {studios.length > 0 ? studios.map((studio, i) => {
                        return (
                            <Link href={`/studios/${studio.id}`} key={studio.id} className="group cursor-pointer">
                                <div className="relative h-64 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-pink-500/50 group-hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]">
                                    {/* Mock Image Gradient if no image */}
                                    {studio.images && studio.images.length > 0 ? (
                                        <Image
                                            src={studio.images[0]}
                                            alt={studio.storeName}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 opacity-50`} />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-mono text-pink-400 border border-pink-900 bg-pink-950/30 px-2 py-1 rounded">
                                                    MY BASE
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={`h-8 w-8 hover:bg-white/10 text-yellow-400`}
                                                    onClick={(e) => handleToggleFavorite(e, studio.id)}
                                                >
                                                    <Star fill="currentColor" className="h-5 w-5" />
                                                </Button>
                                            </div>
                                            <h2 className="text-3xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                                                {studio.storeName}
                                            </h2>
                                            <p className="flex items-center text-gray-400 text-sm">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {studio.address || "Unknown Location"}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                            <div className="text-sm">
                                                <span className="block text-gray-500 text-xs">ROOMS</span>
                                                <span className="font-mono text-xl">{studio.rooms?.length || 0}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-black transition-all">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            まだ登録されたスタジオはありません。<br />
                            予約を行うと自動的にここに追加されます。
                        </div>
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
}
