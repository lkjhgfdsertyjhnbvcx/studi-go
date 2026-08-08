// 店舗のログアウト。
//
// 260807: ダッシュボードは `document.cookie = "__session=;max-age=0"` で
// ログアウトしていたが、__session は httpOnly で発行されている（/api/store/login）ため
// JavaScript からは削除できない。結果、ログアウトしたつもりでもクッキーは30日間残り、
// 同じブラウザから店舗の管理API（スタッフ一覧・ブラックリスト等）を叩けてしまう。
// サーバー側で確実に破棄する。
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
    const res = NextResponse.json({ success: true });
    res.cookies.set("__session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    });
    return res;
}
