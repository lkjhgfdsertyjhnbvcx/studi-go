"use client";

import React from "react";
import { ThemeProvider } from "@/lib/theme-context";

// 🌟 複雑な読み込み処理をすべて排除し、確実に children を表示させる構造に変更
export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <main className="min-h-screen bg-white">
                {children}
            </main>
        </ThemeProvider>
    );
}
