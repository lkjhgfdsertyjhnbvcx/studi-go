"use client";
import React, { useEffect, useState } from "react";

const PLANS: Record<string, { name: string; price: number; color: string }> = {
    basic:    { name: "ベーシック",    price: 3000,  color: "#6b7280" },
    standard: { name: "スタンダード",  price: 8000,  color: "#7c3aed" },
    premium:  { name: "プレミアム",    price: 15000, color: "#f59e0b" },
};
const PLAN_OPTIONS = [
    { key: "sms",           name: "SMS通知",         price: 1000 },
    { key: "custom_domain", name: "カスタムドメイン", price: 2000 },
    { key: "api_access",    name: "API連携",          price: 3000 },
];

interface EditForm {
    studioId: string;
    storeName: string;
    planKey: string;
    planOptions: string[];
    planPayMethod: string;
    planTrialDays: number;
}

export default function PlansPage() {
    const [studios, setStudios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    // 編集モーダル
    const [editForm, setEditForm] = useState<EditForm | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");

    const loadStudios = () => {
        fetch("/api/studios").then(r => r.json()).then(data => {
            setStudios(Array.isArray(data) ? data : data.studios || []);
            setLoading(false);
        });
    };

    useEffect(() => { loadStudios(); }, []);

    const withPlan = studios.filter(s => s.planKey);
    const withoutPlan = studios.filter(s => !s.planKey);
    const totalMRR = withPlan.reduce((sum, s) => {
        const plan = PLANS[s.planKey]?.price || 0;
        const opts = (s.planOptions || []).reduce((o: number, k: string) => {
            const prices: Record<string,number> = { sms:1000, custom_domain:2000, api_access:3000 };
            return o + (prices[k] || 0);
        }, 0);
        return sum + plan + opts;
    }, 0);

    const filtered = filter === "all" ? studios : filter === "active" ? withPlan : withoutPlan;

    const openEdit = (s: any) => {
        setEditForm({
            studioId: s.id,
            storeName: s.storeName,
            planKey: s.planKey || "",
            planOptions: s.planOptions || [],
            planPayMethod: s.planPayMethod || "invoice",
            planTrialDays: s.planTrialDays || 0,
        });
        setSaveMsg("");
    };

    const toggleOption = (key: string) => {
        if (!editForm) return;
        const opts = editForm.planOptions.includes(key)
            ? editForm.planOptions.filter(k => k !== key)
            : [...editForm.planOptions, key];
        setEditForm({ ...editForm, planOptions: opts });
    };

    const handleSave = async () => {
        if (!editForm) return;
        setSaving(true);
        setSaveMsg("");
        try {
            const res = await fetch("/api/admin/plans", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "保存失敗");
            setSaveMsg("✅ 保存しました");
            // ローカルのstudioリストも更新
            setStudios(prev => prev.map(s =>
                s.id === editForm.studioId
                    ? { ...s, planKey: editForm.planKey || null, planOptions: editForm.planOptions, planPayMethod: editForm.planPayMethod, planTrialDays: editForm.planTrialDays, planUpdatedAt: new Date().toISOString() }
                    : s
            ));
            setTimeout(() => setEditForm(null), 800);
        } catch (e: any) {
            setSaveMsg("❌ " + e.message);
        } finally {
            setSaving(false);
        }
    };

    const calcMonthly = (planKey: string, opts: string[]) => {
        const base = PLANS[planKey]?.price || 0;
        const optTotal = opts.reduce((s, k) => {
            const p = PLAN_OPTIONS.find(o => o.key === k)?.price || 0;
            return s + p;
        }, 0);
        return base + optTotal;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-foreground">プラン管理</h1>
                <p className="text-muted-foreground text-sm mt-1">店舗のプラン契約状況の確認・編集</p>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "月間収益 (MRR)", value: `¥${totalMRR.toLocaleString()}`, sub: "契約中プラン合計", color: "text-green-500" },
                    { label: "契約店舗数", value: withPlan.length, sub: `全${studios.length}店舗中`, color: "text-purple-500" },
                    { label: "未契約店舗", value: withoutPlan.length, sub: "プラン未設定", color: "text-orange-500" },
                    { label: "契約率", value: studios.length ? `${Math.round(withPlan.length/studios.length*100)}%` : "0%", sub: "プラン設定済み", color: "text-blue-500" },
                ].map((kpi, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">{kpi.label}</p>
                        <p className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                    </div>
                ))}
            </div>

            {/* プラン別内訳 */}
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(PLANS).map(([key, plan]) => {
                    const count = withPlan.filter(s => s.planKey === key).length;
                    const revenue = count * plan.price;
                    return (
                        <div key={key} className="bg-card border border-border rounded-xl p-5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-black text-foreground">{plan.name}</span>
                                <span className="text-xs font-bold text-muted-foreground">¥{plan.price.toLocaleString()}/月</span>
                            </div>
                            <p className="text-2xl font-black" style={{color: plan.color}}>{count}店舗</p>
                            <p className="text-xs text-muted-foreground mt-1">月次収益: ¥{revenue.toLocaleString()}</p>
                        </div>
                    );
                })}
            </div>

            {/* 店舗一覧 */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                    <h2 className="font-black text-foreground">店舗一覧</h2>
                    <div className="flex gap-2">
                        {[["all","すべて"],["active","契約中"],["inactive","未契約"]].map(([v,l]) => (
                            <button key={v} onClick={() => setFilter(v)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter===v ? "bg-purple-600 text-white" : "bg-accent/10 text-muted-foreground hover:text-foreground"}`}>
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">読み込み中...</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-accent/5">
                            <tr>
                                {["店舗名","プラン","オプション","月額","支払方法","契約日",""].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map(s => {
                                const plan = PLANS[s.planKey];
                                const optTotal = (s.planOptions || []).reduce((sum: number, k: string) => {
                                    const prices: Record<string,number> = { sms:1000, custom_domain:2000, api_access:3000 };
                                    return sum + (prices[k] || 0);
                                }, 0);
                                const monthly = plan ? plan.price + optTotal : 0;
                                return (
                                    <tr key={s.id} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-bold text-foreground text-sm">{s.storeName}</p>
                                            <p className="text-xs text-muted-foreground">{s.email}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            {plan ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{backgroundColor: plan.color}}>
                                                    {plan.name}
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-500/20 text-gray-500">未契約</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(s.planOptions || []).map((k: string) => {
                                                    const opt = PLAN_OPTIONS.find(o => o.key === k);
                                                    return <span key={k} className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs">{opt?.name || k}</span>;
                                                })}
                                                {(!s.planOptions || s.planOptions.length === 0) && <span className="text-xs text-muted-foreground">—</span>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 font-black text-foreground">
                                            {monthly > 0 ? `¥${monthly.toLocaleString()}` : "—"}
                                        </td>
                                        <td className="px-5 py-4 text-xs text-muted-foreground">
                                            {s.planPayMethod === "stripe" ? "💳 カード" : s.planPayMethod === "invoice" ? "🧾 請求書" : "—"}
                                        </td>
                                        <td className="px-5 py-4 text-xs text-muted-foreground">
                                            {s.planUpdatedAt ? new Date(s.planUpdatedAt).toLocaleDateString("ja-JP") : "—"}
                                        </td>
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => openEdit(s)}
                                                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-all"
                                            >
                                                編集
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 編集モーダル */}
            {editForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-black text-foreground mb-1">プラン編集</h2>
                        <p className="text-sm text-muted-foreground mb-6">{editForm.storeName}</p>

                        {/* プラン選択 */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">契約プラン</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setEditForm({ ...editForm, planKey: "" })}
                                    className={`py-2.5 px-3 rounded-xl text-sm font-bold border-2 transition-all ${!editForm.planKey ? "border-gray-500 bg-gray-500/10 text-gray-400" : "border-border text-muted-foreground hover:border-gray-400"}`}
                                >
                                    未契約
                                </button>
                                {Object.entries(PLANS).map(([key, plan]) => (
                                    <button
                                        key={key}
                                        onClick={() => setEditForm({ ...editForm, planKey: key })}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-bold border-2 transition-all ${editForm.planKey === key ? "text-white border-transparent" : "border-border text-muted-foreground hover:border-purple-400"}`}
                                        style={editForm.planKey === key ? { backgroundColor: plan.color, borderColor: plan.color } : {}}
                                    >
                                        {plan.name}
                                        <span className="block text-xs font-normal opacity-80">¥{plan.price.toLocaleString()}/月</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* オプション */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">オプション</label>
                            <div className="space-y-2">
                                {PLAN_OPTIONS.map(opt => (
                                    <label key={opt.key} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-accent/10 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={editForm.planOptions.includes(opt.key)}
                                            onChange={() => toggleOption(opt.key)}
                                            className="w-4 h-4 accent-purple-600"
                                        />
                                        <span className="text-sm text-foreground flex-1">{opt.name}</span>
                                        <span className="text-xs text-muted-foreground">+¥{opt.price.toLocaleString()}/月</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 支払方法 */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">支払方法</label>
                            <div className="flex gap-3">
                                {[["invoice","🧾 請求書払い"],["stripe","💳 クレジットカード"]].map(([v,l]) => (
                                    <button
                                        key={v}
                                        onClick={() => setEditForm({ ...editForm, planPayMethod: v })}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${editForm.planPayMethod === v ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-border text-muted-foreground hover:border-purple-400"}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 無料期間 */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                初回無料期間
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    min={0}
                                    max={365}
                                    value={editForm.planTrialDays}
                                    onChange={e => setEditForm({ ...editForm, planTrialDays: Math.max(0, parseInt(e.target.value) || 0) })}
                                    className="w-24 px-3 py-2 rounded-xl border border-border bg-background text-foreground text-center font-black text-lg focus:outline-none focus:border-purple-500"
                                />
                                <span className="text-sm text-muted-foreground">日間無料</span>
                                <div className="flex gap-1 ml-auto">
                                    {[0, 30, 60, 90].map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setEditForm({ ...editForm, planTrialDays: d })}
                                            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${editForm.planTrialDays === d ? "bg-purple-600 text-white" : "bg-accent/10 text-muted-foreground hover:text-foreground"}`}
                                        >
                                            {d === 0 ? "なし" : `${d}日`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {editForm.planTrialDays > 0 && (
                                <p className="text-xs text-purple-400 mt-2">
                                    ✓ 契約後{editForm.planTrialDays}日間（約{Math.round(editForm.planTrialDays/30)}ヶ月）は無料、その後自動課金開始
                                </p>
                            )}
                        </div>

                        {/* 月額プレビュー */}
                        {editForm.planKey && (
                            <div className="mb-5 p-3 bg-accent/10 rounded-xl flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">月額合計</span>
                                <span className="text-xl font-black text-foreground">
                                    ¥{calcMonthly(editForm.planKey, editForm.planOptions).toLocaleString()}
                                </span>
                            </div>
                        )}

                        {saveMsg && (
                            <p className="text-sm font-bold mb-4 text-center" style={{ color: saveMsg.startsWith("✅") ? "#22c55e" : "#ef4444" }}>{saveMsg}</p>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditForm(null)}
                                className="flex-1 py-3 rounded-xl border border-border text-muted-foreground font-bold text-sm hover:bg-accent/10 transition-all"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all disabled:opacity-60"
                            >
                                {saving ? "保存中..." : "保存する"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
