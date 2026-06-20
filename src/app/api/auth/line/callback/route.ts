// /api/auth/line/callback - LINEからのコールバック処理
import { NextResponse } from "next/server";
// 他のルートと同じ共有のFirebase Admin初期化を使う（GCP_SERVICE_ACCOUNT /
// FIREBASE_CLIENT_EMAIL+PRIVATE_KEY を解決）。独自のeval('require')初期化はVercelで
// FIREBASE_SERVICE_ACCOUNTが無くADCにフォールバックして失敗していたため廃止。
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // LINEがキャンセルした場合
    if (error) {
        return NextResponse.redirect(`${baseUrl}/login?error=line_cancelled`);
    }

    if (!code) {
        return NextResponse.redirect(`${baseUrl}/login?error=line_no_code`);
    }

    // stateからリダイレクト先を取得
    let redirectAfter = "/";
    try {
        if (state) {
            const decoded = JSON.parse(Buffer.from(state, "base64url").toString());
            redirectAfter = decoded.redirect || "/";
        }
    } catch {}

    const channelId = process.env.LINE_CHANNEL_ID;
    const channelSecret = process.env.LINE_CHANNEL_SECRET;
    const callbackUrl = `${baseUrl}/api/auth/line/callback`;

    if (!channelId || !channelSecret) {
        return NextResponse.redirect(`${baseUrl}/login?error=line_config`);
    }

    try {
        // Step 1: コードをアクセストークンに交換
        const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: callbackUrl,
                client_id: channelId,
                client_secret: channelSecret,
            }),
        });

        if (!tokenRes.ok) {
            console.error("LINE token error:", await tokenRes.text());
            return NextResponse.redirect(`${baseUrl}/login?error=line_token`);
        }

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // Step 2: LINEプロフィール取得
        const profileRes = await fetch("https://api.line.me/v2/profile", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!profileRes.ok) {
            return NextResponse.redirect(`${baseUrl}/login?error=line_profile`);
        }

        const profile = await profileRes.json();
        const lineUserId: string = profile.userId;
        const lineDisplayName: string = profile.displayName || "";
        const linePictureUrl: string = profile.pictureUrl || "";

        // Step 3: メールアドレス取得（scope: emailが許可されている場合）
        let lineEmail = "";
        try {
            if (tokenData.id_token) {
                const emailRes = await fetch("https://api.line.me/oauth2/v2.1/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        id_token: tokenData.id_token,
                        client_id: channelId,
                    }),
                });
                if (emailRes.ok) {
                    const emailData = await emailRes.json();
                    lineEmail = emailData.email || "";
                }
            }
        } catch {}

        // Step 4: Firestoreで既存ユーザー検索（lineUserId で検索）
        const usersSnap = await adminDb
            .collection("users")
            .where("lineUserId", "==", lineUserId)
            .limit(1)
            .get();

        let userId: string;
        let userName: string;

        if (!usersSnap.empty) {
            // 既存ユーザー → プロフィール情報を更新
            const userDoc = usersSnap.docs[0];
            userId = userDoc.id;
            const userData = userDoc.data();
            userName = userData.name || lineDisplayName;

            await adminDb.collection("users").doc(userId).update({
                lineDisplayName,
                linePictureUrl,
                ...(lineEmail && !userData.email ? { email: lineEmail } : {}),
            });
        } else {
            // 新規ユーザー作成
            userId = crypto.randomUUID();
            userName = lineDisplayName;

            const newUser = {
                id: userId,
                name: lineDisplayName,
                email: lineEmail,
                phone: "",
                createdAt: new Date().toISOString(),
                authProvider: "line",
                lineUserId,
                lineDisplayName,
                linePictureUrl,
                isJocollaUser: false,
                myStudios: [],
            };

            await adminDb.collection("users").doc(userId).set(newUser);
        }

        // Step 5: クライアントにユーザー情報を渡す（localStorageへ保存させるためリダイレクト）
        const successUrl = new URL(`${baseUrl}/api/auth/line/session`);
        successUrl.searchParams.set("userId", userId);
        successUrl.searchParams.set("userName", userName);
        successUrl.searchParams.set("lineDisplayName", lineDisplayName);
        successUrl.searchParams.set("linePictureUrl", linePictureUrl);
        successUrl.searchParams.set("redirect", redirectAfter);

        return NextResponse.redirect(successUrl.toString());

    } catch (err: any) {
        console.error("LINE callback error:", err);
        const msg = encodeURIComponent(err?.message || "unknown_callback_error");
        return NextResponse.redirect(`${baseUrl}/login?error=line_callback&msg=${msg}`);
    }
}
