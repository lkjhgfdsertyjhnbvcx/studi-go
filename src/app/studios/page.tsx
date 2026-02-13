"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchStudios } from "@/actions/studio";
import { getMyStudiosAction, toggleMyStudioAction } from "@/actions/user";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Star, Search } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { getCurrentUser, logoutAction } from "@/actions/login";
import { LogOut } from "lucide-react";

export default function StudioSelectPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [myStudios, setMyStudios] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [prefecture, setPrefecture] = useState("all");

    useEffect(() => {
        const load = async () => {
            const data = await fetchStudios();
            setStudios(data);

            const user = await getCurrentUser();
            setIsLoggedIn(!!user);

            if (user) {
                const myData = await getMyStudiosAction();
                setMyStudios(myData);
            }
        };
        load();
    }, []);

    const handleLogout = async () => {
        await logoutAction();
        setIsLoggedIn(false);
        setMyStudios([]);
        window.location.reload();
    };

    const handleToggleFavorite = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await toggleMyStudioAction(id);
        if (res.success) {
            setMyStudios(res.myStudios || []);
        } else {
            alert("ログインが必要です");
        }
    };

    const filteredStudios = studios.filter(s => {
        const matchesSearch = s.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.address && s.address.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesPref = prefecture === "all" || (s.address && s.address.includes(prefecture));

        return matchesSearch && matchesPref;
    });

    const myStudioList = studios.filter(s => myStudios.includes(s.id));

    // Mock prefectures list based on existing data or static
    const prefectures = ["東京都", "神奈川県", "大阪府", "京都府", "福岡県", "北海道"];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-20 font-sans relative">
            {/* Logo Top Left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-8">
                <Image
                    src="/logo-new.png"
                    alt="Logo"
                    width={400}
                    height={120}
                    className="h-24 w-auto object-contain invert"
                    priority
                />
            </div>

            {/* Top Right Menu */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 flex gap-4">
                {isLoggedIn ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-slate-900 border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                                My Studio <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700 text-white">
                            <DropdownMenuLabel>登録済みスタジオ</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            {myStudioList.length > 0 ? (
                                myStudioList.slice(0, 5).map(studio => (
                                    <DropdownMenuItem key={studio.id} asChild className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                                        <Link href={`/studios/${studio.id}`}>
                                            {studio.storeName}
                                        </Link>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="p-2 text-xs text-gray-500">登録済みなし</div>
                            )}
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem asChild className="focus:bg-slate-800 cursor-pointer">
                                <Link href="/my-studios" className="flex items-center text-gray-400">
                                    すべて見る <ArrowRight className="ml-2 h-3 w-3" />
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem onClick={handleLogout} className="focus:bg-slate-800 cursor-pointer text-red-400 focus:text-red-300">
                                <span className="flex items-center w-full">
                                    ログアウト <LogOut className="ml-auto h-3 w-3" />
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild variant="ghost" className="text-white hover:text-cyan-400 hover:bg-white/10">
                        <Link href="/login">Login</Link>
                    </Button>
                )}
            </div>

            <header className="mb-12 text-center pt-32 md:pt-36">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6">
                    SELECT STUDIO
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    スタジオを探す<br />
                </p>

                {/* Search & Filter */}
                <div className="max-w-2xl mx-auto flex gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="スタジオ名・住所で検索..."
                            className="pl-10 bg-black/50 border-white/10 text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={prefecture} onValueChange={setPrefecture}>
                        <SelectTrigger className="w-[140px] bg-black/50 border-white/10 text-white">
                            <SelectValue placeholder="都道府県" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 text-white">
                            <SelectItem value="all">全国</SelectItem>
                            {prefectures.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredStudios.map((studio, i) => {
                    const isFavorite = myStudios.includes(studio.id);
                    return (
                        <Link href={`/studios/${studio.id}`} key={studio.id} className="group cursor-pointer">
                            <div className="relative h-64 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]">
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
                                            <span className="text-xs font-mono text-cyan-400 border border-cyan-900 bg-cyan-950/30 px-2 py-1 rounded">
                                                AREA {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`h-8 w-8 hover:bg-white/10 ${isFavorite ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-200'}`}
                                                onClick={(e) => handleToggleFavorite(e, studio.id)}
                                            >
                                                <Star fill={isFavorite ? "currentColor" : "none"} className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
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
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {filteredStudios.length === 0 && (
                <div className="text-center text-gray-600 mt-20">
                    条件に一致するスタジオがありません。
                </div>
            )}
        </div>
    );
}
