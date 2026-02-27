"use client";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 期間指定の初期値（今月の1日 〜 本日）
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const [startDate, setStartDate] = useState(firstDay.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

    useEffect(() => {
        // ダッシュボードの統計データと、出力用の全予約データを同時に取得
        Promise.all([
            fetch('/api/dashboard').then(res => res.json()),
            fetch('/api/admin-bookings').then(res => res.json())
        ]).then(([dashboardData, bookingsData]) => {
            if (!dashboardData.error) setData(dashboardData);
            if (!bookingsData.error) setBookings(bookingsData);
            setLoading(false);
        });
    }, []);

    // 指定期間内の予約データを絞り込む関数
    const getFilteredBookings = () => {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        return bookings.filter(b => {
            const bDate = new Date(b.startTime);
            return bDate >= start && bDate <= end;
        });
    };

    // 📥 CSVダウンロード機能
    const handleDownloadCSV = () => {
        const targetBookings = getFilteredBookings();
        if (targetBookings.length === 0) return alert("指定期間に予約データがありません。");

        // CSVのヘッダー（1行目）
        let csvContent = "予約ID,利用日,開始時間,終了時間,スタジオ名,お客様名,料金,ステータス\n";

        targetBookings.forEach(b => {
            const date = new Date(b.startTime).toLocaleDateString('ja-JP');
            const startT = new Date(b.startTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            const endT = new Date(b.endTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            const studioName = b.studio?.name || "不明";
            const userName = b.user?.name || "ゲスト";

            // CSVの各行を作成（カンマ区切り）
            csvContent += `${b.id},${date},${startT},${endT},${studioName},${userName},${b.totalPrice},${b.status}\n`;
        });

        // 文字化け防止（BOM付き）でダウンロードさせる魔法
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `売上データ_${startDate}_to_${endDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 📋 スプレッドシート用にコピーする機能（TSV形式）
    const handleCopyToSheets = () => {
        const targetBookings = getFilteredBookings();
        if (targetBookings.length === 0) return alert("指定期間に予約データがありません。");

        // タブ区切り（TSV）にすると、スプレッドシートのセルに綺麗に貼り付けられます
        let tsvContent = "予約ID\t利用日\t開始時間\t終了時間\tスタジオ名\tお客様名\t料金\tステータス\n";

        targetBookings.forEach(b => {
            const date = new Date(b.startTime).toLocaleDateString('ja-JP');
            const startT = new Date(b.startTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            const endT = new Date(b.endTime).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            const studioName = b.studio?.name || "不明";
            const userName = b.user?.name || "ゲスト";

            tsvContent += `${b.id}\t${date}\t${startT}\t${endT}\t${studioName}\t${userName}\t${b.totalPrice}\t${b.status}\n`;
        });

        navigator.clipboard.writeText(tsvContent).then(() => {
            alert("✅ データをコピーしました！\nGoogleスプレッドシートのA1セルを選択して「貼り付け」してください。");
        }).catch(() => alert("コピーに失敗しました"));
    };

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-500">Loading Dashboard...</div>;
    if (!data) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-red-500">データが取得できませんでした</div>;

    const progressPercent = Math.min(Math.round((data.actualSales / data.targetSales) * 100), 100);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                            <span className="p-3 bg-purple-100 text-purple-800 rounded-xl not-italic">📊</span>
                            Analytics & Sales
                        </h1>
                        <p className="text-xs text-gray-500 font-bold mt-2 tracking-widest uppercase">予実管理・売上ダッシュボード</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 shadow-sm transition-all flex items-center gap-2">
                        🔄 データを更新
                    </button>
                </div>

                {/* 目標達成プログレスバー */}
                <div className="bg-white border border-gray-200 rounded-[2rem] p-8 mb-8 shadow-sm">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">売上目標達成率 (今月)</p>
                            <p className="text-4xl font-black text-gray-900">{progressPercent}<span className="text-2xl text-gray-400">%</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">目標: ¥{data.targetSales.toLocaleString()}</p>
                            <p className="text-xl font-black text-purple-800">実績: ¥{data.actualSales.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden border border-gray-200">
                        <div className="bg-purple-800 h-6 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {/* 主要KPIカード群 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm border-l-4 border-l-purple-800">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">売上実績 (回収済)</p>
                        <p className="text-3xl font-black text-gray-900">¥{data.actualSales.toLocaleString()}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm border-l-4 border-l-yellow-400">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">未入金 (当日払い予定)</p>
                        <p className="text-3xl font-black text-gray-900">¥{data.unpaidSales.toLocaleString()}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm border-l-4 border-l-blue-500">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">平均客単価</p>
                        <p className="text-3xl font-black text-gray-900">¥{data.averagePrice.toLocaleString()}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm border-l-4 border-l-emerald-500">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">スタジオ稼働率</p>
                        <p className="text-3xl font-black text-gray-900">{data.occupancyRate}%</p>
                    </div>
                </div>

                {/* 🌟 データの出力・エクスポートエリア */}
                <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-purple-800 pl-4 mb-6">売上データの出力・エクスポート</h2>

                    <div className="flex flex-col md:flex-row items-end gap-6">

                        {/* 期間選択 */}
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-full">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">開始日</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-purple-800 focus:outline-none font-bold"
                                />
                            </div>
                            <span className="text-gray-400 font-bold mb-2">〜</span>
                            <div className="w-full">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">終了日</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-purple-800 focus:outline-none font-bold"
                                />
                            </div>
                        </div>

                        {/* 出力ボタン群 */}
                        <div className="flex gap-4 w-full md:w-auto">
                            <button
                                onClick={handleDownloadCSV}
                                className="flex-1 md:w-48 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 shadow-md transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                📥 CSVダウンロード
                            </button>
                            <button
                                onClick={handleCopyToSheets}
                                className="flex-1 md:w-64 py-3 bg-white text-purple-800 border-2 border-purple-800 rounded-xl font-bold hover:bg-purple-50 transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                📋 スプレッドシート用にコピー
                            </button>
                        </div>

                    </div>
                    <p className="text-xs text-gray-400 font-bold mt-4">
                        ※「スプレッドシート用にコピー」を押した後、Googleスプレッドシートの空のシートで「貼り付け」を行うと一瞬で表が作成されます。
                    </p>
                </div>

            </div>
        </div>
    );
}