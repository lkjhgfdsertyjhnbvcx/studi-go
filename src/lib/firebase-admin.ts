// Firebase Admin SDK
// Vercel / Cloud Run 両対応
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { cert, getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import * as fs from "fs";
import * as path from "path";

type AdminDb = ReturnType<typeof getFirestore>;
type AdminStorage = ReturnType<typeof getStorage>;

let _adminDb: AdminDb | null = null;
let _adminStorage: AdminStorage | null = null;

/**
 * サービスアカウントJSONを安全にパース。
 * 環境変数の末尾に余計な文字が混入しているケース（貼り付けミス等）も救済する。
 */
function parseServiceAccount(raw: string): Record<string, string> | null {
    const trimmed = raw.trim();
    try {
        return JSON.parse(trimmed);
    } catch {
        // 最初の { から対応する } までを取り出して再パース
        const start = trimmed.indexOf("{");
        if (start === -1) return null;
        let depth = 0, inStr = false, esc = false;
        for (let i = start; i < trimmed.length; i++) {
            const c = trimmed[i];
            if (inStr) {
                if (esc) esc = false;
                else if (c === "\\") esc = true;
                else if (c === '"') inStr = false;
            } else if (c === '"') inStr = true;
            else if (c === "{") depth++;
            else if (c === "}") {
                depth--;
                if (depth === 0) {
                    try {
                        const parsed = JSON.parse(trimmed.slice(start, i + 1));
                        console.warn("Firebase Admin: GCP_SERVICE_ACCOUNT に余分な文字が混入していたため先頭のJSONのみ使用しました");
                        return parsed;
                    } catch {
                        return null;
                    }
                }
            }
        }
        return null;
    }
}

function initializeAdmin(): AdminDb {
    if (_adminDb) return _adminDb;

    try {
        if (!getApps().length) {
            let credential: admin.credential.Credential;

            // 1. GCP_SERVICE_ACCOUNT 環境変数をチェック (Cloud Run Gen 2推奨)
            const saFromEnv = process.env.GCP_SERVICE_ACCOUNT
                ? parseServiceAccount(process.env.GCP_SERVICE_ACCOUNT)
                : null;
            if (saFromEnv) {
                credential = cert(saFromEnv);
                console.log("Firebase Admin: using GCP_SERVICE_ACCOUNT env var");
            } else if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
                // 1.5. Vercel 環境変数から個別に読み込む
                credential = cert({
                    projectId: process.env.FIREBASE_PROJECT_ID || "studi-go-488d1",
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                });
                console.log("Firebase Admin: using FIREBASE_CLIENT_EMAIL/PRIVATE_KEY env vars");
            } else {
                // 2. service-account.json をチェック
                const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

                if (fs.existsSync(serviceAccountPath)) {
                    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
                    credential = cert(serviceAccount);
                    console.log("Firebase Admin: using service-account.json");
                } else {
                    credential = applicationDefault();
                    console.log("Firebase Admin: using ADC");
                }
            }

            initializeApp({
                credential,
                storageBucket: "studi-go-488d1.firebasestorage.app",
                projectId: "studi-go-488d1",
            });
        }

        _adminDb = getFirestore();
        _adminStorage = getStorage();
        console.log("Firebase Admin initialized successfully");
        return _adminDb;
    } catch (error) {
        console.error("Firebase Admin initialization error:", error);
        throw error;
    }
}

// adminDb / adminStorage はゲッター経由で取得（null export 問題を回避）
const adminDb = new Proxy({} as AdminDb, {
    get(_target, prop) {
        const db = initializeAdmin();
        return (db as any)[prop];
    }
});

const adminStorage = new Proxy({} as AdminStorage, {
    get(_target, prop) {
        if (!_adminStorage) initializeAdmin();
        return (_adminStorage as any)[prop];
    }
});

export { adminDb, adminStorage, initializeAdmin };
