import { adminDb } from "./firebase-admin";
import { getStudioByIdFromFirestore } from "./db-firestore";

/**
 * サーバーサイドの権威ある料金計算とダブルブッキング防止（原子的予約作成）。
 *
 * 目的:
 *  - 価格改ざん対策: クライアント送信の totalPrice を信用せず、
 *    スタジオ設定から「部屋の正規料金」を再計算して下限を検証する。
 *  - Race Condition 対策: 空き確認と予約作成を Firestore トランザクションで原子化する。
 */

type DayType = "weekday" | "saturday" | "sundayHoliday";

function getDayType(dateStr: string): DayType {
    // dateStr: "YYYY-MM-DD" を JST の暦日として解釈
    const [y, m, d] = dateStr.split("-").map(Number);
    const day = new Date(Date.UTC(y, (m || 1) - 1, d || 1)).getUTCDay();
    if (day === 0) return "sundayHoliday";
    if (day === 6) return "saturday";
    return "weekday";
}

function getPriceForTime(
    pricing: any,
    basePrice: number,
    dayType: DayType,
    hour: number
): number {
    if (!pricing) return basePrice;
    const dayData = pricing[dayType];
    const slots = Array.isArray(dayData)
        ? dayData
        : Array.isArray(dayData?.slots)
            ? dayData.slots
            : undefined;
    if (!Array.isArray(slots)) return basePrice;
    for (const slot of slots) {
        const sh = Number(String(slot.start).split(":")[0]);
        const eh = Number(String(slot.end).split(":")[0]);
        if (hour >= sh && hour < eh) return Number(slot.price) || basePrice;
    }
    return basePrice;
}

/**
 * 指定された部屋・日時・利用時間に対する「部屋のみ」の正規料金（オプション除く）。
 * 部屋が特定できない場合は null（呼び出し側で価格検証をスキップ）。
 */
export async function computeAuthoritativeRoomPrice(params: {
    studioId: string;
    roomId?: string;
    roomName?: string;
    date: string;
    startTime: string;
    durationHours: number;
}): Promise<number | null> {
    const { studioId, roomId, roomName, date, startTime, durationHours } = params;
    if (!studioId || !date || !startTime) return null;

    const studio: any = await getStudioByIdFromFirestore(studioId);
    const rooms: any[] = Array.isArray(studio?.rooms) ? studio.rooms : [];
    if (rooms.length === 0) return null;

    const room =
        rooms.find((r) => roomId && r.id === roomId) ||
        rooms.find((r) => roomName && r.name === roomName);
    if (!room) return null;

    const basePrice = Number(room.basePrice) || 0;
    const dayType = getDayType(date);
    const startHour = Number(String(startTime).split(":")[0]);
    const dur = Math.max(1, Math.floor(Number(durationHours) || 1));

    let total = 0;
    for (let i = 0; i < dur; i++) {
        total += getPriceForTime(room.pricing, basePrice, dayType, startHour + i);
    }
    return total;
}

/**
 * クライアント申告額が正規の部屋料金を下回っていないか検証する。
 * オプションは加算要素のみのため、正規料金は常に「下限」として機能する。
 * 検証できない場合（部屋特定不可など）は通過させる（過剰なブロックを避ける）。
 *
 * @returns { ok: true } もしくは { ok:false, authoritative, message }
 */
export async function validateBookingAmount(params: {
    studioId: string;
    roomId?: string;
    roomName?: string;
    date: string;
    startTime: string;
    durationHours: number;
    claimedTotal: number;
}): Promise<{ ok: boolean; authoritative: number | null; message?: string }> {
    const authoritative = await computeAuthoritativeRoomPrice(params);
    const claimed = Number(params.claimedTotal);

    if (!Number.isFinite(claimed) || claimed < 0) {
        return { ok: false, authoritative, message: "金額が不正です。" };
    }
    if (authoritative === null) {
        // 料金を再計算できない場合は検証スキップ（既存挙動を維持）
        return { ok: true, authoritative };
    }
    if (claimed < authoritative) {
        return {
            ok: false,
            authoritative,
            message: "金額が正しくありません。お手数ですが画面を再読み込みしてやり直してください。",
        };
    }
    return { ok: true, authoritative };
}

/**
 * 時間帯の重複判定（分単位）。
 */
function overlaps(
    aStart: string,
    aDur: number,
    bStart: string,
    bDur: number
): boolean {
    const toMin = (t: string) => {
        const [h, m] = String(t).split(":").map(Number);
        return (h || 0) * 60 + (m || 0);
    };
    const aS = toMin(aStart);
    const aE = aS + (aDur || 1) * 60;
    const bS = toMin(bStart);
    const bE = bS + (bDur || 1) * 60;
    return aS < bE && aE > bS;
}

/**
 * 予約が「枠を占有している」とみなすか。
 * - cancelled は占有しない
 * - pending（決済中の仮予約）はCheckoutの失効(30分)+猶予を過ぎたら占有しない
 *   （webhook取りこぼしで解放されなかった場合のセーフティネット）
 */
export function isSlotOccupying(b: any): boolean {
    if (!b) return false;
    if (b.status === "cancelled") return false;
    if (b.status === "pending" && b.createdAt) {
        const age = Date.now() - new Date(b.createdAt).getTime();
        if (Number.isFinite(age) && age > 40 * 60 * 1000) return false;
    }
    return true;
}

export interface AtomicBookingInput {
    id: string;
    studioId: string;
    roomName?: string;
    date: string;
    startTime: string;
    durationHours: number;
    [key: string]: any;
}

/**
 * 空き確認 → 予約作成を Firestore トランザクションで原子的に実行する。
 * 同一スロットへの同時リクエストの一方が必ず 409 になり、ダブルブッキングを防ぐ。
 *
 * @throws Error("SLOT_TAKEN") 重複時
 */
export async function createBookingAtomic(booking: AtomicBookingInput): Promise<void> {
    const { studioId, roomName, date, startTime, durationHours } = booking;
    const col = adminDb.collection("bookings");

    await adminDb.runTransaction(async (t) => {
        // 同一スタジオ・同一日の既存予約を取得（読み取りは書き込み前に行う必要がある）
        const q = col.where("studioId", "==", studioId).where("date", "==", date);
        const snap = await t.get(q);

        const conflict = snap.docs.some((d) => {
            const b: any = d.data();
            if (!isSlotOccupying(b)) return false;
            if (roomName && b.roomName && b.roomName !== roomName) return false;
            return overlaps(startTime, durationHours || 1, b.startTime, b.durationHours || 1);
        });

        if (conflict) {
            throw new Error("SLOT_TAKEN");
        }

        t.set(col.doc(booking.id), booking);
    });
}
