"use server";

import * as admin from 'firebase-admin';
import {
    getAllStudiosFromFirestore,
    getAllUsersFromFirestore,
    getAllBookingsFromFirestore,
    getAllPaymentsFromFirestore,
    getAllCampaignsFromFirestore,
    getAllCouponsFromFirestore
} from '@/lib/db-firestore';

// サービスアカウント情報を直接埋め込み
const CREDENTIALS = {
    "project_id": "studi-go-488d1",
    "client_email": "backup-bot@studi-go-488d1.iam.gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCu8U5450nxerGA\nQn7un/7rW1XismghcFjwdIz/FPsQU4J+hRHJWdWqvIGawDxFRiKSTg/n6oiwR+1k\n/aUjfLCX84nAcwoej8l/hSKWRs3Pd9MGwOfilx9HxxNHrLQV1URF28d8Agvspek/\ngMWlRPwdUrZSvjpV5qT49RyhfelNoZd+GRX4nZwmovx/FUIGSo0h589CfiUudFlr\nMVq7lAHYge3QrtbkASQDVlQ0p/0SC30QkNpdDWr75ZraFKuUt0Pssm7cePMb+mBn\nFtpOMyzR5xppNbjNcWnCYNdosq16/NB3wNweyhen+PfvUZlOxuEHjWKFaas94C4h\njk2Djuh/AgMBAAECggEAGzJnhTNL0w9EfhCYZCeafWNvKDWdK6moIgW0j8lmuKSK\n8nlkiP1+0rLIoVLGa+yZ3k3leiQDiQg9l0g5fplZaN4TKciYp6Sp6jm75UnvoBPc\nSj3+LsNYuRNxY2CthIFpwkSHMDevO+SVLOqrj2R4n2Rm9Nke/5DCT/PnNhH5jbhS\nFMcbNfcShEAmkwXQqosbkjOQK+8+CU8rz6cvEe3zVFqPp9nzcrSNRMhLmrjXA9tG\nGyVHtAOe8R4dnGNzcBxl2/k2cPmd0vf+T9l0KwRa9ZJaz2BKJX6YowdVgS8dKHXy\nWZNNtgV27gD+f4xr05qTIZLYqsH1rUTx8FY6a+z4+QKBgQDc+Yn7d8katraQ2RWZ\n6Yt5mCNobcQoWNo0qFQGurCiyBc1j8x+IetyRk7nG0GsxDvJbSHAb7Hylc7RSRm1\nx0Vg8rN3g5yji3qj+nZEQz8yVTiyPj74utMsqA3JjBbTdsd3VzPOXEgUsfPKnn7J\nBuoPiTp+370zEJTBb2Ksr0zmaQKBgQDKq+1j+JAMndmuPdPYGDq1Lk3IhbgEFQDY\nN9cqpIK0JZ0cRWqzMlMA1yI57c6LYjggugAVj3Oxd6Np9dxy1GvrfCyCh6gw8iHO\nfn9+hnYLs0+IX8B6DQvpd3GIFqkIzMOxm+4fTWohU7fmm+ppD5trym6fafUsmodI\nbnnNbLCKpwKBgQCxL46KiyRAPV3qi4ccoP3rhChwJgPx7j0ZmBe4RZ45CIRDuIha\nY0xtlx7RhTOGGtttygoUSfu/7oulmR36ekyRTkrFfEzvfnnaXozSc7GK5HbPxcWs\nn/GQjzhu8dujuEx8zvmFcM2DeqVnROuYueiYiIrVDQaimZsN+AiBOxdIcQKBgQC7\nF3l+pw+7ReCUU+kC/GL9rHALoz1bL1RnRS0w5UrvKCXf2kkEgXlUNkUXOutHinUL\n6Qh43sNLWYkWIOvPaT7y1N914+sku/DvYaEqWNASPwY1e0cApJiRfjzlBx4lzHj+\ntVZduSY2+8Sxcs8zC0BLgkUajkLRWRl3iNySATr70wKBgQC/4A1YMNlBBZb3EtRE\n8yq2fb4Tb29ChndlGr/y4L2x0EW5awGrddvDmNcPtan0FXH6K43ZgtrFBXWTMNUg+W/a1BD1W5fuwP1Cfqk+sW6e1i5nZxXQ+g6dhdYS0ygHFaRpaEDNgl4FjUbFBN0imIx46BOImG2CE4uQLGAbXl/QKA==\n-----END PRIVATE KEY-----\n",
};

export async function backupToFirebaseStorage() {
    try {
        console.log("Starting debug backup action...");

        // 1. Firebase初期化チェック
        try {
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: CREDENTIALS.project_id,
                        clientEmail: CREDENTIALS.client_email,
                        privateKey: CREDENTIALS.private_key.replace(/\\n/g, '\n'),
                    }),
                    storageBucket: "studi-go-488d1.firebasestorage.app"
                });
            }
        } catch (initErr: any) {
            return { success: false, message: `初期化フェーズで失敗: ${initErr.message}` };
        }

        // 2. データ取得テスト
        let data;
        try {
            data = {
                studios: await getAllStudiosFromFirestore(),
                backupAt: new Date().toISOString()
            };
        } catch (dbErr: any) {
            return { success: false, message: `DB取得フェーズで失敗: ${dbErr.message}` };
        }

        // 3. ストレージ保存テスト
        try {
            const timestamp = Date.now();
            const fileName = `debug_backups/test_${timestamp}.json`;
            const content = JSON.stringify(data);

            const bucket = admin.storage().bucket();
            const file = bucket.file(fileName);

            await file.save(content, { contentType: 'application/json' });
            return { success: true, message: `成功(DEBUG): ${fileName}` };
        } catch (stErr: any) {
            return { success: false, message: `ストレージ保存フェーズで失敗: ${stErr.message}` };
        }

    } catch (globalErr: any) {
        // 最終手段：ここでもエラーを投げず、すべて文字列にして返す
        return {
            success: false,
            message: `致命的な全体エラー: ${globalErr.message || "不明なエラー"}`
        };
    }
}
