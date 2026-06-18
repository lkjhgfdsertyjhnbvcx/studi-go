# Studi-Go セキュリティ・バグ監査レポート

監査日: 2026-06-10 / 対象: `~/Studi-Go_claude 2`（Next.js 14 App Router + Firebase + Stripe）

実コードを精査した結果です。**最優先の構造的問題は「APIの認可がクライアント送信の `userId` 任せで、Firebase IDトークン検証が全57ルートでゼロ」「Firestoreルールが全公開」「秘密鍵がGitに混入」の3点**で、これらが他の脆弱性を増幅しています。

---

## 🔴 重大（即対応）

### 1. Firebaseサービスアカウント秘密鍵がGitに含まれている
`vercel-env-import.txt` がリポジトリに追跡されたままで、中身に `FIREBASE_PRIVATE_KEY`（BEGIN PRIVATE KEY…）が平文で入っています。
- 該当: `vercel-env-import.txt`（`git ls-tree HEAD` に存在、コミット `1ee23d66` で追加）
- 影響: この鍵があればAdmin SDKで**全Firestore/Storageを無制限に読み書き**できます。GitHub等にpush済みなら即漏洩。
- 対処:
  1. **Google Cloudで該当サービスアカウント鍵を即時失効・ローテーション**（最優先。ファイル削除だけでは無意味）。
  2. `git rm --cached vercel-env-import.txt service-account.json` し、両方を `.gitignore` へ。履歴からは `git filter-repo` 等で除去。
  3. 値はVercelの環境変数のみで管理。

### 2. Firestoreセキュリティルールが実質「全公開」
```
// firestore.rules 13-46行
match /users/{userId}    { allow read, create, update: if true; }
match /studios/{studioId}{ allow read, create, update: if true; }
match /settings/{docId}  { allow read, write: if true; }   // ← write:true が特に危険
match /bookings/{id}     { allow read, create, update: if true; }
```
- 影響: クライアントSDK経由で**誰でも全ユーザーの個人情報を閲覧・改ざん**可能。`settings` は `write:true` のため任意の値を書き込め、後述のXSS（#4）に直結。「API経由でバリデーション」とコメントされていますが、ルールが開いている以上APIを通さず直接書けます。
- 対処: 最低限 `isSignedIn()` を必須化し、所有者チェック（`request.auth.uid == userId` / studio.ownerId）を入れる。書き込みはAdmin SDK（サーバー）に限定すべきものは `if false`。

### 3. API全57ルートでIDトークン検証がゼロ → 認可がクライアント任せ（IDOR）
`verifyIdToken` の使用箇所は**0件**。`middleware.ts` も `/api/` を明示的にスキップ（27行）。認可は本人が送ってきた `userId` の文字列一致だけで判定しています。
```ts
// src/app/api/cancel-booking/route.ts 22行
if (booking.userId !== userId) { return 403 } // userId はリクエストbody由来
```
- 影響: bookings は誰でも読めるため、攻撃者は被害者の `userId` を取得→他人の予約を**キャンセル・返金**実行できる。同パターンが `users/update`, `my-bookings`, `store/*` 全体に及ぶ。
- 対処: 各ルート先頭で `Authorization: Bearer <idToken>` を受け取り `adminAuth.verifyIdToken()` で検証、`decoded.uid` を信頼の起点にする。共通ヘルパ化推奨。

### 4. 管理API（/api/admin/*）が無認証 + ハードコードfallbackパスワード
`/api/admin/*` も無認証。さらにログインは固定値フォールバックあり：
```ts
// src/app/api/admin/login/route.ts
const adminPassword = process.env.ADMIN_PASSWORD ?? "password123";
// 成功時に {success:true} を返すだけ。セッション/署名付きCookieを発行していない
```
- 影響: ① 環境変数未設定時は `kantoku@studi-go.com / password123` で突破。② ログイン成功してもトークンを発行しないため、`/api/admin/migrate`・`users-import`・`reconcile` などは**ログイン自体を経由せず直接叩ける**。
- 対処: フォールバック削除。管理者はFirebase Authのカスタムクレーム（`admin:true`）で判定し、全 `admin/*` で検証。

### 5. 決済金額をクライアントが指定（価格改ざん）
```ts
// src/app/api/stripe/route.ts
const { totalPrice } = await req.json();
...
unit_amount: totalPrice,   // 98行: クライアント送信額をそのまま課金
```
`bookings/create` でも `totalPrice: parseInt(data.totalPrice ?? "0")` とクライアント値を保存。
- 影響: 利用者が `totalPrice` を改ざんし**1円や0円で予約・決済**できる。
- 対処: サーバー側でstudioの料金設定・時間帯・人数から金額を再計算し、クライアント値は無視する。

