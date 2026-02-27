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
import { UserDisplay } from "@/components/UserDisplay";
import { getCurrentUser, logoutAction } from "@/actions/login";
import * as wanakana from 'wanakana';

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
        const term = searchTerm.toLowerCase();
        const romajiTerm = wanakana.toRomaji(searchTerm).toLowerCase();

        const storeName = s.storeName.toLowerCase();
        const address = (s.address || "").toLowerCase();

        const matchesSearch = storeName.includes(term) ||
            storeName.includes(romajiTerm) ||
            address.includes(term) ||
            address.includes(romajiTerm);

        const matchesPref = prefecture === "all" || (s.address && s.address.includes(prefecture));

        return matchesSearch && matchesPref;
    });

    const myStudioList = studios.filter(s => myStudios.includes(s.id));

    // Mock prefectures list based on existing data or static
    const prefectures = ["東京都", "神奈川県", "大阪府", "京都府", "福岡県", "北海道"];

    const renderStudioCard = (studio: any, i: number) => {
        const isFavorite = myStudios.includes(studio.id);
        return (
            <Link href={`/studios/${studio.id}`} key={studio.id} className="group cursor-pointer">
                <div className="relative h-64 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]">
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black/80 dark:via-black/20 dark:to-transparent" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono text-cyan-400 border border-cyan-900 bg-cyan-950/30 px-2 py-1 rounded">
                                    エリア {String(i + 1).padStart(2, '0')}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 hover:bg-white/10 ${isFavorite ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-200'}`}
                                    onClick={(e) => handleToggleFavorite(e, studio.id)}
                                >
                                    <Star fill={isFavorite ? "currentColor" : "none"} className="h-5 w-5" />
                                </Button>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors drop-shadow-lg">
                                {studio.storeName}
                            </h2>
                            <p className="flex items-center text-gray-300 text-sm drop-shadow-md">
                                <MapPin className="w-3 h-3 mr-1" />
                                {studio.address || "住所未設定"}
                            </p>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/10 dark:border-white/10 pt-4">
                            <div className="text-sm">
                                <span className="block text-gray-400 text-xs">ルーム数</span>
                                <span className="font-mono text-xl text-white">{studio.rooms?.length || 0}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                <ArrowRight className="w-5 h-5 text-white group-hover:text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-20 font-sans relative">
            {/* Logo Top Left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-8">
                <Image
                    src="/logo-new.png"
                    alt="Logo"
                    width={400}
                    height={120}
                    className="h-24 w-auto object-contain dark:invert"
                    priority
                />
            </div>

            {/* Top Right Menu */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 flex gap-4">
                <UserDisplay />
            </div>

            <header className="mb-12 text-center pt-32 md:pt-36">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    スタジオを探す
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    スタジオを選択してください
                </p>

                {/* Search & Filter */}
                <div className="max-w-2xl mx-auto flex gap-4 bg-card/50 p-4 rounded-xl border border-border backdrop-blur-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="スタジオ名・住所で検索..."
                            className="pl-10 bg-background/50 border-border text-foreground"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={prefecture} onValueChange={setPrefecture}>
                        <SelectTrigger className="w-[140px] bg-background/50 border-border text-foreground">
                            <SelectValue placeholder="都道府県" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border text-foreground">
                            <SelectItem value="all">全国</SelectItem>
                            {prefectures.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </header>

            {isLoggedIn && myStudioList.length > 0 && (
                <div className="max-w-7xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center border-b border-border pb-2">
                        My Studio <span className="text-sm font-normal text-muted-foreground ml-4">利用歴のあるスタジオ</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myStudioList
                            .filter(s => {
                                const term = searchTerm.toLowerCase();
                                const romajiTerm = wanakana.toRomaji(searchTerm).toLowerCase();

                                const storeName = s.storeName.toLowerCase();
                                const address = (s.address || "").toLowerCase();

                                const matchesSearch = storeName.includes(term) ||
                                    storeName.includes(romajiTerm) ||
                                    address.includes(term) ||
                                    address.includes(romajiTerm);

                                const matchesPref = prefecture === "all" || (s.address && s.address.includes(prefecture));
                                return matchesSearch && matchesPref;
                            })
                            .map((studio, i) => renderStudioCard(studio, i))}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center border-b border-border pb-2">
                    スタジオ一覧
                </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredStudios.map((studio, i) => renderStudioCard(studio, i))}
            </div>

            {filteredStudios.length === 0 && (
                <div className="text-center text-muted-foreground mt-20">
                    条件に一致するスタジオがありません。
                </div>
            )}
        </div>
    );
}
