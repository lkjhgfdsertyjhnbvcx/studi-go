// fix-firestore.mjs
// 実行: node fix-firestore.mjs
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// サービスアカウントキーファイルがある場合はそちらを使用
// なければ環境変数から読み込み
let credential;
try {
  const serviceAccount = require("./serviceAccountKey.json");
  credential = admin.credential.cert(serviceAccount);
  console.log("Using serviceAccountKey.json");
} catch {
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    credential = admin.credential.cert({
      projectId: "studi-go-488d1",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    console.log("Using env vars");
  } else {
    console.error("❌ 認証情報がありません。serviceAccountKey.json か環境変数を設定してください。");
    process.exit(1);
  }
}

if (!admin.apps.length) {
  admin.initializeApp({ credential, projectId: "studi-go-488d1" });
}

const db = admin.firestore();

async function main() {
  const snapshot = await db.collection("studios").get();
  console.log(`\n全スタジオ数: ${snapshot.size}`);
  console.log("─".repeat(60));

  for (const doc of snapshot.docs) {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`  名前: ${data.storeName}`);
    console.log(`  isPublished: ${data.isPublished} (型: ${typeof data.isPublished})`);
    console.log("─".repeat(60));
  }

  // Studio JOCOLLA (7776b09d...) だけ true に設定し、他は false に
  const PUBLISHED_ID = "7776b09d-b469-4d29-b419-f607e08c23b0";

  let fixCount = 0;
  for (const doc of snapshot.docs) {
    const shouldPublish = doc.id === PUBLISHED_ID;
    const current = doc.data().isPublished;

    if (current !== shouldPublish) {
      await db.collection("studios").doc(doc.id).update({ isPublished: shouldPublish });
      console.log(`✅ 修正: ${doc.data().storeName} → isPublished: ${shouldPublish}`);
      fixCount++;
    }
  }

  if (fixCount === 0) {
    console.log("\n✅ データは正しい状態です（修正不要）");
  } else {
    console.log(`\n✅ ${fixCount}件修正完了`);
  }

  // 最終確認
  const check = await db.collection("studios").where("isPublished", "==", true).get();
  console.log(`\n公開スタジオ: ${check.size}件`);
  check.docs.forEach(d => console.log(`  → ${d.data().storeName} (${d.id})`));
}

main().catch(console.error).finally(() => process.exit());
