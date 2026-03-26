// Firebase Admin SDK
// Cloud Run と ローカル両対応: GCP_SERVICE_ACCOUNT 環境変数またはservice-account.json を読み込む
// eslint-disable-next-line no-eval
const requireFn = eval('require') as NodeRequire;
const admin = requireFn('firebase-admin') as typeof import('firebase-admin');

type AdminDb = ReturnType<typeof admin.firestore>;
type AdminStorage = ReturnType<typeof admin.storage>;

let _adminDb: AdminDb | null = null;
let _adminStorage: AdminStorage | null = null;

function initializeAdmin(): AdminDb {
    if (_adminDb) return _adminDb;

    try {
        if (!admin.apps.length) {
            let credential: ReturnType<typeof admin.credential.cert>;

            // 1. GCP_SERVICE_ACCOUNT 環境変数をチェック (Cloud Run Gen 2推奨)
            if (process.env.GCP_SERVICE_ACCOUNT) {
                const serviceAccount = JSON.parse(process.env.GCP_SERVICE_ACCOUNT);
                credential = admin.credential.cert(serviceAccount);
                console.log("Firebase Admin: using GCP_SERVICE_ACCOUNT env var");
            } else if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
                // 1.5. Vercel 環境変数から個別に読み込む
                credential = admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID || "studi-go-488d1",
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                });
                console.log("Firebase Admin: using FIREBASE_CLIENT_EMAIL/PRIVATE_KEY env vars");
            } else {
                // 2. service-account.json をチェック
                const path = requireFn('path');
                const fs = requireFn('fs');
                const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

                if (fs.existsSync(serviceAccountPath)) {
                    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
                    credential = admin.credential.cert(serviceAccount);
                    console.log("Firebase Admin: using service-account.json");
                } else {
                    credential = admin.credential.applicationDefault();
                    console.log("Firebase Admin: using ADC");
                }
            }

            admin.initializeApp({
                credential,
                storageBucket: "studi-go-488d1.firebasestorage.app",
                projectId: "studi-go-488d1",
            });
        }

        _adminDb = admin.firestore();
        _adminStorage = admin.storage();
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
