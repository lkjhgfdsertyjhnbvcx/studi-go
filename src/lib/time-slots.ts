// 深夜営業（24時超）の時刻を安全に扱うための共通ヘルパー。
//
// 設計（260808）:
//   予約は「営業日 + 営業日内の経過時刻」で持つ。
//     date      = 営業日（例: "2026-08-08"）
//     startTime = 24時を超える表記を許す（例: "25:00" = 8/9 の 01:00）
//
//   こうする理由:
//     - 23:00〜翌5:00 の予約を「8/8の売上」として1日にまとめられる。
//       深夜分を翌日カレンダー日付で保存すると売上が2日に割れてしまう。
//     - カレンダーの日表示も営業日単位で自然に並ぶ。
//     - 既存データは全て24時未満なので移行不要。
//
//   注意: "25:00" を new Date(`${date}T${startTime}`) に渡すと Invalid Date になる。
//   実時刻が必要な場面（過去判定・キャンセル期限・Prisma保存・メール表記）では
//   必ず本ファイルの slotToDate / toRealClock を通す。

/** 予約枠として許容する最大時刻（33 = 翌9:00）。オールナイト営業を想定。 */
export const MAX_SLOT_HOUR = 33;

export interface SlotTime {
    /** 24を超えることがある（25 = 翌1時） */
    hours: number;
    minutes: number;
    /** 営業日0:00からの経過分 */
    totalMinutes: number;
}

/** "25:30" → { hours:25, minutes:30, totalMinutes:1530 } */
export function parseSlotTime(t?: string | null): SlotTime | null {
    if (!t) return null;
    const m = String(t).trim().match(/^(\d{1,2}):(\d{1,2})$/);
    if (!m) return null;
    const hours = Number(m[1]);
    const minutes = Number(m[2]);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
    if (hours < 0 || minutes < 0 || minutes > 59) return null;
    return { hours, minutes, totalMinutes: hours * 60 + minutes };
}

/** 営業日0:00からの経過分。解釈できない場合は null。 */
export function slotMinutes(t?: string | null): number | null {
    return parseSlotTime(t)?.totalMinutes ?? null;
}

function parseDateParts(dateStr: string): { y: number; m: number; d: number } | null {
    const m = String(dateStr).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
}

/**
 * 営業日 + 枠時刻（24時超可）から実際の日時を得る。
 * 24時以降は自動的に翌日へ繰り上がる（"25:00" → 翌日01:00）。
 *
 * @param jst true なら JST(+09:00) 固定で解釈する（サーバー側の判定用）。
 *            省略時は実行環境のローカルタイム（ブラウザ表示用）。
 */
export function slotToDate(dateStr: string, startTime: string, opts?: { jst?: boolean }): Date | null {
    const parts = parseDateParts(dateStr);
    const t = parseSlotTime(startTime);
    if (!parts || !t) return null;

    const dayOffset = Math.floor(t.hours / 24);
    const realHour = t.hours % 24;

    if (opts?.jst) {
        // JST(+09:00) の壁時計をUTCに直す
        const utcMs = Date.UTC(parts.y, parts.m - 1, parts.d + dayOffset, realHour - 9, t.minutes, 0);
        return new Date(utcMs);
    }
    return new Date(parts.y, parts.m - 1, parts.d + dayOffset, realHour, t.minutes, 0, 0);
}

/** 予約の終了日時（開始 + 利用時間）。 */
export function slotEndToDate(
    dateStr: string,
    startTime: string,
    durationHours: number,
    opts?: { jst?: boolean },
): Date | null {
    const start = slotToDate(dateStr, startTime, opts);
    if (!start) return null;
    return new Date(start.getTime() + (Number(durationHours) || 0) * 60 * 60 * 1000);
}

/**
 * 外部システム・メール向けに「実際の暦日と時刻」へ分解する。
 * 例: ("2026-08-08", "25:00") → { date: "2026-08-09", time: "01:00", isNextDay: true }
 */
export function toRealClock(dateStr: string, startTime: string): { date: string; time: string; isNextDay: boolean } | null {
    const parts = parseDateParts(dateStr);
    const t = parseSlotTime(startTime);
    if (!parts || !t) return null;

    const dayOffset = Math.floor(t.hours / 24);
    const realHour = t.hours % 24;
    const d = new Date(Date.UTC(parts.y, parts.m - 1, parts.d + dayOffset));
    const iso = d.toISOString().split("T")[0];
    return {
        date: iso,
        time: `${String(realHour).padStart(2, "0")}:${String(t.minutes).padStart(2, "0")}`,
        isNextDay: dayOffset > 0,
    };
}

/**
 * 枠の表示ラベル。24時以降は音楽スタジオ慣習の深夜表記（25:00, 26:00…）にする。
 * 小数（0.5 = 30分）にも対応。
 */
export function formatSlotHour(t: number): string {
    const h = Math.floor(t);
    const m = Math.round((t - h) * 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** 保存済みの時刻文字列を表示用に整える（"25:00" はそのまま深夜表記で見せる）。 */
export function formatSlotTimeString(t?: string | null): string {
    const parsed = parseSlotTime(t);
    if (!parsed) return t || "";
    return `${String(parsed.hours).padStart(2, "0")}:${String(parsed.minutes).padStart(2, "0")}`;
}

/** 深夜帯（24時以降）の枠かどうか。 */
export function isLateNightSlot(t?: string | null): boolean {
    const parsed = parseSlotTime(t);
    return !!parsed && parsed.hours >= 24;
}
