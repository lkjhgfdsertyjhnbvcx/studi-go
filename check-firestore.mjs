import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { readFileSync } from "fs";

const env = {};
try {
  const lines = readFileSync(".env.local", "utf-8").split("\n");
  for (const line of lines) {
    const [k, ...v] = line.split("=");
    if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^"|"$/g, "");
  }
} catch (e) {}

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);
const snap = await getDocs(collection(db, "studios"));

console.log("=== 現在のFirestoreデータ ===");
for (const d of snap.docs) {
  const data = d.data();
  console.log(`ID: ${d.id.slice(0,8)} | ${data.storeName?.slice(0,20)?.padEnd(20)} | isPublished: ${data.isPublished}`);
}

// isPublished: true のスタジオ以外を全て false に設定
const KEEP_PUBLISHED = "7776b09d-b4d8-4b6c-9c3d-0e1b2a3c4d5e"; // Studio JOCOLLA

console.log("\n=== 修正中... ===");
for (const d of snap.docs) {
  const data = d.data();
  if (data.isPublished !== false && d.id !== KEEP_PUBLISHED) {
    await updateDoc(doc(db, "studios", d.id), { isPublished: false });
    console.log(`修正: ${d.id.slice(0,8)} ${data.storeName?.slice(0,20)} → isPublished: false`);
  }
}

// JOCOLLA を確実に true に
for (const d of snap.docs) {
  const data = d.data();
  if (data.storeName?.includes("JOCOLLA") && !d.id.startsWith("801")) {
    await updateDoc(doc(db, "studios", d.id), { isPublished: true });
    console.log(`確認: ${d.id.slice(0,8)} ${data.storeName?.slice(0,20)} → isPublished: true`);
  }
}

console.log("\n完了！");
process.exit(0);
