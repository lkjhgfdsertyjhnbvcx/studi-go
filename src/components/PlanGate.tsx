"use client";

import React from "react";
import { canUseFeature, getPlanInfo, type FeatureKey, type FeatureOverrides, type PlanKey, FEATURE_LABELS } from "@/lib/plan-features";

interface PlanGateProps {
    planKey: string | null | undefined;
    feature: FeatureKey;
    children: React.ReactNode;
    /** カスタムのロックメッセージ */
    message?: string;
    /** 店舗ごとの機能例外（studios.featureOverrides） */
    overrides?: FeatureOverrides | null;
}

/**
 * プラン機能ゲーティングコンポーネント
 * planKey に基づいて機能を制限し、ロック表示を行う
 */
export function PlanGate({ planKey, feature, children, message, overrides }: PlanGateProps) {
    const allowed = canUseFeature(planKey, feature, overrides);

    if (allowed) {
        return <>{children}</>;
    }

    // 使える最低プランを見つける
    const plans: PlanKey[] = ["free", "light", "standard", "pro"];
    const requiredPlan = plans.find(p => canUseFeature(p, feature));
    const info = getPlanInfo(requiredPlan);
    const featureLabel = FEATURE_LABELS[feature] || feature;

    return (
        <div className="relative">
            {/* ブラーされたコンテンツ */}
            <div className="pointer-events-none select-none opacity-30 blur-[2px]">
                {children}
            </div>
            {/* ロックオーバーレイ */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-6 text-center max-w-xs shadow-xl">
                    <div className="text-3xl mb-2">🔒</div>
                    <p className="font-black text-foreground text-sm mb-1">
                        {message || `「${featureLabel}」は${info.name}プラン以上で利用可能です`}
                    </p>
                    <p className="text-muted-foreground text-xs">
                        プラン設定タブからアップグレードしてください
                    </p>
                    <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: info.color }}>
                        {info.emoji} {info.name}プラン〜
                    </div>
                </div>
            </div>
        </div>
    );
}
