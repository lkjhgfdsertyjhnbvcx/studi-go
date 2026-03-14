// Firebase Admin SDK
// Cloud Run と ローカル両対応: service-account.json を直接読み込む
// eslint-disable-next-line no-eval
const requireFn = eval('require') as NodeRequire;
const admin = requireFn('firebase-admin') as typeof import('firebase-admin');

let adminDb: ReturnType<typeof admin.firestore>;
let adminStorage: ReturnType<typeof admin.storage>;

try {
    if (!admin.apps.length) {
        // service-account.json を process.cwd() から探す
        // Cloud Run では /workspace/service-account.json
        // ローカルでは プロジェクトルート/service-account.json
        const path = requireFn('path');
        const fs = requireFn('fs');
        const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

        let credential: admin.credential.Credential;

        if (fs.existsSync(serviceAccountPath)) {
            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
            credential = admin.credential.cert(serviceAccount);
            console.log("Firebase Admin: using service-account.json");
        } else {
            // フォールバック: Application Default Credentials (Cloud Run IAM)
            credential = admin.credential.applicationDefault();
            console.log("Firebase Admin: using ADC");
        }

        admin.initializeApp({
            credential,
            storageBucket: "studi-go-488d1.firebasestorage.app",
            projectId: "studi-go-488d1",
        });
    }

    adminDb = admin.firestore();
    adminStorage = admin.storage();
    console.log("Firebase Admin initialized successfully");
} catch (error) {
    console.error("Firebase Admin initialization error:", error);
    // エラーを再スローしてdynamic importのcatch側で詳細を表示できるようにする
    throw error;
}

export { adminDb, adminStorage };
