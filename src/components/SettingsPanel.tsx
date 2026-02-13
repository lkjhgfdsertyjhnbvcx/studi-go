"use client";

import React from "react";
import { useTheme, ThemeColor } from "@/lib/theme-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const SettingsPanel = () => {
    const {
        primaryColor,
        gravityStrength,
        backgroundImage,
        backgroundColor,
        logoUrl,
        setPrimaryColor,
        setGravityStrength,
        setBackgroundImage,
        setBackgroundColor,
        setLogoUrl
    } = useTheme();

    return (
        <Card className="fixed top-24 right-4 w-80 bg-black/80 backdrop-blur-md border-white/20 shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
            <CardHeader>
                <CardTitle className="text-white text-lg">スタジオ設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Color Theme */}
                <div className="space-y-2">
                    <Label className="text-gray-300">テーマカラー ({primaryColor})</Label>
                    <div className="flex gap-2">
                        {(["neon", "red", "blue"] as ThemeColor[]).map((color) => (
                            <button
                                key={color}
                                onClick={() => setPrimaryColor(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${primaryColor === color ? "border-white scale-110" : "border-transparent opacity-50"
                                    }`}
                                style={{
                                    backgroundColor: color === 'neon' ? '#00ffcc' : color === 'red' ? '#ff0055' : '#00ccff'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Gravity Control */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label className="text-gray-300">重力: {gravityStrength.toFixed(1)}</Label>
                        <span className="text-xs text-xs text-gray-500">{gravityStrength < 0.5 ? "宇宙モード" : "通常"}</span>
                    </div>
                    <Slider
                        value={[gravityStrength]}
                        min={0.1}
                        max={2}
                        step={0.1}
                        onValueChange={(val) => setGravityStrength(val[0])}
                        className="[&_.bg-primary]:bg-white"
                    />
                </div>

                {/* Custom Branding */}
                <div className="space-y-4 border-t border-white/10 pt-4">
                    <Label className="text-gray-300 font-bold">店舗カスタマイズ</Label>

                    <div className="space-y-2">
                        <Label className="text-xs text-gray-400">背景色 (HEX)</Label>
                        <div className="flex gap-2">
                            <Input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="w-10 h-10 p-1 bg-transparent border-white/20"
                            />
                            <Input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="flex-1 bg-slate-800 text-xs border-white/20 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-gray-400">背景画像 URL</Label>
                        <Input
                            type="text"
                            placeholder="https://..."
                            value={backgroundImage || ""}
                            onChange={(e) => setBackgroundImage(e.target.value || null)}
                            className="bg-slate-800 text-xs border-white/20 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-gray-400">店舗ロゴ URL</Label>
                        <Input
                            type="text"
                            placeholder="https://..."
                            value={logoUrl || ""}
                            onChange={(e) => setLogoUrl(e.target.value || null)}
                            className="bg-slate-800 text-xs border-white/20 text-white"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
