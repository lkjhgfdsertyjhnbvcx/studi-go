"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const StudiGoLogo = () => (
    <div className="flex items-center cursor-pointer hover:opacity-80 transition-all">
        <img src="/logo-new.png" alt="Studi-Go Logo" className="h-12 w-auto object-contain" />
    </div>
);

const DUMMY_STORES = [
    { id: "d1", name: "Studio Alpha", prefecture: "東京都", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80", address: "渋谷区道玄坂", description: "最新機材完備のフラッグシップ店。プロのレコーディングにも対応。", studios: [{ id: "s1", name: "Ast", pricePerHour: 3500 }] },
    { id: "d2", name: "Sound Garden", prefecture: "大阪府", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80", address: "北区梅田", description: "アコースティック重視の落ち着いた空間。生楽器の響きが自慢です。", studios: [{ id: "s3", name: "L-Room", pricePerHour: 3000 }] },
    { id: "d3", name: "Beat House", prefecture: "愛知県", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80", address: "名古屋市中区", description: "大音量OK！バンド練習に最適な広いルームと抜群の遮音性。", studios: [{ id: "s4", name: "Main", pricePerHour: 4000 }] },
    { id: "d4", name: "Echo Chamber", prefecture: "福岡県", image: "https://images.unsplash.com/photo-1514320298574-2559e266f21c?auto=format&fit=crop&w=800&q=80", address: "中央区天神", description: "ビンテージ機材が揃うレコーディング特化型スタジオ。", studios: [{ id: "s5", name: "Studio 1", pricePerHour: 5000 }] },
    { id: "d5", name: "Melody Line", prefecture: "北海道", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80", address: "札幌市中央区", description: "初心者大歓迎。アットホームな雰囲気で個人練習にも最適。", studios: [{ id: "s6", name: "Room A", pricePerHour: 1500 }] },
    { id: "d6", name: "Rhythm Station", prefecture: "神奈川県", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80", address: "横浜市西区", description: "24時間営業。仕事帰りや深夜のセッションに便利な駅近立地。", studios: [{ id: "s7", name: "Night-st", pricePerHour: 2500 }] },
    { id: "d7", name: "Sonic Boom", prefecture: "京都府", image: "https://images.unsplash.com/photo-1520529688126-778736e67980?auto=format&fit=crop&w=800&q=80", address: "京都市下京区", description: "モダンな内装。クリエイティブな刺激を与えるデザイン空間。", studios: [{ id: "s8", name: "Green", pricePerHour: 3200 }] },
    { id: "d8", name: "Harmony Hall", prefecture: "埼玉県", image: "https://images.unsplash.com/photo-1507838596054-9a3a14ca090a?auto=format&fit=crop&w=800&q=80", address: "さいたま市大宮区", description: "グランドピアノ完備。クラシックやジャズの練習に。", studios: [{ id: "s9", name: "Piano Room", pricePerHour: 4500 }] },
    { id: "d9", name: "Vibe Room", prefecture: "広島県", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", address: "広島市中区", description: "DJブース完備。クラブミュージックの制作・練習に特化。", studios: [{ id: "s10", name: "DJ Cabin", pricePerHour: 2000 }] },
    { id: "d10", name: "Live Edge", prefecture: "宮城県", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=80", address: "仙台市青葉区", description: "大型ステージ完備。ライブ直前のリハーサルに最適です。", studios: [{ id: "s11", name: "Hall", pricePerHour: 6000 }] },
];

const PREFECTURES = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];

export default function TopPage() {
    const router = useRouter();
    const [stores, setStores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchPref, setSearchPref] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/stores').then(res => res.json()).then(data => {
            let combined = data.error ? DUMMY_STORES : [...data, ...DUMMY_STORES];
            setStores(combined.sort(() => Math.random() - 0.5));
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (loading) return;
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 5) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollTo({ left: scrollLeft + clientWidth / 2, behavior: "smooth" });
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [loading, stores]);

    const filteredStores = stores.filter(store => {
        const matchKeyword = searchKeyword === "" || store.name.includes(searchKeyword) || (store.address && store.address.includes(searchKeyword));
        const matchPref = searchPref === "" || store.prefecture === searchPref;
        return matchKeyword && matchPref;
    });

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
            <header className="bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <div onClick={() => router.push('/')}><StudiGoLogo /></div>
                <button onClick={() => router.push('/mypage')} className="px-6 py-2.5 text-sm font-bold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-all">👤 マイページ</button>
            </header>

            <div className="bg-gray-900 text-white py-20 px-4 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight italic">Find Your Sound.</h2>
                    <p className="text-gray-300 font-bold mb-10 opacity-80 uppercase tracking-widest">音楽スタジオ検索・予約プラットフォーム</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto -mt-10 relative z-20 px-4">
                <div className="bg-white border border-gray-200 rounded-[2.5rem] p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full text-left">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 mb-2">エリアから探す</div>
                        <select value={searchPref} onChange={(e) => setSearchPref(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-900 font-bold focus:border-purple-800 focus:outline-none appearance-none">
                            <option value="">全国</option>
                            {PREFECTURES.map(pref => <option key={pref} value={pref}>{pref}</option>)}
                        </select>
                    </div>
                    <div className="flex-1 w-full text-left">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2 mb-2">キーワードで探す</div>
                        <input type="text" placeholder="スタジオ名、機材名など..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-900 font-bold focus:border-purple-800 focus:outline-none" />
                    </div>
                    <button className="w-full md:w-36 py-3.5 bg-purple-800 text-white rounded-2xl font-black shadow-lg shadow-purple-800/30">検索</button>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto pt-24 px-6 overflow-hidden">
                <div className="flex justify-between items-end mb-8 border-l-8 border-purple-800 pl-5">
                    <div>
                        <h3 className="text-3xl font-black text-gray-900 italic">Recommended Studios</h3>
                        <p className="text-xs text-gray-400 font-bold tracking-widest mt-1 uppercase">自動スライドでおすすめ店舗をチェック</p>
                    </div>
                </div>

                <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-10 scroll-smooth">
                    {filteredStores.map(store => (
                        <div
                            key={store.id}
                            onClick={() => router.push(`/store-detail?id=${store.id}`)}
                            className="min-w-[280px] md:min-w-[380px] bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex flex-col group hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
                        >
                            <div className="h-48 w-full overflow-hidden relative">
                                <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-purple-800 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">{store.prefecture}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h4 className="text-xl font-black text-gray-900 leading-tight mb-2">{store.name}</h4>
                                <p className="text-[11px] font-bold text-gray-400 mb-4 line-clamp-2 leading-relaxed">{store.description}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-400 uppercase">Min Price</span>
                                        <span className="font-black text-purple-800 text-base">¥{store.studios?.[0]?.pricePerHour || 1000}～</span>
                                    </div>
                                    <span className="text-xs font-black text-purple-800 border-2 border-purple-800 px-4 py-2 rounded-xl group-hover:bg-purple-800 group-hover:text-white transition-all">詳細を見る</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="mt-20 text-center text-[10px] font-bold text-gray-300 tracking-[0.5em] uppercase border-t border-gray-100 pt-10">
                &copy; 2026 Studi-Go. Beyond the Sound.
            </footer>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
