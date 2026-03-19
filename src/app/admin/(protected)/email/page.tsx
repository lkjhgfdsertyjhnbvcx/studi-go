"use client";
import React, { useState } from "react";
import { Mail, Send, Users, Store, User, CheckCircle, AlertCircle } from "lucide-react";

type RecipientType = "all_users" | "all_studios" | "specific";

export default function EmailPage() {
    const [recipientType, setRecipientType] = useState<RecipientType>("all_users");
    const [specificEmails, setSpecificEmails] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<{ sent?: number; failed?: number; total?: number; error?: string } | null>(null);

    const handleSend = async () => {
        if (!subject.trim() || !body.trim()) {
            alert("件名と本文を入力してください");
            return;
        }
        if (recipientType === "specific" && !specificEmails.trim()) {
            alert("送信先メールアドレスを入力してください");
            return;
        }
        if (!confirm(`メールを送信します。よろしいですか？`)) return;

        setSending(true);
        setResult(null);
        try {
            const recipientIds = recipientType === "specific"
                ? specificEmails.split(/[\n,]/).map(e => e.trim()).filter(Boolean)
                : [];

            const res = await fetch("/api/admin/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipientType, recipientIds, subject, body }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "送信に失敗しました");
            setResult(data);
        } catch (e: any) {
            setResult({ error: e.message });
        } finally {
            setSending(false);
        }
    };

    const recipientOptions: { value: RecipientType; label: string; desc: string; icon: React.ReactNode }[] = [
        { value: "all_users", label: "全ユーザー", desc: "登録済みの全ユーザーに送信", icon: <Users className="w-4 h-4" /> },
        { value: "all_studios", label: "全店舗", desc: "登録済みの全店舗に送信", icon: <Store className="w-4 h-4" /> },
        { value: "specific", label: "個別指定", desc: "メールアドレスを直接入力", icon: <User className="w-4 h-4" /> },
    ];

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-black text-foreground">メール送信</h1>
                <p className="text-muted-foreground text-sm mt-1">ユーザー・店舗へのお知らせメール送信</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                {/* Recipient */}
                <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">送信先</label>
                    <div className="grid grid-cols-3 gap-3">
                        {recipientOptions.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setRecipientType(opt.value)}
                                className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all ${
                                    recipientType === opt.value
                                        ? "border-purple-500 bg-purple-500/10 text-purple-400"
                                        : "border-border text-muted-foreground hover:border-purple-400"
                                }`}
                            >
                                <div className="mb-2">{opt.icon}</div>
                                <p className="font-bold text-sm">{opt.label}</p>
                                <p className="text-xs opacity-70 mt-0.5">{opt.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Specific emails input */}
                {recipientType === "specific" && (
                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                            メールアドレス（改行 or カンマ区切り）
                        </label>
                        <textarea
                            value={specificEmails}
                            onChange={e => setSpecificEmails(e.target.value)}
                            placeholder={"example@email.com\nanother@email.com"}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-purple-500 font-mono resize-none"
                        />
                    </div>
                )}

                {/* Subject */}
                <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">件名</label>
                    <input
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="メールの件名を入力"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-purple-500"
                    />
                </div>

                {/* Body */}
                <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">本文</label>
                    <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        placeholder="メール本文を入力してください..."
                        rows={10}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">※ 宛名（〇〇様）は自動的に付与されます</p>
                </div>

                {/* Result */}
                {result && (
                    <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                        result.error
                            ? "bg-red-950/20 border-red-900/50 text-red-400"
                            : "bg-green-950/20 border-green-900/50 text-green-400"
                    }`}>
                        {result.error ? <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                        <div className="text-sm font-bold">
                            {result.error
                                ? `エラー: ${result.error}`
                                : `✅ 送信完了 — ${result.sent}件成功 / ${result.total}件中${result.failed ? `（${result.failed}件失敗）` : ""}`
                            }
                        </div>
                    </div>
                )}

                {/* Send button */}
                <button
                    onClick={handleSend}
                    disabled={sending}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    {sending ? "送信中..." : "メールを送信する"}
                </button>
            </div>

            {/* Note */}
            <div className="bg-yellow-950/20 border border-yellow-900/40 rounded-xl p-4 text-xs text-yellow-400/80 space-y-1">
                <p className="font-bold text-yellow-400">⚠️ メール送信には設定が必要です</p>
                <p>.env ファイルに以下を追加してください：</p>
                <code className="block bg-black/30 rounded px-3 py-2 font-mono mt-2 text-yellow-300">
                    RESEND_API_KEY=re_xxxxxxxxxx<br/>
                    EMAIL_FROM=Studi-Go &lt;noreply@studi-go.com&gt;
                </code>
                <p className="mt-2">Resend API キーは <a href="https://resend.com" target="_blank" className="underline">resend.com</a> で取得できます（無料プランあり）</p>
            </div>
        </div>
    );
}
