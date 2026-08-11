// 個人練習の受付開始判定（260810追加）
//
// 背景: 個人練習は「当日のみ」「前日22時から」など、店舗ごとに受付開始を絞りたい要望がある。
// 従来は「N日前から / N時間前から」しかなく、"前日の22時" のような指定ができなかった。
//
// クライアント（予約ページ）とサーバー（予約作成API）の両方から使うため、
// firebase等に依存しない純粋な関数としてここに置く。

export interface BookingOpenSetting {
    enabled: boolean;
    /** 何日前から受け付けるか（0 = 当日のみ、1 = 前日から） */
    openDaysBefore: number;
    /** その日の何時から受け付けるか（"22:00"）。未設定なら 00:00 */
    openAtTime?: string;
}

/**
 * 個人練習の受付が開始しているかを判定する。
 *
 * @param bookingDate 利用日（"YYYY-MM-DD"、営業日）
 * @param setting     店舗の受付開始設定
 * @param now         判定時点（省略時は現在時刻）
 */
export function personalPracticeBookingOpen(
    bookingDate: string,
    setting?: BookingOpenSetting | null,
    now: Date = new Date(),
): { open: boolean; opensAt: Date | null; message?: string } {
    // 設定がなければ従来どおり制限しない
    if (!setting?.enabled) return { open: true, opensAt: null };

    const m = String(bookingDate || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return { open: true, opensAt: null };

    const days = Number.isFinite(setting.openDaysBefore) ? Math.max(0, Math.floor(setting.openDaysBefore)) : 0;
    const timeStr = setting.openAtTime && /^\d{1,2}:\d{2}$/.test(setting.openAtTime) ? setting.openAtTime : "00:00";
    const [oh, om] = timeStr.split(":").map(Number);

    // 利用日の (days) 日前 の (openAtTime) が受付開始時刻
    const opensAt = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]) - days, oh, om, 0, 0);

    if (now >= opensAt) return { open: true, opensAt };

    const label = days === 0 ? "当日" : days === 1 ? "前日" : `${days}日前`;
    return {
        open: false,
        opensAt,
        message: `この日の個人練習は${label}の${timeStr}から予約できます。`,
    };
}
