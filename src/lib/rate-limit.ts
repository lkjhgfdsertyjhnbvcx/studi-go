// シンプルなインメモリ レート制限
// Vercelのサーバーレス環境ではインスタンス間で共有されないが、
// 同一インスタンスでの連続攻撃は防げる

interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

const attempts = new Map<string, AttemptRecord>();

// 定期的に古いレコードをクリーンアップ（メモリリーク防止）
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10分
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, record] of attempts.entries()) {
    // 30分以上前のレコードを削除
    if (now - record.firstAttempt > 30 * 60 * 1000) {
      attempts.delete(key);
    }
  }
}

/**
 * ログイン試行をチェック＆記録
 * @param key - 識別キー（メールアドレスやIP）
 * @param maxAttempts - 最大試行回数（デフォルト: 5）
 * @param windowMs - 試行カウントのウィンドウ（デフォルト: 15分）
 * @param lockoutMs - ロック時間（デフォルト: 15分）
 * @returns { allowed: boolean, remainingAttempts: number, retryAfterMs: number | null }
 */
export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000,
  lockoutMs = 15 * 60 * 1000
): { allowed: boolean; remainingAttempts: number; retryAfterMs: number | null } {
  cleanup();
  const now = Date.now();
  const record = attempts.get(key);

  // レコードなし → 初回
  if (!record) {
    return { allowed: true, remainingAttempts: maxAttempts, retryAfterMs: null };
  }

  // ロック中チェック
  if (record.lockedUntil && now < record.lockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterMs: record.lockedUntil - now,
    };
  }

  // ロック期間終了 → リセット
  if (record.lockedUntil && now >= record.lockedUntil) {
    attempts.delete(key);
    return { allowed: true, remainingAttempts: maxAttempts, retryAfterMs: null };
  }

  // ウィンドウ期間外 → リセット
  if (now - record.firstAttempt > windowMs) {
    attempts.delete(key);
    return { allowed: true, remainingAttempts: maxAttempts, retryAfterMs: null };
  }

  // まだ上限以内
  const remaining = maxAttempts - record.count;
  return { allowed: remaining > 0, remainingAttempts: Math.max(0, remaining), retryAfterMs: null };
}

/**
 * 失敗した試行を記録
 */
export function recordFailedAttempt(
  key: string,
  maxAttempts = 5,
  lockoutMs = 15 * 60 * 1000
): void {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record) {
    attempts.set(key, { count: 1, firstAttempt: now, lockedUntil: null });
    return;
  }

  record.count++;

  // 上限到達 → ロック
  if (record.count >= maxAttempts) {
    record.lockedUntil = now + lockoutMs;
  }

  attempts.set(key, record);
}

/**
 * ログイン成功時にレコードをクリア
 */
export function clearAttempts(key: string): void {
  attempts.delete(key);
}
