"use client";
import React, { useState, useRef } from "react";

export default function UsersImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState<string[][]>([]);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setResult(null);
        setError("");

        // プレビュー表示
        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = ev.target?.result as string;
            const lines = text.split(/\r?\n/).filter(l => l.trim());
            const rows = lines.slice(0, 6).map(l => l.split(",").map(c => c.replace(/^"|"$/g, "").trim()));
            setPreview(rows);
        };
        reader.readAsText(f);
    };

    const handleImport = async () => {
        if (!file) return;
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/admin/users-import", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setResult(data);
            } else {
                setError(data.error || "インポートに失敗しました");
                if (data.detectedHeaders) {
                    setError(prev => prev + `\n検出されたヘッダー: ${data.detectedHeaders.join(", ")}`);
                }
            }
        } catch (err: any) {
            setError("通信エラー: " + (err.message || ""));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
        setError("");
        setPreview([]);
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-black mb-2">顧客データ インポート</h1>
            <p className="text-sm text-gray-500 mb-8">他社システムからの乗り換え時に、CSVファイルで顧客データを一括登録できます。</p>

            {/* CSVフォーマット説明 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h2 className="font-bold text-blue-900 mb-3">CSVフォーマット</h2>
                <p className="text-sm text-blue-800 mb-3">
                    1行目にヘッダー、2行目以降にデータを入力してください。日本語・英語どちらのヘッダーにも対応しています。
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <div className="text-gray-500 mb-1">■ 対応ヘッダー名:</div>
                    <table className="w-full text-left">
                        <tbody>
                            <tr><td className="pr-4 py-1 font-bold">名前</td><td className="text-gray-500">name, 氏名, 顧客名</td></tr>
                            <tr><td className="pr-4 py-1 font-bold">メール</td><td className="text-gray-500">email, メールアドレス, e-mail</td></tr>
                            <tr><td className="pr-4 py-1 font-bold">電話</td><td className="text-gray-500">phone, 電話番号, tel</td></tr>
                            <tr><td className="pr-4 py-1 font-bold">住所</td><td className="text-gray-500">address</td></tr>
                        </tbody>
                    </table>
                    <div className="text-gray-500 mt-3 mb-1">■ CSVサンプル:</div>
                    <div className="text-gray-800">
                        名前,メール,電話,住所<br />
                        山田太郎,yamada@example.com,09012345678,東京都渋谷区神宮前1-2-3<br />
                        佐藤花子,sato@example.com,08098765432,大阪府大阪市北区梅田4-5-6
                    </div>
                </div>
                <p className="text-xs text-blue-600 mt-3">※ 既に登録済みのメールアドレスは自動的にスキップされます。UTF-8 / Shift-JIS 両対応。</p>
            </div>

            {/* ファイル選択 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <label className="block text-sm font-bold mb-3">CSVファイルを選択</label>
                <input
                    ref={fileRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                />
            </div>

            {/* プレビュー */}
            {preview.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-sm mb-3">プレビュー（最大5行）</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                            <thead>
                                <tr>
                                    {preview[0]?.map((h, i) => (
                                        <th key={i} className="bg-gray-100 border border-gray-200 px-3 py-2 text-left font-bold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {preview.slice(1).map((row, ri) => (
                                    <tr key={ri}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} className="border border-gray-200 px-3 py-2">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">ファイル: {file?.name} ({(file?.size || 0) > 1024 ? `${Math.round((file?.size || 0) / 1024)}KB` : `${file?.size}B`})</p>
                </div>
            )}

            {/* インポートボタン */}
            {file && !result && (
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={handleImport}
                        disabled={loading}
                        className="px-8 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50"
                    >
                        {loading ? "インポート中..." : "インポート実行"}
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                        リセット
                    </button>
                </div>
            )}

            {/* エラー表示 */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <p className="text-red-700 font-bold text-sm whitespace-pre-wrap">{error}</p>
                </div>
            )}

            {/* 結果表示 */}
            {result && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-green-900 text-lg mb-3">インポート完了</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-4 text-center">
                            <div className="text-2xl font-black text-green-600">{result.imported}</div>
                            <div className="text-xs text-gray-500 font-bold">登録成功</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center">
                            <div className="text-2xl font-black text-yellow-600">{result.skipped}</div>
                            <div className="text-xs text-gray-500 font-bold">スキップ</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center">
                            <div className="text-2xl font-black text-gray-600">{result.total}</div>
                            <div className="text-xs text-gray-500 font-bold">合計行数</div>
                        </div>
                    </div>
                    {result.errors?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-bold text-sm text-yellow-800 mb-2">詳細:</h4>
                            <ul className="text-xs text-yellow-700 space-y-1">
                                {result.errors.map((e: string, i: number) => (
                                    <li key={i}>• {e}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        onClick={handleReset}
                        className="mt-4 px-6 py-2 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-all text-sm"
                    >
                        続けてインポート
                    </button>
                </div>
            )}
        </div>
    );
}
