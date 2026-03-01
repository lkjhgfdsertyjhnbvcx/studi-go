"use client";

import React from "react";

export default function PhysicsHero({ 
  studioName, 
  primaryColor = "neon" 
}: { 
  studioName?: string; 
  primaryColor?: string 
}) {
  // 🌟 型エラーを回避するために COLORS を any として定義
  const COLORS: any = {
    neon: "#00f3ff",
    red: "#ff003c",
    blue: "#0066ff",
  };

  const selectedColor = COLORS[primaryColor] || COLORS.neon;

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
      <div className="relative z-10 text-center px-4">
        <h1 
          className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6"
          style={{ textShadow: `0 0 30px ${selectedColor}` }}
        >
          {studioName || "予約受付"}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium tracking-widest uppercase">
          Select Your Session
        </p>
      </div>
      
      {/* 背景の装飾的な要素 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${selectedColor} 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
