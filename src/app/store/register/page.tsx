// 旧・店舗自己登録ページ（廃止）。
// 店舗アカウントは「申込 → 店舗情報の入力 → 運営の承認」で発行されるため、
// ここから登録されると入力済みデータと紐づかない重複店舗ができてしまう。
// 過去にブックマークされている可能性があるので、申込フォームへ案内する。
import Link from "next/link";

export default function StoreRegisterRetired() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="max-w-md w-full rounded-2xl border border-border bg-card p-8 text-center space-y-4">
                <h1 className="text-xl font-black">店舗の新規登録について</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Studi-Go の店舗アカウントは、お申し込みフォームからのお申し込み後に発行しています。
                    下のボタンからお申し込みください（3分ほど・費用はかかりません）。
                </p>
                <a
                    href="/studigo_apply.html"
                    className="inline-block w-full rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 text-sm font-bold transition-all"
                >
                    お申し込みフォームへ →
                </a>
                <p className="text-xs text-muted-foreground">
                    すでにログイン情報をお持ちの方は{" "}
                    <Link href="/store/login" className="text-purple-600 hover:underline font-bold">
                        店舗管理ログイン
                    </Link>
                </p>
                <p className="text-xs text-muted-foreground">
                    お申し込み済みでログイン情報が届いていない場合は{" "}
                    <a href="mailto:info@studi-go.com" className="text-purple-600 hover:underline">
                        info@studi-go.com
                    </a>{" "}
                    までご連絡ください。
                </p>
            </div>
        </div>
    );
}
