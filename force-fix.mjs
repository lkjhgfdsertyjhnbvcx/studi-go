import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { readFileSync } from "fs";

const env = {};
const lines = readFileSync(".env.local", "utf-8").split("\n");
for (const line of lines) {
  const [k, ...v] = line.split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^"|"$/g, "");
}

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);
const snap = await getDocs(collection(db, "studios"));

console.log("=== 全スタジオ一覧 ===");
for (const d of snap.docs) {
  const data = d.data();
  console.log(`ID: ${d.id} | ${data.storeName} | isPublished: ${data.isPublished}`);
}

console.log("\n=== 全スタジオを非公開に設定 ===");
for (const d of snap.docs) {
  await updateDoc(doc(db, "studios", d.id), { isPublished: false });
  console.log(`→ ${d.data().storeName}: isPublished: false`);
}

console.log("\n=== Studio JOCOLLA (スタジオ名が 'Studio JOCOLLA') のみ公開に設定 ===");
for (const d of snap.docs) {
  if (d.data().storeName === "Studio JOCOLLA") {
    await updateDoc(doc(db, "studios", d.id), { isPublished: true });
    console.log(`→ ${d.data().storeName} (${d.id}): isPublished: true`);
  }
}

console.log("\n完了！");
process.exit(0);
