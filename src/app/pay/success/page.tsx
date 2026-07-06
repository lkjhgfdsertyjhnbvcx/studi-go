"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DOMPurify from "dompurify";

interface AdSettings {
    enabled: boolean; provider: "adsense" | "custom" | "affiliate";
    adsenseClientId: string; adsenseSlotId: string; customHtml: string;
    affiliates: { id: string; name: string; url: string; imageUrl: string; description: string }[];
    placement: { paymentSuccess: boolean; studioDetail: boolean; mypage: boolean; };
}

function AdBanner({ settings }: { settings: AdSettings | null }) {
    if (!settings?.enabled || !settings.placement.paymentSuccess) return null;
    if (settings.provider === "adsense" && settings.adsenseClientId && settings.adsenseSlotId) {
        return (
            <div className="w-full bg-card border border-border rounded-2xl p-4 overflow-hidden">
                <p className="text-xs text-muted-foreground mb-2 text-center">広告</p>
                <ins className="adsbygoogle block" data-ad-client={settings.adsenseClientId} data-ad-slot={settings.adsenseSlotId} data-ad-format="auto" data-full-width-responsive="true" style={{display:"block"}}/>
            </div>
        );
    }
    if (settings.provider === "affiliate" && settings.affiliates.length > 0) {
        return (
            <div className="w-full bg-card border border-border rounded-2xl p-4 space-y-3">
                <p className="text-xs text-muted-foreground text-center">スポンサー</p>
                {settings.affiliates.map(aff => (
                    <a key={aff.id} href={aff.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:opacity-80 transition-all p-2 rounded-xl hover:bg-accent/10">
                        {aff.imageUrl && <img src={aff.imageUrl} alt={aff.name} className="w-16 h-10 object-cover rounded"/>}
                        <div><p className="text-sm font-bold text-foreground">{aff.name}</p>{aff.description && <p className="text-xs text-muted-foreground">{aff.description}</p>}</div>
                    </a>
                ))}
            </div>
        );
    }
    if (settings.provider === "custom" && settings.customHtml) {
        return (
            <div className="w-full bg-card border border-border rounded-2xl p-4"
                dangerouslySetInnerHTML={{ __html: typeof window === "undefined" ? "" : DOMPurify.sanitize(settings.customHtml) }} />
        );
    }
    return null;
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
    const [adSettings, setAdSettings] = useState<AdSettings | null>(null);
    const [splitShareUrl, setSplitShareUrl] = useState<string | null>(null);
    const [splitCopied, setSplitCopied] = useState(false);
    useEffect(() => {
        fetch("/api/admin/ads").then(r=>r.json()).then(d=>{ if(!d.error) setAdSettings(d); }).catch(()=>{});
        // 割り勘シェアURLをlocalStorageから取得
        if (bookingId) {
            const url = localStorage.getItem(`splitShare_${bookingId}`);
            if (url) setSplitShareUrl(url);
        }
    }, [bookingId]);

    useEffect(() => {
        if (!bookingId) { setStatus("error"); return; }
        fetch("/api/bookings/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId }),
        })
        .then(r => r.json())
        .then(data => setStatus(data.ok ? "done" : "error"))
        .catch(() => setStatus("error"));
    }, [bookingId]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <div className="w-full max-w-md space-y-8">
                {status === "loading" && <p className="text-foreground font-black text-2xl animate-pulse text-center">確認中...</p>}
                {status === "done" && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <div>
                            <p className="text-foreground font-black text-2xl">予約・決済が完了しました</p>
                            <p className="text-muted-foreground text-sm mt-2">確認メールをお送りしました。</p>
                        </div>
                        {/* 割り勘シェアリンク */}
                        {splitShareUrl && (
                            <div className="bg-card border border-purple-700/50 rounded-2xl p-4 text-left">
                                <p className="text-purple-400 text-xs font-black mb-2">👥 2人目以降はこちらのリンクを送ってください</p>
                                <div className="flex gap-2">
                                    <input readOnly value={splitShareUrl} className="flex-1 bg-accent/10 border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono truncate"/>
                                    <button
                                        onClick={async () => {
                                            try { await navigator.clipboard.writeText(splitShareUrl); } catch {}
                                            setSplitCopied(true);
                                            setTimeout(() => setSplitCopied(false), 3000);
                                        }}
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-black text-white transition-all whitespace-nowrap"
                                    >
                                        {splitCopied ? "✓ コピー済" : "コピー"}
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3 justify-center">
                            <a href="/mypage" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-black text-white transition-all">マイページで確認</a>
                            <a href="/" className="px-6 py-3 bg-accent/20 hover:bg-accent/30 rounded-xl text-sm font-black text-foreground transition-all">トップに戻る</a>
                        </div>
                    </div>
                )}
                {status === "error" && (
                    <div className="text-center space-y-4">
                        <p className="text-foreground font-black text-xl">エラーが発生しました</p>
                        <a href="/mypage" className="inline-block px-6 py-3 bg-purple-600 rounded-xl text-sm font-black text-white">マイページで確認</a>
                    </div>
                )}
                <AdBanner settings={adSettings}/>
            </div>
        </div>
    );
}

export default function PaySuccessPage() {
    return <Suspense fallback={null}><SuccessContent /></Suspense>;
}