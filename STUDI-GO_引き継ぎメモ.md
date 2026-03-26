# Studi-Go 引き継ぎメモ
**最終更新: 2026年3月24日**

次のチャットでこのファイルを渡して「続きをお願いします」と伝えるだけで引き継ぎできます。

---

## 1. プロジェクト概要

**サービス名:** Studi-Go
**URL:** https://studi-go.com
**概要:** 音楽スタジオ向けのSaaS型予約管理プラットフォーム。スタジオオーナーが予約・顧客・決済を一元管理できる。
**フォルダ:** `~/Studi-Go_claude 2`
**GitHub:** `lkjhgfdsertyjhnbvcx/studi-go.git`
**Vercel:** studi-go.vercel.app（本番: studi-go.com）

---

## 2. 技術構成

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16.1.1 App Router / TypeScript / Turbopack |
| データベース | Firebase Firestore（Client SDK + Admin SDK + REST API） |
| 認証 | Firebase Auth |
| 決済 | Stripe |
| メール送信 | Resend（HTMLメールテンプレート実装済み） |
| ホスティング | Vercel（`npx vercel --prod` でデプロイ） |
| DNS | ムームードメイン（Aレコード: 76.76.21.21） |

### デプロイコマンド
```bash
cd ~/Studi-Go_claude\ 2
npx vercel --prod
```

### 主要ファイルパス
```
src/app/page.tsx                          # トップページ（公開スタジオ一覧）
src/app/admin/(protected)/page.tsx        # 管理ダッシュボード
src/app/admin/(protected)/plans/page.tsx  # プラン管理
src/app/admin/(protected)/studios/page.tsx # スタジオ管理
src/app/api/studios/route.ts              # スタジオAPI（GET/PATCH/DELETE）
src/app/api/admin/plans/route.ts          # プラン割り当てAPI
src/app/api/admin/plan-settings/route.ts  # プラン設定API
src/app/api/bookings/confirm/route.ts     # 予約確定・メール送信
```

---

## 3. 実装済み機能

| 機能 | 状態 | 備考 |
|------|------|------|
| リアルタイム予約・空き確認 | ✅ 稼働中 | |
| 顧客管理 | ✅ 稼働中 | |
| Stripe決済 | ✅ 稼働中 | |
| クーポン発行 | ✅ 稼働中 | |
| CSV出力 | ✅ 稼働中 | |
| 売上・KPIダッシュボード | ✅ 稼働中 | MRR・店舗数・ユーザー数・今月売上を表示 |
| 予約確認メール（HTML） | ✅ 稼働中 | Resend経由、終了時刻計算・曜日表示対応 |
| スタッフ管理 | ✅ 稼働中 | |
| 店舗公開/非公開ワンクリック切替 | ✅ 稼働中 | studiosページでインラインボタン |
| 複数ルーム・複数拠点管理 | ✅ 稼働中 | |
| プラン設計・店舗割り当て | ✅ 稼働中 | 月額 / 1回のみ の課金タイプ対応 |
| 店舗設定料 請求済みフラグ | ✅ 稼働中 | planSetupFeePaidフィールドで管理 |
| トップページ isPublished フィルタ | ✅ 稼働中 | クライアントサイドフィルタ + REST API |

---

## 4. 現在のプラン設定（Firestore: settings/planConfig）

### プラン
| ID | 名前 | 月額 | 対象 |
|----|------|------|------|
| basic | ベーシック | ¥3,300 | 小規模（1拠点・5ルームまで） |
| standard | スタンダード | ¥5,500 | 中規模（10ルームまたは2拠点×5ルーム） |
| premium | プレミアム | ¥12,000 | 大規模・複数拠点 |

### オプション
| ID | 名前 | 価格 | 課金タイプ |
|----|------|------|-----------|
| sms | SMS通知 | ¥5,000 | monthly（廃止検討中） |
| custom_domain | カスタムドメイン | ¥1,000 | monthly |
| setup_fee | 店舗設定料 | ¥12,000 | once（1回のみ） |

---

## 5. 検討中のプラン再設計案

### 新プラン構成（未実装・検討中）
| プラン | 月額 | 手数料 | ルーム | 拠点 |
|--------|------|--------|--------|------|
| 🔓 フリー | ¥0 | 5% | 1 | 1 |
| 🟢 ライト | ¥2,980 | なし | 5 | 1 |
| 🟣 スタンダード | ¥5,980 | なし | 15 | 2 |
| 🟡 プロ | ¥12,800 | なし | 無制限 | 無制限 |

**SMS通知は廃止推奨**（送信コスト¥8〜15/通のため、予約数が多い店舗では赤字になるリスクあり）
→ 将来的にLINE通知への置き換えを検討

詳細は `studi-go-plan-strategy.xlsx`（同フォルダ内）を参照。

---

## 6. 次に実装すべきタスク（優先順高い順）

### 🔴 最高優先
- [ ] **新プラン体系の確定・Firestoreへの反映**
  プラン管理画面（/admin/plans）から設定を更新するだけでOK

### 🟠 高優先（今月中）
- [ ] **自動リマインダーメール**（予約24時間前・2時間前に自動送信）
  ファイル: `src/app/api/bookings/confirm/route.ts` を参考に実装
  実装難易度: 低（メール基盤は実装済み）

- [ ] **稼働率ヒートマップ**（時間帯・曜日別の予約密度を可視化）
  スタンダード以上のプランの差別化機能
  実装難易度: 低

- [ ] **お気に入りスタジオ登録・再予約ワンタップ**
  ユーザーのリテンション向上
  実装難易度: 低

### 🔵 中優先（来月以降）
- [ ] **直前割引・タイムセール機能**（当日空き枠を自動で値引き表示）
- [ ] **スタジオ・部屋レビュー投稿機能**
- [ ] **トップページ優先掲載ロジック**（スタンダード以上を上位表示）
- [ ] **Googleカレンダー同期**（予約をユーザーのカレンダーに自動追加）

### 将来（スケール後）
- [ ] キャンセル待ち機能
- [ ] 定期予約（月額会員）管理
- [ ] Studi-Go共通ポイント制度
- [ ] LINE通知連携（SMS代替）
- [ ] Googleマイビジネス連携

---

## 7. 既知の問題・注意事項

| 問題 | 状態 | 対処法 |
|------|------|--------|
| studi-go.com DNS | ✅ 解決済み | ムームーDNS AレコードでVercelに向けている |
| 管理ダッシュボード500エラー | ✅ 解決済み | `planConfigSnap?.exists`（プロパティ）に修正済み |
| トップページに非公開スタジオが表示 | ✅ 解決済み | isPublished===trueのクライアントフィルタで対応 |

---

## 8. Firestore コレクション構成

```
studios/          # スタジオ情報（isPublished, planKey, planOptions, planSetupFeePaid）
users/            # ユーザー情報
bookings/         # 予約データ
settings/
  planConfig      # プラン設定（plans[], options[]）
```

---

*このファイルは次回チャット開始時に渡してください。*
