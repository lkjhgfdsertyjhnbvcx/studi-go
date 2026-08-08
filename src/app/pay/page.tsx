"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PayContent() {
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [splitMode, setSplitMode] = useState<string | null>(null);
    const [memberCount, setMemberCount] = useState(2);
    const [optionSplit, setOptionSplit] = useState<string | null>(null);
    const [optionPayer, setOptionPayer] = useState(1);
    const [splitBookingId, setSplitBookingId] = useState<string | null>(null);
    const [splitShareUrl, setSplitShareUrl] = useState<string | null>(null);
    const [splitCopied, setSplitCopied] = useState(false);

    // 割り勘決済の可否。呼び出し元（/studio/[id]）がプランを見て付ける。
    // 指定が無い場合（既存リンク・直リンク）は従来どおり許可する。
    const splitAllowed = (searchParams.get("split") ?? "1") !== "0";
    const studioId = searchParams.get("studioId") || "";
    const studioName = searchParams.get("studioName") || "スタジオ";
    const roomId = searchParams.get("roomId") || "";
    const roomName = searchParams.get("roomName") || "部屋";
    const date = searchParams.get("date") || "";
    const startTime = searchParams.get("startTime") || "";
    const durationHours = parseInt(searchParams.get("durationHours") || "1") || 1;
    const totalPrice = parseInt(searchParams.get("total") || "0") || 0;
    const optionNames = (searchParams.get("options") || "").split(",").filter(Boolean);
    const optionPrices = (searchParams.get("optionPrices") || "").split(",").map(Number).filter(n => n > 0);
    const totalOptionPrice = optionPrices.reduce((a, b) => a + b, 0);
    const roomPrice = totalPrice - totalOptionPrice;

    const endTime = (() => {
        if (!startTime) return "";
        const [h, m] = startTime.split(":").map(Number);
        return String(h + durationHours).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    })();

    // 分割払い金額計算（最後の人が端数を負担して合計が必ず一致するように）
    const getMemberAmount = (idx: number) => {
        const baseRoom = Math.floor(roomPrice / memberCount);
        const roomRemainder = roomPrice - baseRoom * memberCount;
        // 端数は最初の人(idx===1)が負担
        const roomShare = baseRoom + (idx === 1 ? roomRemainder : 0);

        if (optionSplit === "together") {
            const baseOpt = Math.floor(totalOptionPrice / memberCount);
            const optRemainder = totalOptionPrice - baseOpt * memberCount;
            return roomShare + baseOpt + (idx === 1 ? optRemainder : 0);
        }
        if (optionSplit === "specific" && idx === optionPayer) return roomShare + totalOptionPrice;
        return roomShare;
    };

    const needsOptionSplit = optionNames.length > 0 && optionSplit === null;

    // 通常決済 or 割り勘1人目
    const handlePay = async (amount?: number, isSplitFirst = false) => {
        setIsProcessing(true);
        setError("");
        try {
            const userId = localStorage.getItem("userId") || "guest";
            const userEmail = localStorage.getItem("userEmail") || "";
            const payAmount = amount !== undefined ? amount : totalPrice;
            const res = await fetch("/api/stripe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studioId, studioName, roomId, roomName, date, startTime, durationHours,
                    totalPrice: payAmount,
                    splitTotal: isSplitFirst ? totalPrice : undefined,
                    splitMemberCount: isSplitFirst ? memberCount : undefined,
                    splitPerson: isSplitFirst ? 1 : undefined,
                    userId, userEmail,
                }),
            });
            const data = await res.json();
            if (data.sessionUrl) {
                if (isSplitFirst && data.bookingId) {
                    // 割り勘シェアURLを生成してlocalStorageに保存（success後に表示）
                    const base = window.location.origin;
                    const params = new URLSearchParams({ studioId, studioName, roomId, roomName, date, startTime, durationHours: String(durationHours), total: String(totalPrice), options: searchParams.get("options") || "", optionPrices: searchParams.get("optionPrices") || "", splitBookingId: data.bookingId, memberCount: String(memberCount) });
                    const shareUrl = `${base}/pay/split-join?${params.toString()}`;
                    localStorage.setItem(`splitShare_${data.bookingId}`, shareUrl);
                }
                window.location.href = data.sessionUrl;
            } else {
                setError(data.error || "決済セッションの作成に失敗しました。");
                setIsProcessing(false);
            }
        } catch (e) {
            setError("通信エラーが発生しました。");
            setIsProcessing(false);
        }
    };

    // 割り勘シェアURLをコピー
    const handleCopyShareUrl = async () => {
        if (!splitShareUrl) return;
        try { await navigator.clipboard.writeText(splitShareUrl); } catch { }
        setSplitCopied(true);
        setTimeout(() => setSplitCopied(false), 3000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <p className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-2">お支払い</p>
                    <h1 className="text-2xl font-black text-foreground">予約内容の確認</h1>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 mb-6 space-y-3">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">予約詳細</p>
                    {[{label:"スタジオ",value:studioName},{label:"部屋",value:roomName},{label:"日付",value:date},{label:"時間",value:startTime+"〜"+endTime+" ("+durationHours+"時間)"}].map((item,i)=>(
                        <div key={i} className="flex justify-between text-sm border-b border-border pb-2">
                            <span className="text-muted-foreground font-bold">{item.label}</span>
                            <span className="text-foreground font-black">{item.value}</span>
                        </div>
                    ))}
                    {optionNames.length > 0 && (
                        <div className="border-b border-border pb-2">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground font-bold">オプション</span>
                                <span className="text-foreground font-black">{"¥"+totalOptionPrice.toLocaleString()}</span>
                            </div>
                            {optionNames.map((name,i)=>(
                                <div key={i} className="flex justify-between text-xs pl-2">
                                    <span className="text-gray-600">{"• "+name}</span>
                                    <span className="text-muted-foreground">{"¥"+(optionPrices[i]||0).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between items-baseline pt-2">
                        <span className="text-muted-foreground font-bold text-sm">合計</span>
                        <span className="text-3xl font-black text-purple-400">{"¥"+totalPrice.toLocaleString()}</span>
                    </div>
                </div>

                {error && <div className="bg-red-900/30 border border-red-700 rounded-xl p-3 mb-4 text-red-400 text-xs font-bold text-center">{error}</div>}

                {splitMode === null && (
                    <div>
                        <button onClick={()=>handlePay()} disabled={isProcessing} className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-lg text-white transition-all mb-3">
                            {isProcessing ? "処理中..." : "決済する →"}
                        </button>
                        {splitAllowed && (
                            <button onClick={()=>setSplitMode("choose")} className="w-full py-4 bg-accent/20 hover:bg-accent/30 border border-border rounded-2xl font-black text-sm text-muted-foreground transition-all">
                                👥 メンバーで割り勘する
                            </button>
                        )}
                    </div>
                )}

                {splitMode === "choose" && (
                    <div className="space-y-4">
                        <div className="bg-card border border-border rounded-2xl p-4">
                            <p className="text-muted-foreground text-xs font-bold mb-3">人数を設定</p>
                            <div className="flex items-center justify-center gap-6">
                                <button onClick={()=>setMemberCount(Math.max(2,memberCount-1))} className="w-10 h-10 bg-accent/20 hover:bg-accent/30 rounded-full font-black text-xl text-foreground">−</button>
                                <div className="text-center">
                                    <span className="text-4xl font-black text-foreground">{memberCount}</span>
                                    <p className="text-muted-foreground text-xs">人</p>
                                </div>
                                <button onClick={()=>setMemberCount(memberCount+1)} className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full font-black text-xl text-white">＋</button>
                            </div>
                            <p className="text-center text-purple-400 text-sm font-black mt-3">{"1人あたり約 ¥"+Math.ceil(totalPrice/memberCount).toLocaleString()}</p>
                        </div>
                        <button onClick={()=>setSplitMode("individual")} className="w-full py-5 bg-card hover:bg-accent/20 border border-purple-700 rounded-2xl text-left px-5">
                            <p className="font-black text-foreground text-sm">💳 それぞれ個別に支払う</p>
                            <p className="text-muted-foreground text-xs mt-1">1人ずつ決済</p>
                        </button>
                        <button onClick={()=>setSplitMode("representative")} className="w-full py-5 bg-card hover:bg-accent/20 border border-border rounded-2xl text-left px-5">
                            <p className="font-black text-foreground text-sm">🧾 代表者が全額払う</p>
                            <p className="text-muted-foreground text-xs mt-1">後で精算メモを表示</p>
                        </button>
                        <button onClick={()=>setSplitMode(null)} className="w-full py-3 text-muted-foreground text-xs font-bold hover:text-foreground">← 戻る</button>
                    </div>
                )}

                {(splitMode==="individual"||splitMode==="representative") && needsOptionSplit && (
                    <div className="space-y-3">
                        <p className="text-center text-muted-foreground text-sm font-bold mb-2">{"オプション料金(¥"+totalOptionPrice.toLocaleString()+")の負担は？"}</p>
                        <button onClick={()=>setOptionSplit("together")} className="w-full py-4 bg-card hover:bg-accent/20 border border-purple-700 rounded-2xl text-left px-5">
                            <p className="font-black text-foreground text-sm">👫 全員で均等に割る</p>
                            <p className="text-muted-foreground text-xs mt-1">{"各自 +¥"+Math.ceil(totalOptionPrice/memberCount).toLocaleString()}</p>
                        </button>
                        <button onClick={()=>setOptionSplit("specific")} className="w-full py-4 bg-card hover:bg-accent/20 border border-border rounded-2xl text-left px-5">
                            <p className="font-black text-foreground text-sm">👤 使用した人が全額負担</p>
                            <p className="text-muted-foreground text-xs mt-1">{"¥"+totalOptionPrice.toLocaleString()+" を1人が払う"}</p>
                        </button>
                        <button onClick={()=>setSplitMode("choose")} className="w-full py-3 text-muted-foreground text-xs font-bold hover:text-foreground">← 戻る</button>
                    </div>
                )}

                {(splitMode==="individual"||splitMode==="representative") && optionSplit==="specific" && !needsOptionSplit && (
                    <div className="space-y-3 mb-4">
                        <p className="text-center text-muted-foreground text-xs font-bold">オプションを使用したメンバーは？</p>
                        <div className="grid grid-cols-4 gap-2">
                            {Array.from({length:memberCount},(_,i)=>i+1).map(n=>(
                                <button key={n} onClick={()=>setOptionPayer(n)} className={"py-3 rounded-xl font-black text-sm "+(optionPayer===n?"bg-purple-600 text-white":"bg-accent/20 text-muted-foreground hover:bg-accent/30")}>
                                    {n+"人目"}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {splitMode==="individual" && !needsOptionSplit && (
                    <div className="space-y-4">
                        <div className="bg-card border border-border rounded-2xl p-4">
                            <p className="text-muted-foreground text-xs font-bold mb-3">各自の支払い金額</p>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {Array.from({length:memberCount},(_,i)=>i+1).map(n=>(
                                    <div key={n} className="flex justify-between items-center py-1 border-b border-border last:border-0">
                                        <span className="text-sm font-bold text-foreground">{n+"人目"}{n===1?" (あなた)":""}</span>
                                        <span className="text-purple-400 font-black">{"¥"+getMemberAmount(n).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700/50 rounded-2xl p-3 text-xs text-purple-300 font-bold">
                            💡 あなたが先に決済→シェアリンクを2人目以降に送ってください（ログイン必須）
                        </div>
                        <button onClick={()=>handlePay(getMemberAmount(1), true)} disabled={isProcessing} className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-lg text-white transition-all">
                            {isProcessing ? "処理中..." : "1人目の決済へ → ¥"+getMemberAmount(1).toLocaleString()}
                        </button>
                        <button onClick={()=>{setOptionSplit(null);setSplitMode("choose");}} className="w-full py-3 text-muted-foreground text-xs font-bold hover:text-foreground">← 戻る</button>
                    </div>
                )}

                {splitMode==="representative" && !needsOptionSplit && (
                    <div className="space-y-4">
                        <div className="bg-card border border-border rounded-2xl p-4">
                            <p className="text-muted-foreground text-xs font-bold mb-2">精算メモ</p>
                            <div className="flex justify-between items-center py-2 border-b border-border">
                                <span className="text-sm font-bold text-foreground">合計</span>
                                <span className="text-foreground font-black">{"¥"+totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="space-y-1 mt-2 max-h-40 overflow-y-auto">
                                {Array.from({length:memberCount},(_,i)=>i+1).map(n=>(
                                    <div key={n} className="flex justify-between items-center py-1">
                                        <span className="text-sm text-muted-foreground">{n+"人目の負担"}</span>
                                        <span className="text-purple-400 font-black">{"¥"+getMemberAmount(n).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={()=>handlePay()} disabled={isProcessing} className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-2xl font-black text-lg text-white transition-all">
                            {isProcessing ? "処理中..." : "全額決済する → ¥"+totalPrice.toLocaleString()}
                        </button>
                        <button onClick={()=>{setOptionSplit(null);setSplitMode("choose");}} className="w-full py-3 text-muted-foreground text-xs font-bold hover:text-foreground">← 戻る</button>
                    </div>
                )}

                <p className="text-center text-gray-600 text-xs font-bold mt-4">安全な決済画面に移動します</p>
                <div className="text-center mt-4">
                    <a href={"/studio/"+studioId} className="text-muted-foreground text-xs font-bold hover:text-foreground">← 予約に戻る</a>
                </div>
            </div>
        </div>
    );
}

export default function PayPage() {
    return <Suspense fallback={null}><PayContent /></Suspense>;
}
