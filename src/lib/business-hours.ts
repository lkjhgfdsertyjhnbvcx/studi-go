// 営業時間（自由入力文字列）の解釈を1か所に集約する。
//
// 背景（260807）:
//   営業時間は onboard の自由入力で、公開ページ側が正規表現で先頭2つの数字を拾っていた。
//   そのため
//     - 「10:00〜翌2:00」→ open=10 / close=2 → ループが回らず **予約枠が0件**
//     - 「24時間営業」「10時〜22時」→ 正規表現に当たらず無言で 10:00-22:00 に化ける
//     - 全角数字・全角コロン・「から/まで」も無視される
//   という状態だった。音楽スタジオは深夜営業が多く、0件になると予約が一切入らない。
//   解釈のズレを防ぐため、店舗が入力する画面（onboard）と表示する画面（/studio/[id]）で
//   同じ関数を使う。

export type BusinessHourRange = {
    open: number;
    close: number;
    /** 入力を解釈できず既定値（10:00-22:00）にフォールバックした */
    fallback: boolean;
    /** 深夜0時をまたぐ指定だったため 24:00 で打ち切った */
    truncatedOvernight: boolean;
    /** 「10:30」のような分指定を切り捨てた（予約枠は1時間単位のため） */
    minutesDropped: boolean;
};

export const DEFAULT_BUSINESS_HOURS = { open: 10, close: 22 };

/**
 * 深夜0時をまたぐ場合は 24:00 で打ち切る。
 * 予約データは startTime を時刻文字列として new Date(`${date}T${startTime}`) で解釈する
 * 箇所が複数ある（mypage / cancel-booking / actions/booking）ため、25 のような 24 以上の
 * 値を流すと Invalid Date になって別の壊れ方をする。
 * 0時以降の枠出しは「翌日の 00:00〜」として別途設計が必要。
 */
export function parseBusinessHours(hoursStr?: string): BusinessHourRange {
    const fallbackResult: BusinessHourRange = {
        ...DEFAULT_BUSINESS_HOURS,
        fallback: true,
        truncatedOvernight: false,
        minutesDropped: false,
    };
    if (!hoursStr || !String(hoursStr).trim()) return fallbackResult;

    // 全角英数・全角コロン・各種ダッシュを半角へ寄せ、和文表記を記号に置き換える
    const s = String(hoursStr)
        .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
        .replace(/：/g, ":")
        .replace(/[～〜―ー−–—]/g, "~")
        .replace(/から/g, "~")
        .replace(/まで/g, "")
        .trim()
        // 「1400-21:00」のようにコロンを省いた表記を 14:00 に直す。
        // 260808: T.I.G Sounds 様が土曜を "1400-21:00" と入力し、旧実装では
        // 先頭から2桁ずつ拾った結果 **00:00〜21:00**（開店14時のはずが0時）と
        // 解釈されていた。3〜4桁のかたまりだけを対象にし、"10-22" や "21:00" の
        // ような既に正しい表記は触らない。
        .replace(/(?<![\d:])(\d{1,2})(\d{2})(?![\d:])/g, "$1:$2");

    // 「10:00 ~ 22:00」「10時~22時」「10-22」など。「翌」「深夜」は日跨ぎの目印。
    // 24時間判定より先に試す。「10:00-22:00（電話は24時間受付）」のような入力を
    // 24時間営業と誤読しないため。
    const m = s.match(
        /(\d{1,2})\s*(?::(\d{1,2}))?\s*時?\s*[~\-]\s*(翌日?|深夜)?\s*(\d{1,2})\s*(?::(\d{1,2}))?\s*時?/,
    );
    if (!m) {
        if (/24\s*時間|終日|オールナイト/.test(s)) {
            return { open: 0, close: 24, fallback: false, truncatedOvernight: false, minutesDropped: false };
        }
        return fallbackResult;
    }

    const open = Number(m[1]);
    const nextDay = Boolean(m[3]);
    let close = Number(m[4]);
    if (!Number.isFinite(open) || !Number.isFinite(close)) return fallbackResult;
    if (open < 0 || open > 24 || close < 0 || close > 30) return fallbackResult;

    let truncatedOvernight = false;
    if (nextDay || close <= open) {
        truncatedOvernight = true;
        close = 24;
    }
    if (close > 24) {
        truncatedOvernight = true;
        close = 24;
    }
    if (close <= open) return fallbackResult;

    // 予約枠は1時間刻みなので、分は切り捨てられる。黙って捨てると気づけないので伝える。
    const minutesDropped = Number(m[2] || 0) > 0 || Number(m[5] || 0) > 0;

    return { open, close, fallback: false, truncatedOvernight, minutesDropped };
}

/** 入力欄の下に出す確認文。店舗が「どう解釈されたか」をその場で確認できるようにする。 */
export function describeBusinessHours(hoursStr?: string): {
    text: string;
    tone: "ok" | "warn";
} {
    const r = parseBusinessHours(hoursStr);
    const range = `${String(r.open).padStart(2, "0")}:00〜${String(r.close).padStart(2, "0")}:00`;
    if (r.fallback) {
        return {
            tone: "warn",
            text: `この書き方は読み取れないため、予約枠は既定の ${range} で作られます。「10:00-22:00」の形式でご入力ください。`,
        };
    }
    if (r.truncatedOvernight) {
        return {
            tone: "warn",
            text: `予約枠は ${range} で作られます。0時以降の枠は現在まだ出せません（対応予定）。運営までご相談ください。`,
        };
    }
    if (r.minutesDropped) {
        return {
            tone: "warn",
            text: `予約枠は1時間単位のため、分は切り捨てて ${range} で作られます。`,
        };
    }
    return { tone: "ok", text: `予約枠は ${range} で作られます。` };
}
