// 一般ユーザー用の署名付きセッションクッキー（IDOR対策）
// - ログイン成功時（LINE / メール）にHMAC署名付きの userId をHttpOnly Cookieで発行
// - APIはクッキーの署名を検証した userId を信頼の起点にする
//   （クッキーが無い場合は互換のためbody/query由来にフォールバック。
//     REQUIRE_USER_SESSION=1 で厳格モード＝クッキー必須に切替可能）
import { cookies } from "next/headers";
import crypto from "crypto";

export const USER_SESSION_COOKIE = "sg_uid";
const MAX_AGE = 60 * 60 * 24 * 30; // 30日

function getSecret(): string {
    return (
        process.env.USER_SESSION_SECRET ||
        process.env.LINE_CHANNEL_SECRET ||
        process.env.CRON_SECRET ||
        ""
    );
}

function sign(userId: string): string {
    const secret = getSecret();
    return crypto.createHmac("sha256", secret).update(userId).digest("base64url");
}

/** ログイン成功時に発行するクッキー値を作る */
export function createUserSessionValue(userId: string): string {
    return `${userId}.${sign(userId)}`;
}

/** NextResponse に Set-Cookie を付与するためのオプション */
export function userSessionCookieOptions() {
    return {
        name: USER_SESSION_COOKIE,
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: MAX_AGE,
    };
}

/** クッキーの署名を検証し、正当なら userId を返す */
export async function getVerifiedUserId(): Promise<string | null> {
    try {
        const store = await cookies();
        const raw = store.get(USER_SESSION_COOKIE)?.value;
        if (!raw) return null;
        const idx = raw.lastIndexOf(".");
        if (idx <= 0) return null;
        const userId = raw.slice(0, idx);
        const sig = raw.slice(idx + 1);
        const expected = sign(userId);
        if (
            sig.length === expected.length &&
            crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
        ) {
            return userId;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * クライアント申告のuserIdとクッキーを突き合わせて「信頼できるuserId」を返す。
 * - クッキーあり → クッキーのuserIdを採用（申告値は無視）
 * - クッキーなし → 厳格モードならnull（=401にすべき）、互換モードなら申告値
 */
export async function resolveUserId(claimed?: string | null): Promise<string | null> {
    const verified = await getVerifiedUserId();
    if (verified) return verified;
    if (process.env.REQUIRE_USER_SESSION === "1") return null;
    return claimed || null;
}
