"use client";

// 運営：紹介料請求書（印刷／PDF保存用）
// ブラウザの印刷機能（Cmd+P → PDFとして保存）でPDF化できます
import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import type { VowchaInvoice, VowchaSettings } from "@/lib/vowcha";

export default function VowchaInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [invoice, setInvoice] = useState<VowchaInvoice | null>(null);
    const [settings, setSettings] = useState<VowchaSettings | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/admin/vowcha/invoices/${id}`)
            .then((r) => r.json())
            .then((res) => {
                if (res.error) throw new Error(res.error);
                setInvoice(res.invoice);
                setSettings(res.settings);
            })
            .catch((e) => setError(e.message));
    }, [id]);

    if (error) return <div className="text-sm text-red-500">{error}</div>;
    if (!invoice || !settings) return <div className="text-sm text-muted-foreground">読み込み中...</div>;

    return (
        <div className="max-w-3xl">
            {/* 印刷時はサイドバー等を隠す */}
            <style>{`
                @media print {
                    aside, .no-print { display: none !important; }
                    main { margin-left: 0 !important; padding: 0 !important; }
                    .invoice-sheet { border: none !important; box-shadow: none !important; }
                    body { background: white !important; }
                }
            `}</style>

            <div className="no-print flex items-center gap-3 mb-6">
                <Link href="/admin/vowcha" className="inline-flex items-center gap-1 text-xs font-bold rounded-lg border border-border px-3 py-2 hover:bg-accent/10">
                    <ArrowLeft className="w-3 h-3" /> 戻る
                </Link>
                <button onClick={() => window.print()} className="inline-flex items-center gap-1 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white px-4 py-2">
                    <Printer className="w-3 h-3" /> 印刷 / PDF保存
                </button>
                <span className="text-xs text-muted-foreground">印刷ダイアログで「PDFとして保存」を選ぶとPDFになります</span>
            </div>

            {/* 請求書本体（印刷向けに白固定） */}
            <div className="invoice-sheet rounded-xl border border-border shadow-sm p-10 space-y-8" style={{ background: "#ffffff", color: "#1d1d1f" }}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-widest" style={{ color: "#1d1d1f" }}>請　求　書</h1>
                </div>

                <div className="flex justify-between items-start gap-6">
                    <div className="space-y-1">
                        <div className="text-lg font-bold border-b pb-1" style={{ borderColor: "#1d1d1f" }}>{settings.activaName} 御中</div>
                        {settings.activaAddress && <div className="text-xs" style={{ color: "#555" }}>{settings.activaAddress}</div>}
                        <div className="text-sm pt-4">下記のとおりご請求申し上げます。</div>
                    </div>
                    <div className="text-xs space-y-1 text-right" style={{ color: "#333" }}>
                        <div>請求書番号：<span className="font-mono font-bold">{invoice.invoiceNo}</span></div>
                        <div>発行日：{invoice.issuedAt.slice(0, 10)}</div>
                        <div>支払期限：{invoice.dueDate}</div>
                        <div className="pt-3 font-bold text-sm">{settings.jocollaName}</div>
                        {settings.jocollaAddress && <div>{settings.jocollaAddress}</div>}
                        {settings.invoiceRegistrationNumber && <div>登録番号：{settings.invoiceRegistrationNumber}</div>}
                    </div>
                </div>

                <div className="flex items-end gap-4">
                    <div className="text-sm font-bold">ご請求金額</div>
                    <div className="text-3xl font-bold border-b-2 px-4" style={{ borderColor: "#1d1d1f" }}>
                        ¥{invoice.total.toLocaleString()} <span className="text-sm font-bold">（税込）</span>
                    </div>
                </div>

                <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f0f0f2" }}>
                            <th className="text-left px-3 py-2 border" style={{ borderColor: "#ccc" }}>内容</th>
                            <th className="text-right px-3 py-2 border w-32" style={{ borderColor: "#ccc" }}>金額（税抜）</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, i) => (
                            <tr key={i}>
                                <td className="px-3 py-2 border" style={{ borderColor: "#ccc" }}>
                                    Studi-Go 新規店舗紹介料（{item.storeName}）
                                </td>
                                <td className="px-3 py-2 border text-right" style={{ borderColor: "#ccc" }}>¥{item.fee.toLocaleString()}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-3 py-2 border text-right font-bold" style={{ borderColor: "#ccc" }}>小計</td>
                            <td className="px-3 py-2 border text-right" style={{ borderColor: "#ccc" }}>¥{invoice.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="px-3 py-2 border text-right font-bold" style={{ borderColor: "#ccc" }}>消費税（{invoice.taxRate}%）</td>
                            <td className="px-3 py-2 border text-right" style={{ borderColor: "#ccc" }}>¥{invoice.tax.toLocaleString()}</td>
                        </tr>
                        <tr style={{ background: "#f0f0f2" }}>
                            <td className="px-3 py-2 border text-right font-bold" style={{ borderColor: "#ccc" }}>合計（税込）</td>
                            <td className="px-3 py-2 border text-right font-bold" style={{ borderColor: "#ccc" }}>¥{invoice.total.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                {settings.bankInfo && (
                    <div className="text-sm space-y-1">
                        <div className="font-bold">【お振込先】</div>
                        <div>{settings.bankInfo}</div>
                        <div className="text-xs" style={{ color: "#555" }}>※ 恐れ入りますが、振込手数料は貴社にてご負担願います。</div>
                    </div>
                )}
            </div>
        </div>
    );
}
