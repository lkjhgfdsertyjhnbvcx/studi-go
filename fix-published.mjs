import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { readFileSync } from "fs";

// .env.local から Firebase 設定を読み込む
const env = {};
try {
  const lines = readFileSync(".env.local", "utf-8").split("\n");
  for (const line of lines) {
    const [k, ...v] = line.split("=");
    if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^"|"$/g, "");
  }
} catch (e) {}

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("Firebase project:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// isPublished: false にする3スタジオ
const studioIds = [
  "1cbd89b9-42c0-4cb4-8767-bbc14e78c914", // スタジオ・イマージュ
  "7792dea0-e5ad-4c71-a23f-73964950b136", // Studio DAM
  "801ed34f-8eec-4581-b80a-1109e28ce3da", // スタジオ JOCOLLA
];

for (const id of studioIds) {
  await updateDoc(doc(db, "studios", id), { isPublished: false });
  console.log("Updated:", id);
}

console.log("Done! 3 studios set to isPublished: false");
process.exit(0);
