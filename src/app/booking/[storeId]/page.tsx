// 旧・店舗別予約ページ。現在の公開予約ページは /studio/[id] に一本化されている。
//
// 背景（260807）:
//   この画面は現行のデータモデルより前の実装で、
//     - 存在しない `pricingJson` を前提に「平日¥2,000 / 土日¥3,000」のダミー価格へフォールバック
//     - 実在しない `/api/booking/create` を叩き、`if (res.ok)` で失敗を握り潰す
//       （正しくは /booking/create。押しても何も起きない予約ボタンになっていた）
//     - `store.name` を参照（実際のフィールドは storeName）で店名が空
//   という状態だった。半端に直すと「動くが料金が嘘のページ」が残るため、
//   過去に配布されたURL・QRコードの救済も兼ねて現行ページへ恒久リダイレクトする。
import { redirect, permanentRedirect } from "next/navigation";

export default async function LegacyStoreBookingPage({
    params,
}: {
    params: Promise<{ storeId: string }>;
}) {
    const { storeId } = await params;
    if (!storeId) redirect("/studios");
    permanentRedirect(`/studio/${storeId}`);
}
