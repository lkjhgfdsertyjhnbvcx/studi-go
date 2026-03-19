"use client";
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Save, X, GripVertical, Check } from "lucide-react";

// ---- Types ----
interface PlanDef {
    id: string;
    name: string;
    price: number;
    color: string;
    description: string;
    features: string[];
}
interface OptionDef {
    id: string;
    name: string;
    price: number;
}
interface PlanConfig {
    plans: PlanDef[];
    options: OptionDef[];
}

const COLORS = ["#6b7280","#7c3aed","#f59e0b","#06b6d4","#10b981","#ef4444","#ec4899","#3b82f6"];

// ---- Main Page ----
export default function PlansPage() {
    const [tab, setTab] = useState<"design"|"assign">("design");

    // Plan config state
    const [config, setConfig] = useState<PlanConfig>({ plans: [], options: [] });
    const [configLoading, setConfigLoading] = useState(true);
    const [configSaving, setConfigSaving] = useState(false);
    const [configMsg, setConfigMsg] = useState("");

    // Store assignment state
    const [studios, setStudios] = useState<any[]>([]);
    const [stLoading, setStLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [editForm, setEditForm] = useState<any | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");

    // Load plan config
    const loadConfig = () => {
        setConfigLoading(true);
        fetch("/api/admin/plan-settings")
            .then(r => r.json())
            .then(d => {
                // Defensive: ensure plans and options are arrays to prevent crashes
                if (d && Array.isArray(d.plans) && Array.isArray(d.options)) {
                    setConfig(d);
                }
                setConfigLoading(false);
            })
            .catch(() => {
                // On network error, keep default empty state
                setConfigLoading(false);
            });
    };

    // Load studios
    const loadStudios = () => {
        setStLoading(true);
        fetch("/api/studios").then(r => r.json()).then(data => {
            setStudios(Array.isArray(data) ? data : data.studios || []);
            setStLoading(false);
        });
    };

    useEffect(() => {
        loadConfig();
        loadStudios();
    }, []);

    // ---- Plan Config handlers ----
    const addPlan = () => {
        const newPlan: PlanDef = {
            id: `plan_${Date.now()}`,
            name: "新しいプラン",
            price: 5000,
            color: COLORS[config.plans.length % COLORS.length],
            description: "",
            features: ["予約管理", "顧客管理"],
        };
        setConfig(c => ({ ...c, plans: [...c.plans, newPlan] }));
    };

    const updatePlan = (idx: number, field: keyof PlanDef, value: any) => {
        setConfig(c => {
            const plans = [...c.plans];
            (plans[idx] as any)[field] = value;
            return { ...c, plans };
        });
    };

    const removePlan = (idx: number) => {
        if (!confirm("このプランを削除しますか？")) return;
        setConfig(c => ({ ...c, plans: c.plans.filter((_, i) => i !== idx) }));
    };

    const updateFeature = (planIdx: number, featIdx: number, value: string) => {
        setConfig(c => {
            const plans = [...c.plans];
            const features = [...plans[planIdx].features];
            features[featIdx] = value;
            plans[planIdx] = { ...plans[planIdx], features };
            return { ...c, plans };
        });
    };

    const addFeature = (planIdx: number) => {
        setConfig(c => {
            const plans = [...c.plans];
            plans[planIdx] = { ...plans[planIdx], features: [...plans[planIdx].features, ""] };
            return { ...c, plans };
        });
    };

    const removeFeature = (planIdx: number, featIdx: number) => {
        setConfig(c => {
            const plans = [...c.plans];
            const features = plans[planIdx].features.filter((_, i) => i !== featIdx);
            plans[planIdx] = { ...plans[planIdx], features };
            return { ...c, plans };
        });
    };

    const addOption = () => {
        setConfig(c => ({
            ...c,
            options: [...c.options, { id: `opt_${Date.now()}`, name: "新しいオプション", price: 1000 }]
        }));
    };

    const updateOption = (idx: number, field: keyof OptionDef, value: any) => {
        setConfig(c => {
            const options = [...c.options];
            (options[idx] as any)[field] = value;
            return { ...c, options };
        });
    };

    const removeOption = (idx: number) => {
        setConfig(c => ({ ...c, options: c.options.filter((_, i) => i !== idx) }));
    };

    const saveConfig = async () => {
        setConfigSaving(true);
        setConfigMsg("");
        try {
            const res = await fetch("/api/admin/plan-settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            if (!res.ok) throw new Error("保存に失敗しました");
            setConfigMsg("✅ 保存しました");
            setTimeout(() => setConfigMsg(""), 3000);
        } catch (e: any) {
            setConfigMsg("❌ " + e.message);
        } finally {
            setConfigSaving(false);
        }
    };

    // ---- Store Assignment handlers ----
    const planMap = Object.fromEntries(config.plans.map(p => [p.id, p]));
    const optMap = Object.fromEntries(config.options.map(o => [o.id, o]));

    const withPlan = studios.filter(s => s.planKey && planMap[s.planKey]);
    const withoutPlan = studios.filter(s => !s.planKey || !planMap[s.planKey]);
    const totalMRR = withPlan.reduce((sum, s) => {
        const base = planMap[s.planKey]?.price || 0;
        const opts = (s.planOptions || []).reduce((o: number, k: string) => o + (optMap[k]?.price || 0), 0);
        return sum + base + opts;
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
            ? editForm.planOptions.filter((k: string) => k !== key)
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
        const base = planMap[planKey]?.price || 0;
        const optTotal = opts.reduce((s, k) => s + (optMap[k]?.price || 0), 0);
        return base + optTotal;
    };

    // ---- Render ----
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-foreground">プラン管理</h1>
                    <p className="text-muted-foreground text-sm mt-1">プランの設計と店舗への割り当て</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border">
                {[
                    { key: "design", label: "🎨 プラン設計" },
                    { key: "assign", label: "🏪 店舗割り当て" },
                ].map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key as any)}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-all ${tab === t.key
                            ? "border-purple-500 text-purple-500"
                            : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* === プラン設計タブ === */}
            {tab === "design" && (
                <div className="space-y-8">
                    {configLoading ? (
                        <div className="p-12 text-center text-muted-foreground">読み込み中...</div>
                    ) : (
                        <>
                            {/* Plans */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-black text-foreground text-lg">プランプラン一覧</h2>
                                    <button
                                        onClick={addPlan}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all"
                                    >
                                        <Plus className="w-4 h-4" /> プランを追加
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {config.plans.map((plan, idx) => (
                                        <div key={plan.id} className="bg-card border border-border rounded-xl overflow-hidden">
                                            {/* Color bar */}
                                            <div className="h-1.5" style={{ backgroundColor: plan.color }} />
                                            <div className="p-5 space-y-4">
                                                {/* Name + color */}
                                                <div className="flex items-start gap-3">
                                                    <div className="relative">
                                                        <div
                                                            className="w-8 h-8 rounded-lg cursor-pointer border-2 border-white/20"
                                                            style={{ backgroundColor: plan.color }}
                                                            onClick={() => {
                                                                const next = COLORS[(COLORS.indexOf(plan.color) + 1) % COLORS.length];
                                                                updatePlan(idx, "color", next);
                                                            }}
                                                            title="クリックで色を変更"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <input
                                                            value={plan.name}
                                                            onChange={e => updatePlan(idx, "name", e.target.value)}
                                                            className="w-full bg-transparent font-black text-foreground text-lg focus:outline-none border-b border-transparent focus:border-border"
                                                            placeholder="プラン名"
                                                        />
                                                    </div>
                                                    <button onClick={() => removePlan(idx)} className="text-red-500/50 hover:text-red-400 transition-colors p-1">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div>
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">月額料金</label>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-muted-foreground text-sm">¥</span>
                                                        <input
                                                            type="number"
                                                            value={plan.price}
                                                            onChange={e => updatePlan(idx, "price", Number(e.target.value))}
                                                            className="w-32 bg-background border border-border rounded-lg px-3 py-1.5 text-foreground font-black text-sm focus:outline-none focus:border-purple-500"
                                                        />
                                                        <span className="text-muted-foreground text-sm">/月</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div>
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">説明文</label>
                                                    <input
                                                        value={plan.description}
                                                        onChange={e => updatePlan(idx, "description", e.target.value)}
                                                        className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-sm focus:outline-none focus:border-purple-500"
                                                        placeholder="このプランの説明"
                                                    />
                                                </div>

                                                {/* Features */}
                                                <div>
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">含まれる機能</label>
                                                    <div className="mt-2 space-y-2">
                                                        {plan.features.map((feat, fi) => (
                                                            <div key={fi} className="flex items-center gap-2">
                                                                <Check className="w-3.5 h-3.5 shrink-0" style={{ color: plan.color }} />
                                                                <input
                                                                    value={feat}
                                                                    onChange={e => updateFeature(idx, fi, e.target.value)}
                                                                    className="flex-1 bg-transparent text-sm text-foreground focus:outline-none border-b border-transparent focus:border-border"
                                                                    placeholder="機能名"
                                                                />
                                                                <button onClick={() => removeFeature(idx, fi)} className="text-muted-foreground/50 hover:text-red-400 transition-colors">
                                                                    <X className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => addFeature(idx)}
                                                            className="text-xs text-muted-foreground hover:text-purple-400 transition-colors flex items-center gap-1 mt-1"
                                                        >
                                                            <Plus className="w-3 h-3" /> 機能を追加
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-black text-foreground text-lg">オプション一覧</h2>
                                    <button
                                        onClick={addOption}
                                        className="flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-foreground text-sm font-bold rounded-xl transition-all border border-border"
                                    >
                                        <Plus className="w-4 h-4" /> オプションを追加
                                    </button>
                                </div>
                                <div className="bg-card border border-border rounded-xl overflow-hidden">
                                    {config.options.length === 0 ? (
                                        <div className="p-8 text-center text-muted-foreground text-sm">オプションがありません</div>
                                    ) : (
                                        <table className="w-full">
                                            <thead className="bg-accent/5 border-b border-border">
                                                <tr>
                                                    {["オプション名", "追加料金 /月", ""].map(h => (
                                                        <th key={h} className="px-5 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {config.options.map((opt, i) => (
                                                    <tr key={opt.id}>
                                                        <td className="px-5 py-3">
                                                            <input
                                                                value={opt.name}
                                                                onChange={e => updateOption(i, "name", e.target.value)}
                                                                className="bg-transparent text-foreground font-bold text-sm focus:outline-none border-b border-transparent focus:border-border w-full"
                                                            />
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-muted-foreground text-sm">¥</span>
                                                                <input
                                                                    type="number"
                                                                    value={opt.price}
                                                                    onChange={e => updateOption(i, "price", Number(e.target.value))}
                                                                    className="w-28 bg-background border border-border rounded-lg px-3 py-1 text-foreground font-bold text-sm focus:outline-none focus:border-purple-500"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3 text-right">
                                                            <button onClick={() => removeOption(i)} className="text-red-500/50 hover:text-red-400 transition-colors p-1">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            {/* Save */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={saveConfig}
                                    disabled={configSaving}
                                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold rounded-xl transition-all"
                                >
                                    <Save className="w-4 h-4" />
                                    {configSaving ? "保存中..." : "設定を保存する"}
                                </button>
                                {configMsg && (
                                    <span className={`text-sm font-bold ${configMsg.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>
                                        {configMsg}
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* === 店舗割り当てタブ === */}
            {tab === "assign" && (
                <div className="space-y-6">
                    {/* KPIs */}
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

                    {/* Plan breakdown */}
                    <div className="grid grid-cols-3 gap-4">
                        {config.plans.map(plan => {
                            const count = studios.filter(s => s.planKey === plan.id).length;
                            return (
                                <div key={plan.id} className="bg-card border border-border rounded-xl p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-black text-foreground">{plan.name}</span>
                                        <span className="text-xs font-bold text-muted-foreground">¥{plan.price.toLocaleString()}/月</span>
                                    </div>
                                    <p className="text-2xl font-black" style={{ color: plan.color }}>{count}店舗</p>
                                    <p className="text-xs text-muted-foreground mt-1">月次収益: ¥{(count * plan.price).toLocaleString()}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Store list */}
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
                        {stLoading ? (
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
                                        const plan = planMap[s.planKey];
                                        const optTotal = (s.planOptions || []).reduce((sum: number, k: string) => sum + (optMap[k]?.price || 0), 0);
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
                                                        {(s.planOptions || []).map((k: string) => (
                                                            <span key={k} className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs">{optMap[k]?.name || k}</span>
                                                        ))}
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
                                                        割り当て
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {/* Plan assignment modal */}
            {editForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-black text-foreground mb-1">プラン割り当て</h2>
                        <p className="text-sm text-muted-foreground mb-6">{editForm.storeName}</p>

                        <div className="mb-5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">契約プラン</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setEditForm({ ...editForm, planKey: "" })}
                                    className={`py-2.5 px-3 rounded-xl text-sm font-bold border-2 transition-all ${!editForm.planKey ? "border-gray-500 bg-gray-500/10 text-gray-400" : "border-border text-muted-foreground hover:border-gray-400"}`}
                                >
                                    未契約
                                </button>
                                {config.plans.map(plan => (
                                    <button
                                        key={plan.id}
                                        onClick={() => setEditForm({ ...editForm, planKey: plan.id })}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-bold border-2 transition-all ${editForm.planKey === plan.id ? "text-white border-transparent" : "border-border text-muted-foreground hover:border-purple-400"}`}
                                        style={editForm.planKey === plan.id ? { backgroundColor: plan.color, borderColor: plan.color } : {}}
                                    >
                                        {plan.name}
                                        <span className="block text-xs font-normal opacity-80">¥{plan.price.toLocaleString()}/月</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {config.options.length > 0 && (
                            <div className="mb-5">
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">オプション</label>
                                <div className="space-y-2">
                                    {config.options.map(opt => (
                                        <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-accent/10 transition-all">
                                            <input
                                                type="checkbox"
                                                checked={editForm.planOptions.includes(opt.id)}
                                                onChange={() => toggleOption(opt.id)}
                                                className="w-4 h-4 accent-purple-600"
                                            />
                                            <span className="text-sm text-foreground flex-1">{opt.name}</span>
                                            <span className="text-xs text-muted-foreground">+¥{opt.price.toLocaleString()}/月</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">支払方法</label>
                            <div className="flex gap-3">
                                {[["invoice","🧾 請求書払い"],["stripe","💳 カード"]].map(([v,l]) => (
                                    <button key={v} onClick={() => setEditForm({ ...editForm, planPayMethod: v })}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${editForm.planPayMethod === v ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-border text-muted-foreground hover:border-purple-400"}`}>
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">初回無料期間</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number" min={0} max={365}
                                    value={editForm.planTrialDays}
                                    onChange={e => setEditForm({ ...editForm, planTrialDays: Math.max(0, parseInt(e.target.value) || 0) })}
                                    className="w-24 px-3 py-2 rounded-xl border border-border bg-background text-foreground text-center font-black text-lg focus:outline-none focus:border-purple-500"
                                />
                                <span className="text-sm text-muted-foreground">日間無料</span>
                                <div className="flex gap-1 ml-auto">
                                    {[0,30,60,90].map(d => (
                                        <button key={d} onClick={() => setEditForm({ ...editForm, planTrialDays: d })}
                                            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${editForm.planTrialDays === d ? "bg-purple-600 text-white" : "bg-accent/10 text-muted-foreground hover:text-foreground"}`}>
                                            {d === 0 ? "なし" : `${d}日`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {editForm.planKey && (
                            <div className="mb-5 p-3 bg-accent/10 rounded-xl flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">月額合計</span>
                                <span className="text-xl font-black text-foreground">¥{calcMonthly(editForm.planKey, editForm.planOptions).toLocaleString()}</span>
                            </div>
                        )}

                        {saveMsg && (
                            <p className={`text-sm font-bold mb-4 text-center ${saveMsg.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>{saveMsg}</p>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setEditForm(null)} className="flex-1 py-3 rounded-xl border border-border text-muted-foreground font-bold text-sm hover:bg-accent/10 transition-all">
                                キャンセル
                            </button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all disabled:opacity-60">
                                {saving ? "保存中..." : "保存する"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
