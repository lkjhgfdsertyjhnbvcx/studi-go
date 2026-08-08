// LPリード → アウトリーチDB（Supabase）同期
//
// 背景:
//   アウトリーチツール（partners.studi-go.com / Supabase）は、追撃メール（reminder / final）を
//   送る前に `replies` テーブルを見て「返信があった相手には送らない」除外判定をしている。
//   しかしLPからの資料請求は本体アプリ（Firestore）に入るだけで、アウトリーチDBには何も残らない。
//   その結果、資料請求してきた＝商談中の相手に追撃メールを送り続けてしまう。
//
// この modules がやること:
//   1) リードのメール/電話から studios を特定する（Supabase の match_studios_for_lead 関数）
//   2) `conversions` に必ず1行記録する（紐付け成否に関わらず、リードを取りこぼさないため）
//   3) 特定できた場合のみ `replies` にも登録し、追撃メールを止める
//
// 設計方針:
//   - 依存パッケージを追加しない（Supabase REST を fetch で直接叩く）
//   - 絶対に例外を投げない。同期に失敗してもリード受付そのものは成功させる
//   - 曖昧一致はしない。確証がない場合は studio_id=null で記録し、日次レポートで人間に回す

const SUPABASE_URL = process.env.OUTREACH_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.OUTREACH_SUPABASE_SERVICE_ROLE_KEY ?? "";

const TIMEOUT_MS = 8000;

export type OutreachLead = {
    id: string;
    storeName: string;
    email: string;
    phone: string;
    interest: string;
    currentSystem: string;
    source: string;
    variant: string | null;
    createdAt: string;
    /** 資料請求などのリードか、実際の申し込みか。既定は lead */
    kind?: "lead" | "application";
    /** 申し込み時の補足（プラン・支払方法など）。あれば body_text に含める */
    extraNote?: string;
};

const INTEREST_LABEL: Record<string, string> = {
    docs: "資料請求",
    consult: "相談希望",
    demo: "デモ希望",
    application: "申し込み",
};

export type OutreachSyncResult = {
    /** 同期処理が最後まで走ったか（マッチ有無とは別） */
    ok: boolean;
    /** 設定されておらずスキップした場合 true */
    skipped: boolean;
    /** studios を特定できたか */
    matched: boolean;
    /** 特定できた studio_id 群 */
    studioIds: string[];
    /** 一致したルール（contact_email / send_to_address / phone / website_domain / sibling_website） */
    rules: string[];
    /** replies に新規登録した件数 */
    repliesInserted: number;
    error?: string;
};

export function isOutreachSyncConfigured(): boolean {
    return Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);
}

function headers(extra: Record<string, string> = {}): Record<string, string> {
    return {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        ...extra,
    };
}

/**
 * Supabase REST を叩く。
 * Next.js の fetch は既定でキャッシュされうるため cache:'no-store' を必ず指定する。
 */
async function rest<T>(path: string, init: RequestInit): Promise<T> {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...init,
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`supabase ${res.status} ${path}: ${body.slice(0, 300)}`);
    }
    if (res.status === 204) return [] as unknown as T;
    return (await res.json()) as T;
}

type MatchRow = { studio_id: string; rule: string };

/** リードのメール/電話から studios を特定する。確証がない場合は空配列。 */
async function matchStudios(email: string, phone: string): Promise<MatchRow[]> {
    return rest<MatchRow[]>("rpc/match_studios_for_lead", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ p_email: email, p_phone: phone }),
    });
}

/** 既に replies に入っている studio_id を返す（重複登録の防止） */
async function existingReplyStudioIds(studioIds: string[]): Promise<Set<string>> {
    if (studioIds.length === 0) return new Set();
    const list = studioIds.join(",");
    const rows = await rest<{ studio_id: string }[]>(
        `replies?studio_id=in.(${list})&select=studio_id`,
        { method: "GET", headers: headers() },
    );
    return new Set(rows.map((r) => r.studio_id));
}

/**
 * LPリードをアウトリーチDBへ同期する。
 * 呼び出し側はこの関数の失敗を無視してよい（例外は投げない）。
 */
export async function syncLeadToOutreach(lead: OutreachLead): Promise<OutreachSyncResult> {
    const base: OutreachSyncResult = {
        ok: false,
        skipped: false,
        matched: false,
        studioIds: [],
        rules: [],
        repliesInserted: 0,
    };

    if (!isOutreachSyncConfigured()) {
        return { ...base, skipped: true, ok: true };
    }

    try {
        // ---- 1) スタジオ特定 ----
        const matches = await matchStudios(lead.email, lead.phone);
        const studioIds = Array.from(new Set(matches.map((m) => m.studio_id)));
        const rules = Array.from(new Set(matches.map((m) => m.rule)));

        // ---- 2) conversions に必ず記録（紐付けできなくても残す） ----
        const isApplication = lead.kind === "application";
        const label = INTEREST_LABEL[lead.interest] ?? lead.interest;
        const summary =
            `${lead.source}から${label}。` +
            `スタジオ名：${lead.storeName}／メール：${lead.email}／電話：${lead.phone || "（未入力）"}／` +
            (lead.extraNote ? `${lead.extraNote}／` : "") +
            `今の予約管理：${lead.currentSystem || "（未入力）"}／A/Bバリアント：${lead.variant ?? "（不明）"}`;

        await rest("conversions", {
            method: "POST",
            headers: headers({ Prefer: "return=minimal" }),
            body: JSON.stringify({
                studio_id: studioIds[0] ?? null,
                source_url: `lp-leads:${lead.source}`,
                conversion_type: isApplication ? "application" : "lp_form",
                occurred_at: lead.createdAt,
                form_payload: {
                    lead_id: lead.id,
                    store_name: lead.storeName,
                    email: lead.email,
                    phone: lead.phone,
                    interest: lead.interest,
                    current_system: lead.currentSystem,
                    source: lead.source,
                    variant: lead.variant,
                    matched_studio_ids: studioIds,
                    match_rules: rules,
                },
            }),
        });

        if (studioIds.length === 0) {
            // 紐付け失敗。日次レポートの「未紐付けリード」に出るので、そこで人間が対応する。
            return { ...base, ok: true, rules };
        }

        // ---- 3) replies に登録して追撃メールを止める ----
        const already = await existingReplyStudioIds(studioIds);
        const toInsert = studioIds.filter((id) => !already.has(id));

        if (toInsert.length > 0) {
            await rest("replies", {
                method: "POST",
                headers: headers({ Prefer: "return=minimal" }),
                body: JSON.stringify(
                    toInsert.map((studioId) => ({
                        studio_id: studioId,
                        from_address: lead.email,
                        subject: isApplication
                            ? `【お申し込み】Studi-Go（${lead.storeName}）`
                            : `【新規リード】${lead.storeName}（${lead.source} / ${lead.interest}）`,
                        body_text: summary,
                        received_at: lead.createdAt,
                        parsed_intent: isApplication ? "application" : "lead_form_inquiry",
                        handled: false,
                        handled_by: isApplication ? "system:applications" : "system:lp-leads",
                    })),
                ),
            });
        }

        return {
            ok: true,
            skipped: false,
            matched: true,
            studioIds,
            rules,
            repliesInserted: toInsert.length,
        };
    } catch (e) {
        return {
            ...base,
            error: e instanceof Error ? e.message : String(e),
        };
    }
}
