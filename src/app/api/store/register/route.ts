// 店舗の自己登録API（廃止）。
//
// 260807:
//   店舗アカウントは「申込フォーム → 店舗情報の入力（招待リンク）→ 運営の承認」で
//   発行される（/api/admin/invites/[token]/approve）。この自己登録が生きていると、
//   すでに入力済みの店舗データと紐づかない**重複店舗**が作られ、
//   予約ページも管理画面も中身が空のまま増えてしまう。
//   加えて、この実装はパスワードを平文のまま Firestore に保存していた。
//
//   /store/login の「新規登録はこちら」導線は申込フォームへ差し替え済み。
//   ここは直接叩かれた場合の入口を塞ぐために残している。
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
    return NextResponse.json(
        {
            error: "店舗の新規登録はお申し込みフォームから受け付けています。https://studi-go.com/studigo_apply.html",
        },
        { status: 410 },
    );
}