### 6. ダブルブッキング（TOCTOU / 競合状態）
```ts
// src/app/api/bookings/create/route.ts
const available = await checkAvailabilityFromFirestore(...); // 全予約をgetして判定
if (!available) return 409;
await saveBookingToFirestore(newBooking);   // 別オペレーション。トランザクション無し
```
`checkAvailabilityFromFirestore` は `getAllBookingsFromFirestore()` で全件取得→メモリ上filter（db-firestore.ts 275行）。
- 影響: 同一スロットへの同時2リクエストが両方チェックを通過し**二重予約**成立。決済必須でもなく `status:"active"` で即確定。
- 対処: `db.runTransaction()` 内で「同スロット予約の不在確認→作成」を原子的に実行。確実性を上げるなら `studioId_date_room_startTime` を**ドキュメントIDにしてcreate（存在時失敗）**で一意制約化。全件取得もコスト・スケール面で要改善。

### 7. ステータス保存型XSS（settings開放 × dangerouslySetInnerHTML）
```tsx
// src/app/booking/complete/page.tsx 17行
fetch('/api/admin/config') → adCode を <div dangerouslySetInnerHTML={{__html: adCode}}/>
// src/app/pay/success/page.tsx 39行: settings.customHtml も同様
```
`adCode`/`customHtml` は `settings` コレクション由来。#2の通り `settings` は誰でも書けるため、任意の `<script>`/`<img onerror>` を仕込み、**全利用者の予約完了・決済成功ページで任意JS実行**が可能（トークン窃取等）。
- 対処: settings書き込みをサーバー限定にする（#2）＋ 出力をDOMPurify等でサニタイズ。広告埋め込みが必須なら信頼できる管理者のみが設定でき、許可tagを限定する。

---

## 🟡 中

### 8. Stripe Webhookに冪等性がない
署名検証は実装済み（`webhooks/stripe/route.ts` 30行、これは◎）。ただし同一イベントの二重処理対策がなく、Stripeは重複配信し得る。特に:
```ts
data: { activaCouponBalance: { decrement: 1 } } // 62-66行
```
は非冪等で、再配信時にクーポンが**多重減算**される。
- 対処: `processed_events` に `event.id` を記録し処理済みはskip。

### 9. Webhookでの予約確定失敗を握りつぶし200返却
`adminDb...update(...)` を try/catchで囲み、失敗しても最後に `received:true`（153行）。Stripeは成功とみなし再試行しないため、**入金済みなのにbookingがpendingのまま**になり得る。
- 対処: 重要更新の失敗時は500を返しStripeに再試行させる、または失敗をDLQ/再処理キューへ。

### 10. ファイルアップロードが無認証・無検証
`src/app/api/upload/route.ts`: 認証なし、MIME/サイズ/拡張子チェックなしで `public/uploads` に保存。`.svg`/`.html` を上げると公開URL経由でXSSになり得る。
- 対処: 認証必須化、拡張子・content-type・サイズ制限、Firebase Storageへ保存しルールで制御。

### 11. Cronエンドポイントが無防備
`vercel.json` の `/api/cron/unpaid-members`・`split-payment-timeout` に `CRON_SECRET` 等の検証なし。外部から叩いて未払い処理・タイムアウト処理を**任意に発火**できる。
- 対処: `Authorization` ヘッダで `process.env.CRON_SECRET` を検証（Vercel Cronはヘッダ付与可）。

### 12. 入力バリデーション不在（zod等なし）
全ルートで型・必須・範囲チェックがほぼ無く、`data.xxx` を直接Firestoreへ。NoSQLのため古典的SQLiは起きにくいが、想定外フィールドの混入・型崩れ・大量データ投入が可能。
- 対処: 各ルートで `zod` スキーマ検証を入れる。

---

## 🟢 軽微

13. **エラー詳細の露出**: 多くのルートが `error.message` をそのままレスポンス（`bookings/create` 等）。内部情報がクライアントに漏れる。汎用メッセージに。
14. **二重送信防止なし**: 予約作成にidempotency keyやボタン無効化がなく、連打で重複作成の余地（#6と複合）。
15. **データストア二重持ち**: Webhookが Prisma と Firestore 双方を更新（`webhooks/stripe`）。整合ズレの温床。どちらを真実源にするか整理を。
16. **`status` 表記ゆれ**: `active` / `confirmed` / `Confirmed`（Prisma）/ `pending` が混在。状態遷移バグの温床。enumで統一を。
17. **`firestore.rules` のStorageルール不在**: `firebase.json` にstorage設定がなく、Storageルールが管理外。公開範囲を明示的に定義すべき。

---

## 推奨対応順
1. **秘密鍵ローテーション + Gitから除去**（#1）— 最優先、数十分で着手可
2. **IDトークン検証の共通ヘルパ導入 → 全API適用**（#3,#4）
3. **Firestoreルールを所有者ベースに**（#2）— #7のXSSも同時に塞がる
4. **決済金額のサーバー再計算**（#5）
5. **予約をトランザクション化**（#6）
6. Webhook冪等性・cron保護・upload検証（#8〜#11）

> 注: 本レポートは静的コードレビューに基づきます。各修正後は実機での回帰確認（特に予約同時実行・決済フロー）を推奨します。
