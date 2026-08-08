// 店舗ごとの機能例外（studios.featureOverrides）を付与／確認するスクリプト。
//
// 背景（260808）:
//   プラン別の機能制限は仕様としては最初からあったが実装されていなかった。
//   あとから実装すると、すでにその機能を使って公開している店舗を巻き込んでしまうため、
//   店舗ごとの例外フラグで救済する。営業上「この店舗だけ開放する」にも使える。
//
// 認証について:
//   アプリ本体（src/lib/firebase-admin.ts）と同じ順序で資格情報を探す。
//     1. .env.local / 環境変数の FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY  ← 本番と同じ
//     2. GCP_SERVICE_ACCOUNT（JSON文字列）
//     3. service-account.json
//   260808: 3 の service-account.json は鍵が失効しており UNAUTHENTICATED になる。
//   本体は 1 を使っているため気づけない状態だった。1 を最優先にする。
//
// 使い方（プロジェクトルートで実行）:
//   node grant-feature-overrides.mjs                       … 全店舗の現状を表示するだけ
//   node grant-feature-overrides.mjs <studioId> page_design equipment_options
//                                                          … 指定の機能を true にする
//   node grant-feature-overrides.mjs <studioId> --remove page_design
//                                                          … 例外を外す（プラン通りに戻す）
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync, existsSync } from "fs";

// ---- 環境変数ファイルを読む（KEY="value" 形式。値の \n は改行に戻す） ----
//
// 260808: .env.local の FIREBASE_PRIVATE_KEY も service-account.json と同じ鍵で、
// GCP 側で失効していた（UNAUTHENTICATED）。本番が動いているのは Vercel 側の
// 環境変数に生きている鍵が入っているため。
//   npx vercel env pull .env.vercel.local
// で取り出したファイルがあれば、そちらを優先する（.env.local は壊さない）。
const ENV_FILES = [".env.local", ".env.vercel.local"]; // 後のものが優先

function loadEnvFile(file) {
    const out = {};
    if (!existsSync(file)) return out;
    for (const line of readFileSync(file, "utf-8").split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
        ) {
            val = val.slice(1, -1);
        }
        out[key] = val;
    }
    return out;
}

let envFileUsed = "(なし)";
const fromFiles = {};
for (const f of ENV_FILES) {
    const loaded = loadEnvFile(f);
    if (loaded.FIREBASE_PRIVATE_KEY) envFileUsed = f;
    Object.assign(fromFiles, loaded);
}
const env = { ...fromFiles, ...process.env };

function resolveCredential() {
    if (env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
        return {
            source: `${envFileUsed} の FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY`,
            credential: cert({
                projectId: env.FIREBASE_PROJECT_ID || "studi-go-488d1",
                clientEmail: env.FIREBASE_CLIENT_EMAIL,
                privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            }),
        };
    }
    if (env.GCP_SERVICE_ACCOUNT) {
        return {
            source: "GCP_SERVICE_ACCOUNT 環境変数",
            credential: cert(JSON.parse(env.GCP_SERVICE_ACCOUNT)),
        };
    }
    if (existsSync("./service-account.json")) {
        return {
            source: "service-account.json（※鍵が失効している可能性があります）",
            credential: cert(JSON.parse(readFileSync("./service-account.json", "utf-8"))),
        };
    }
    console.error(
        "資格情報が見つかりません。プロジェクトルート（~/Studi-Go_claude 2）で実行しているか確認してください。",
    );
    process.exit(1);
}

const { source, credential } = resolveCredential();
console.log(`認証: ${source}\n`);
initializeApp({ credential, projectId: env.FIREBASE_PROJECT_ID || "studi-go-488d1" });
const db = getFirestore();

const [, , studioId, ...rest] = process.argv;
const remove = rest[0] === "--remove";
const features = remove ? rest.slice(1) : rest;

let snap;
try {
    snap = await db.collection("studios").get();
} catch (e) {
    console.error("Firestore に接続できませんでした:", e.message);
    console.error(
        "\n鍵が失効している可能性があります。Vercel から現行の値を取り出してください:\n" +
        "  npx vercel env pull .env.vercel.local\n" +
        "（.env.local は上書きされません。このスクリプトは .env.vercel.local を優先して読みます）",
    );
    process.exit(1);
}
const studios = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

if (!studioId) {
    console.log(`=== 店舗一覧（${studios.length}件） ===\n`);
    for (const s of studios) {
        const ov = s.featureOverrides || {};
        const keys = Object.keys(ov);
        console.log(`${s.id}`);
        console.log(
            `  ${s.storeName}  / plan=${s.planKey ?? "(未設定)"} / ${s.isPublished ? "公開中" : "非公開"}`,
        );
        console.log(
            `  featureOverrides: ${keys.length ? keys.map((k) => `${k}=${ov[k]}`).join(", ") : "(なし)"}\n`,
        );
    }
    console.log("付与するには:");
    console.log("  node grant-feature-overrides.mjs <studioId> page_design equipment_options");
    process.exit(0);
}

const target = studios.find((s) => s.id === studioId);
if (!target) {
    console.error(`スタジオが見つかりません: ${studioId}`);
    process.exit(1);
}
if (!features.length) {
    console.error("機能キーを1つ以上指定してください（例: page_design equipment_options）");
    process.exit(1);
}

const next = { ...(target.featureOverrides || {}) };
for (const f of features) {
    if (remove) delete next[f];
    else next[f] = true;
}

await db.collection("studios").doc(studioId).update({
    featureOverrides: next,
    updatedAt: new Date().toISOString(),
});

console.log(`✅ ${target.storeName} を更新しました`);
console.log(`   featureOverrides: ${JSON.stringify(next)}`);
