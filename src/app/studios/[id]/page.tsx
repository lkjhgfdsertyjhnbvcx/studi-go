"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ThemeProvider, useTheme } from "@/lib/theme-context";
import PhysicsHero from "@/components/PhysicsHero";
// Removed SettingsPanel
// Removed BookingModal usage here (users select room first)
import { useLineLiff } from "@/hooks/use-line-liff";
import { fetchStudio } from "@/actions/studio";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserDisplay } from "@/components/UserDisplay";
import { StudioMap } from "@/components/studio/StudioMap";

export default function StudioPageContent() {
    const params = useParams();
    const id = params.id as string;

    const { profile } = useLineLiff();
    const { backgroundColor, backgroundImage, logoUrl, mode } = useTheme();

    const [studio, setStudio] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            const data = await fetchStudio(id);
            if (data) {
                setStudio(data);
            }
        };
        load();
    }, [id]);

    if (!studio) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground gap-4">
            <div className="h-2 w-24 bg-cyan-500 rounded-full animate-pulse"></div>
            <p className="font-mono text-xs uppercase tracking-widest animate-pulse">AUTHENTICATING_STUDIO_METADATA...</p>
        </div>
    );

    return (
        <main
            className="min-h-screen text-foreground selection:bg-cyan-500 selection:text-black transition-all duration-500"
            style={{
                backgroundColor: backgroundColor === "#000000" && mode === "light" ? "hsl(var(--background))" : backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center'
            }}
        >
            {/* Header / Nav */}
            <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none px-8 md:px-12 bg-gradient-to-b from-background/80 via-background/40 to-transparent backdrop-blur-sm md:backdrop-blur-none md:bg-gradient-to-b md:from-black/60 md:to-transparent">
                <div className="flex items-center gap-4 pointer-events-auto">
                    {logoUrl ? (
                        <Link href={`/studios/${id}`} className="flex items-center gap-3 group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border bg-card/40 backdrop-blur-md overflow-hidden p-1 group-hover:border-cyan-500 transition-colors">
                                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain dark:invert" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold tracking-tighter drop-shadow-lg group-hover:text-cyan-400 transition-colors">
                                {studio.storeName}
                            </span>
                        </Link>
                    ) : (
                        <span className="text-xl md:text-2xl font-bold tracking-tighter drop-shadow-lg">{studio.storeName}</span>
                    )}
                </div>
                <div className="flex gap-4 items-center pointer-events-auto">
                    <div className="hidden md:block text-[10px] font-mono tracking-widest text-muted-foreground mr-4">
                        {profile ? `PLAYER: ${profile.displayName.toUpperCase()}` : "ゲストアクセス"}
                    </div>
                    <UserDisplay />
                </div>
            </header>

            {/* Physics Hero Area - Visual Only now, or just fun interaction */}
            <div className="relative">
                <PhysicsHero
                    studioName={studio.storeName}
                    appealPoint={studio.appealPoint}
                    onBookingTrigger={() => console.log("Physics interaction")}
                />
            </div>

            {/* Content Section: Rooms List */}
            <section id="rooms-list" className="container mx-auto px-4 py-20 space-y-10 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4 drop-shadow-md">スタジオ・ルーム一覧</h2>
                    <p className="text-muted-foreground drop-shadow-sm">ご希望のスタジオ（部屋）を選択して予約してください</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {studio.rooms?.length > 0 ? studio.rooms.map((room: any, i: number) => (
                        <div key={i} className="group relative overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-md hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                            {/* Room Image if available */}
                            {room.images && room.images.length > 0 ? (
                                <div className="h-48 w-full relative">
                                    <img src={room.images[0]} alt={room.name} className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                </div>
                            ) : (
                                <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-black/50" />
                            )}

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 flex justify-between items-center transition-colors">
                                    {room.name}
                                </h3>

                                {room.description && (
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{room.description}</p>
                                )}

                                <div className="space-y-1 text-sm text-muted-foreground font-mono mb-6">
                                    <div className="flex justify-between">
                                        <span>平日</span>
                                        <span className="text-foreground/80 font-bold">¥{room.pricing?.weekday?.slots?.[0]?.price || 0}/h~</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>土日祝</span>
                                        <span className="text-foreground/80 font-bold">¥{room.pricing?.saturday?.slots?.[0]?.price || 0}/h~</span>
                                    </div>
                                </div>

                                <Link href={`/studios/${id}/rooms/${i}`} className="block">
                                    <Button className="w-full bg-cyan-900/10 border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 font-bold tracking-widest transition-all">
                                        予約・空き状況 &gt;
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-muted-foreground">ルーム情報なし</div>
                    )}
                </div>

                {/* Map Section */}
                {studio.designSettings?.showMap && studio.address && (
                    <div className="mt-16 mb-8 max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 drop-shadow-md">
                            <span className="bg-cyan-500 w-1 h-6 rounded-full inline-block"></span>
                            アクセスマップ
                        </h3>
                        <StudioMap address={studio.address} />
                        <p className="mt-2 text-sm text-muted-foreground text-right">{studio.address}</p>
                    </div>
                )}
            </section>

            <footer className="border-t border-border py-10 text-center text-muted-foreground text-sm bg-card/20 italic font-mono uppercase tracking-widest">
                © 2026 {studio.storeName} // POWERED_BY_STUDI_GO
            </footer>
        </main >
    );
}
