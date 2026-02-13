"use client";

import React, { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { useWindowSize } from "@/hooks/use-window-size"; // I might need to create this hook or just use window directly inside effect

const COLORS = {
    neon: "#00ffcc",
    red: "#ff0055",
    blue: "#00ccff",
};

interface PhysicsHeroProps {
    onBookingTrigger: () => void;
    studioName?: string;
    appealPoint?: string;
}

export const PhysicsHero: React.FC<PhysicsHeroProps> = ({ onBookingTrigger, studioName, appealPoint }) => {
    const { primaryColor, backgroundImage, backgroundColor, logoUrl, logoSize } = useTheme();

    const scrollToRooms = () => {
        const element = document.getElementById('rooms-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            className="relative w-full h-[600px] overflow-hidden border-b border-white/10"
            style={{
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 select-none p-4">
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt="Studio Logo"
                        style={{ height: `${128 * (logoSize / 100)}px` }}
                        className="mb-6 opacity-90 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] object-contain transition-all duration-300"
                    />
                ) : (
                    <></>
                )}

                <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6"
                    style={{ textShadow: `0 0 30px ${COLORS[primaryColor]}` }}>
                    {studioName || "予約受付"}
                </h1>

                {appealPoint && (
                    <p className="text-gray-200 text-lg md:text-2xl font-sans bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 shadow-2xl">
                        {appealPoint}
                    </p>
                )}
            </div>

            {/* Scroll Indicator */}
            <div
                onClick={scrollToRooms}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-cyan-400 cursor-pointer animate-bounce flex flex-col items-center z-20 transition-colors"
                role="button"
                aria-label="Scroll to rooms"
            >
                <span className="text-xs font-mono mb-2 tracking-widest uppercase">Select Room</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </div>
    );
};
