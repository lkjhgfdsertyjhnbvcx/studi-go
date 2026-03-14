"use client";
import { useState, useEffect } from "react";
interface Affiliate { id: string; name: string; url: string; imageUrl: string; description: string; }
interface AdSettings {
    enabled: boolean; provider: "adsense" | "custom" | "affiliate";
    adsenseClientId: string; adsenseSlotId: string; customHtml: string;
    affiliates: Affiliate[];
    placement: { paymentSuccess: boolean; studioDetail: boolean; mypage: boolean; };
}
const def: AdSettings = { enabled: false, provider: "adsense", adsenseClientId: "", adsenseSlotId: "", customHtml: "", affiliates: [], placement: { paymentSuccess: true, studioDetail: false, mypage: false } };
export default function AdsPage() {
    const [s, setS] = useState<AdSettings>(def);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => { fetch("/api/admin/ads").then(r=>r.json()).then(d=>{ if(!d.error) setS({...def,...d}); }).catch(()=>{}).finally(()=>setLoading(false)); }, []);
    const save = async () => { await fetch("/api/admin/ads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}); setSaved(true); setTimeout(()=>setSaved(false),2000); };
    const u = (k: keyof AdSettings, v: any) => setS(p=>({...p,[k]:v}));
    const up = (k: keyof AdSettings["placement"], v: boolean) => setS(p=>({...p,placement:{...p.placement,[k]:v}}));
    const addAff = () => setS(p=>({...p,affiliates:[...p.affiliates,{id:crypto.randomUUID(),name:"",url:"",imageUrl:"",description:""}]}));
    const updAff = (id: string, f: string, v: string) => setS(p=>({...p,affiliates:p.affiliates.map(a=>a.id===id?{...a,[f]:v}:a)}));
    const delAff = (id: string) => setS(p=>({...p,affiliates:p.affiliates.filter(a=>a.id!==id)}));
    const Toggle = ({on, onClick}: {on:boolean, onClick:()=>void}) => (
        <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all shrink-0 ${on?"bg-purple-600":"bg-gray-300"}`} onClick={onClick}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on?"left-7":"left-1"}`}/>
        </div>
    );
    if (loading) return <div className="p-8 text-muted-foreground">読み込み中...</div>;
    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-black text-foreground">広告・アフィリエイト管理</h1>
                <p className="text-muted-foreground text-sm mt-1">決済完了画面などに表示する広告を設定します</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-black text-foreground mb-4">広告表示</h2>
                <div className="flex items-center gap-3"><Toggle on={s.enabled} onClick={()=>u("enabled",!s.enabled)}/><span className="text-sm font-bold text-foreground">{s.enabled?"広告を表示する":"広告を表示しない"}</span></div>
            </div>
            {s.enabled && (<>
                <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                    <h2 className="font-black text-foreground">広告の種類</h2>
                    {[{value:"adsense",label:"Google AdSense",desc:"Googleの広告ネットワーク（推奨）"},{value:"affiliate",label:"アフィリエイト",desc:"提携先バナー・リンクを設置"},{value:"custom",label:"カスタムHTML",desc:"任意の広告コードを直接入力"}].map(opt=>(
                        <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${s.provider===opt.value?"border-purple-500 bg-purple-500/10":"border-border"}`}>
                            <input type="radio" name="provider" checked={s.provider===opt.value} onChange={()=>u("provider",opt.value)} className="mt-1 accent-purple-500"/>
                            <div><p className="font-bold text-sm text-foreground">{opt.label}</p><p className="text-xs text-muted-foreground">{opt.desc}</p></div>
                        </label>
                    ))}
                </div>
                {s.provider==="adsense" && (
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h2 className="font-black text-foreground">Google AdSense設定</h2>
                        <div><label className="text-xs font-black text-muted-foreground uppercase">クライアントID</label>
                        <input type="text" value={s.adsenseClientId} onChange={e=>u("adsenseClientId",e.target.value)} placeholder="ca-pub-0000000000000000" className="w-full mt-1 p-3 bg-accent/10 border border-border rounded-xl text-sm text-foreground outline-none focus:border-purple-500 font-mono"/></div>
                        <div><label className="text-xs font-black text-muted-foreground uppercase">広告スロットID</label>
                        <input type="text" value={s.adsenseSlotId} onChange={e=>u("adsenseSlotId",e.target.value)} placeholder="0000000000" className="w-full mt-1 p-3 bg-accent/10 border border-border rounded-xl text-sm text-foreground outline-none focus:border-purple-500 font-mono"/></div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-xs text-blue-400 space-y-1">
                            <p className="font-black">AdSense設定手順</p>
                            <p>1. Google AdSenseにサインアップしてサイトを登録</p>
                            <p>2. 審査承認後、クライアントIDとスロットIDを入力して保存</p>
                        </div>
                    </div>
                )}
                {s.provider==="affiliate" && (
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-foreground">アフィリエイト設定</h2>
                            <button onClick={addAff} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-xl transition-all">+ 追加</button>
                        </div>
                        {s.affiliates.length===0 && <p className="text-muted-foreground text-sm text-center py-4">アフィリエイトを追加してください</p>}
                        {s.affiliates.map((aff,i)=>(
                            <div key={aff.id} className="border border-border rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-black text-muted-foreground uppercase">広告 {i+1}</p>
                                    <button onClick={()=>delAff(aff.id)} className="text-xs text-red-400 hover:text-red-300 font-bold">削除</button>
                                </div>
                                <input type="text" placeholder="広告名（例：楽器レンタルサービス）" value={aff.name} onChange={e=>updAff(aff.id,"name",e.target.value)} className="w-full p-2 bg-accent/10 border border-border rounded-lg text-sm text-foreground outline-none focus:border-purple-500"/>
                                <input type="text" placeholder="アフィリエイトURL" value={aff.url} onChange={e=>updAff(aff.id,"url",e.target.value)} className="w-full p-2 bg-accent/10 border border-border rounded-lg text-sm text-foreground outline-none focus:border-purple-500 font-mono"/>
                                <input type="text" placeholder="バナー画像URL（任意）" value={aff.imageUrl} onChange={e=>updAff(aff.id,"imageUrl",e.target.value)} className="w-full p-2 bg-accent/10 border border-border rounded-lg text-sm text-foreground outline-none focus:border-purple-500 font-mono"/>
                                <input type="text" placeholder="説明文（任意）" value={aff.description} onChange={e=>updAff(aff.id,"description",e.target.value)} className="w-full p-2 bg-accent/10 border border-border rounded-lg text-sm text-foreground outline-none focus:border-purple-500"/>
                                {aff.url && <div className="bg-accent/10 rounded-lg p-3"><p className="text-xs text-muted-foreground mb-2">プレビュー</p>
                                    <a href={aff.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-all">
                                        {aff.imageUrl && <img src={aff.imageUrl} alt={aff.name} className="w-16 h-10 object-cover rounded"/>}
                                        <div><p className="text-sm font-bold text-foreground">{aff.name||"広告名未設定"}</p>{aff.description&&<p className="text-xs text-muted-foreground">{aff.description}</p>}</div>
                                    </a></div>}
                            </div>
                        ))}
                    </div>
                )}
                {s.provider==="custom" && (
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h2 className="font-black text-foreground">カスタム広告HTML</h2>
                        <textarea value={s.customHtml} onChange={e=>u("customHtml",e.target.value)} placeholder="広告コードを貼り付けてください" rows={8} className="w-full p-3 bg-accent/10 border border-border rounded-xl text-sm text-foreground outline-none focus:border-purple-500 font-mono resize-none"/>
                    </div>
                )}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="font-black text-foreground">表示場所</h2>
                    {[{key:"paymentSuccess" as const,label:"決済完了画面",desc:"予約・決済完了後"},{key:"studioDetail" as const,label:"スタジオ詳細ページ",desc:"詳細ページ下部"},{key:"mypage" as const,label:"マイページ",desc:"ユーザーマイページ"}].map(item=>(
                        <div key={item.key} className="flex items-center justify-between">
                            <div><p className="text-sm font-bold text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                            <Toggle on={s.placement[item.key]} onClick={()=>up(item.key,!s.placement[item.key])}/>
                        </div>
                    ))}
                </div>
            </>)}
            <button onClick={save} className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${saved?"bg-green-500 text-white":"bg-purple-600 hover:bg-purple-500 text-white"}`}>
                {saved?"✓ 保存しました":"保存する"}
            </button>
        </div>
    );
}
