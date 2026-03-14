// Node.js 組み込みcryptoを使ったパスワードハッシュユーティリティ
import { createHash, randomBytes, timingSafeEqual } from "crypto";

/**
 * パスワードをソルト付きSHA-256でハッシュ化
 * 形式: "sha256:<salt>:<hash>"
 */
export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = createHash("sha256").update(salt + password).digest("hex");
    return `sha256:${salt}:${hash}`;
}

/**
 * パスワードを検証（平文パスワードとの後方互換も考慮）
 */
export function verifyPassword(password: string, stored: string): boolean {
    if (!stored) return false;

    // 新形式: "sha256:<salt>:<hash>"
    if (stored.startsWith("sha256:")) {
        const parts = stored.split(":");
        if (parts.length !== 3) return false;
        const [, salt, expectedHash] = parts;
        const actualHash = createHash("sha256").update(salt + password).digest("hex");
        try {
            return timingSafeEqual(Buffer.from(actualHash, "hex"), Buffer.from(expectedHash, "hex"));
        } catch {
            return false;
        }
    }

    // 旧形式: 平文パスワード（移行期間中の後方互換）
    return stored === password;
}
