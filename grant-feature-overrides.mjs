// 店舗ごとの機能例外（studios.featureOverrides）を付与／確認するスクリプト。
//
// 背景（260808）:
//   プラン別の機能制限は仕様としては最初からあったが実装されていなかった。
//   あとから実装すると、すでにその機能を使って公開している店舗を巻き込んでしまうため、
//   店舗ごとの例外フラグで救済する。営業上「この店舗だけ開放する」にも使える。
//
// 使い方（プロジェクトルートで実行）:
//   node grant-feature-overrides.mjs                       … 全店舗の現状を表示するだけ
//   node grant-feature-overrides.mjs <studioId> page_design equipment_options
//                                                          … 指定の機能を true にする
//   node grant-feature-overrides.mjs <studioId> --remove page_design
//                                                          … 例外を外す（プラン通りに戻す）
//
// service-account.json（.gitignore 済み）を使うため、ローカルでのみ実行できる。
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const sa = JSON.parse(readFileSync("./service-account.json", "utf-8"));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

const [, , studioId, ...rest] = process.argv;
const remove = rest[0] === "--remove";
const features = remove ? rest.slice(1) : rest;

const snap = await db.collection("studios").get();
const studios = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

if (!studioId) {
    console.log("=== 現在の店舗一覧 ===\n");
    for (const s of studios) {
        const ov = s.featureOverrides || {};
        const keys = Object.keys(ov);
        console.log(
            `${s.id}\n  ${s.storeName}  / plan=${s.planKey ?? "(未設定)"} / ${s.isPublished ? "公開中" : "非公開"}`
                + `\n  featureOverrides: ${keys.length ? keys.map((k) => `${k}=${ov[k]}`).join(", ") : "(なし)"}\n`,
        );
    }
    console.log("付与するには: node grant-feature-overrides.mjs <studioId> page_design equipment_options");
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
