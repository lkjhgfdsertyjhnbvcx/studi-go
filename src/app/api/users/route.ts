import { NextRequest, NextResponse } from "next/server";
import { getAllUsersFromFirestore, saveUserToFirestore } from "@/lib/db-firestore";
import { getApiAuth } from "@/lib/api-auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ユーザー一覧（GET）
// storeId パラメータがある場合：その店舗の予約に紐づくユーザーのみ返す
// storeId なし＋プラットフォーム管理者：全ユーザー返す
export async function GET(request: NextRequest) {
    try {
        const auth = await getApiAuth();
        if (!auth.isAdmin && !auth.studioId) {
            return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
        }

        const storeId = request.nextUrl.searchParams.get("storeId");

        // 店舗ユーザーの場合は自店舗のデータのみ許可
        if (auth.studioId && storeId && storeId !== auth.studioId) {
            return NextResponse.json({ error: "他店舗のデータにはアクセスできません" }, { status: 403 });
        }

        const effectiveStoreId = storeId || auth.studioId;

        if (effectiveStoreId) {
            // 店舗に紐づくユーザーのみ取得
            // 1. その店舗の予約からuserIdを収集
            const bookingsSnap = await getDocs(
                query(collection(db, "bookings"), where("studioId", "==", effectiveStoreId))
            );
            const userIds = new Set<string>();
            bookingsSnap.docs.forEach(doc => {
                const uid = doc.data().userId;
                if (uid) userIds.add(uid);
            });

            // 2. 店舗にCSVインポートされた顧客も含める
            try {
                const custSnap = await getDocs(collection(db, `studios/${effectiveStoreId}/customers`));
                custSnap.docs.forEach(doc => userIds.add(doc.id));
            } catch { /* subcollection may not exist */ }

            if (userIds.size === 0) {
                return NextResponse.json([]);
            }

            // 3. 該当ユーザーのみ取得
            const allUsers = await getAllUsersFromFirestore();
            const filtered = allUsers
                .filter(u => userIds.has(u.id))
                .map(({ password, ...u }) => u);
            return NextResponse.json(filtered);
        }

        // プラットフォーム管理者：全ユーザー（管理画面用）
        if (auth.isAdmin) {
            const users = await getAllUsersFromFirestore();
            const safeUsers = users.map(({ password, ...u }) => u);
            return NextResponse.json(safeUsers);
        }

        return NextResponse.json({ error: "権限がありません" }, { status: 403 });
    } catch (error) {
        return NextResponse.json({ error: "取得失敗" }, { status: 500 });
    }
}

// ブラックリスト更新（PUT）
export async function PUT(request: Request) {
    try {
        const auth = await getApiAuth();
        if (!auth.isAdmin && !auth.studioId) {
            return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
        }

        const body = await request.json();
        const users = await getAllUsersFromFirestore();
        const user = users.find((u) => u.id === body.id);
        if (!user) return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });

        await saveUserToFirestore({ ...user });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
