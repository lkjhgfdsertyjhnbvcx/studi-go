"use client";
import Link from "next/link";

export default function VouchaAboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* ヘッダー */}
            <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-muted-foreground hover:text-foreground text-sm font-bold transition-colors">
                        ← Studi-Go
                    </Link>
                    <p className="text-foreground font-black text-sm">バウチャクーポンとは</p>
                    <div className="w-16" />
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
                {/* ヒーロー */}
                <section className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-purple-400 text-xs font-black">
                        株式会社ACTIVA 提供
                    </div>
                    <h1 className="text-3xl font-black text-foreground leading-tight">
                        バウチャクーポン
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        スタジオで使えるデジタル割引クーポン。<br />
                        アプリ不要で、スマホからすぐに使えます。
                    </p>
                </section>

                {/* クーポン内容 */}
                <section className="bg-gradient-to-br from-purple-600/20 to-blue-600/10 border border-purple-500/30 rounded-3xl p-8 text-center space-y-3">
                    <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">クーポン内容</p>
                    <p className="text-5xl font-black text-foreground">500円 × 12枚</p>
                    <p className="text-muted-foreground text-sm">合計 <span className="text-foreground font-black">6,000円分</span> のクーポン</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-sm font-bold">
                        ✓ ログイン後すぐに利用可能
                    </div>
                </section>

                {/* 使い方 */}
                <section className="space-y-4">
                    <h2 className="text-lg font-black text-foreground">使い方</h2>
                    <div className="space-y-3">
                        {[
                            { step: "01", title: "Studi-Goにログイン", desc: "アカウントをお持ちでない方は無料で作成できます" },
                            { step: "02", title: "スタジオを選んで予約", desc: "バウチャクーポン対応スタジオで予約を進めます" },
                            { step: "03", title: "クーポンを適用", desc: "予約確認画面でバウチャクーポンを選択して割引を受けます" },
                            { step: "04", title: "スタジオを楽しむ", desc: "当日スタジオでそのまま利用できます" },
                        ].map(item => (
                            <div key={item.step} className="flex gap-4 p-4 bg-card border border-border rounded-2xl items-start">
                                <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="text-purple-400 font-black text-xs">{item.step}</span>
                                </div>
                                <div>
                                    <p className="font-black text-foreground text-sm">{item.title}</p>
                                    <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* よくある質問 */}
                <section className="space-y-4">
                    <h2 className="text-lg font-black text-foreground">よくある質問</h2>
                    <div className="space-y-3">
                        {[
                            {
                                q: "クーポンはどのスタジオでも使えますか？",
                                a: "バウチャクーポン対応と表示されているStudi-Go加盟スタジオでご利用いただけます。"
                            },
                            {
                                q: "有効期限はありますか？",
                                a: "クーポンには有効期限があります。詳細は各スタジオのページでご確認ください。"
                            },
                            {
                                q: "クーポンは何回でも使えますか？",
                                a: "500円券が12枚セットになっています。1回の予約につき複数枚使用できます（スタジオによって異なります）。"
                            },
                            {
                                q: "ログインしないと使えませんか？",
                                a: "クーポンのご利用にはStudi-Goへのログインが必要です。無料でアカウント作成できます。"
                            },
                        ].map((item, i) => (
                            <details key={i} className="group bg-card border border-border rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-sm text-foreground list-none">
                                    <span>{item.q}</span>
                                    <span className="text-muted-foreground group-open:rotate-180 transition-transform text-xs">▼</span>
                                </summary>
                                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ACTIVA について */}
                <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
                    <h2 className="font-black text-foreground text-sm">提供元について</h2>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                        バウチャクーポンは株式会社ACTIVA（activapoint.com）が提供するデジタルクーポンサービスです。
                        Studi-Goは同サービスと提携し、加盟スタジオにて割引クーポンをご利用いただけるようにしています。
                    </p>
                    <a href="https://activapoint.com" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors">
                        株式会社ACTIVA 公式サイト →
                    </a>
                </section>

                {/* CTA */}
                <section className="text-center space-y-4 pb-8">
                    <p className="text-muted-foreground text-sm">クーポンを使ってスタジオを予約する</p>
                    <Link href="/"
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-black px-8 py-4 rounded-2xl transition-all text-sm">
                        スタジオを探す →
                    </Link>
                </section>
            </main>
        </div>
    );
}
