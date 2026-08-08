// app/api/studios/route.ts
//
// GET は公開（トップページのスタジオ一覧・予約画面が未ログインで叩く）。
// 260808: 一方で PATCH / DELETE / POST / PUT は認証チェックが無く、
// **studioId を知っているだけで誰でも店舗を公開・非公開に切り替えたり、
// スタジオのドキュメントごと削除できる**状態だった。
// これらの呼び出し元は運営管理画面（/admin/studios）だけなので、運営権限に限定する。
import { NextResponse } from "next/server";
import { requirePlatformAdmin } from "@/lib/api-auth";

// Firestoreの値を通常のJSの値に変換
function convertValue(v: any): any {
  if (v === undefined || v === null) return null;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.integerValue !== undefined) return Number(v.integerValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.nullValue !== undefined) return null;
  if (v.arrayValue !== undefined) {
    return (v.arrayValue.values || []).map(convertValue);
  }
  if (v.mapValue !== undefined) {
    const obj: any = {};
    for (const [k, val] of Object.entries(v.mapValue.fields || {})) {
      obj[k] = convertValue(val);
    }
    return obj;
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    // 旧実装はFirestore REST API（セキュリティルールの影響を受ける）だったため、
    // ルールのロックダウン後に0件になる。Admin SDK（ルールをバイパス）に移行。
    const { adminDb } = await import("@/lib/firebase-admin");
    const col = adminDb.collection("studios");
    const snap = publishedOnly
      ? await col.where("isPublished", "==", true).get()
      : await col.get();

    const studios = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json(studios, {
      headers: {
        // Vercelエッジで60秒キャッシュ、最大5分間はstaleでも即返す
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error: any) {
    console.error("【studios API エラー】", error?.message || error);
    return NextResponse.json(
      { error: "Failed to fetch studios", detail: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const denied = await requirePlatformAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { id, isPublished } = body;
    if (!id) return NextResponse.json({ error: "studio id required" }, { status: 400 });

    const { adminDb } = await import("@/lib/firebase-admin");
    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };
    if (typeof isPublished === "boolean") {
      updateData.isPublished = isPublished;
      if (isPublished) updateData.publishedAt = new Date().toISOString();
    }
    await adminDb.collection("studios").doc(id).update(updateData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("【studios PATCH エラー】", error?.message || error);
    return NextResponse.json(
      { error: "Failed to update studio", detail: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const denied = await requirePlatformAdmin();
  if (denied) return denied;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "studio id required" }, { status: 400 });

    const { adminDb } = await import("@/lib/firebase-admin");
    await adminDb.collection("studios").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("【studios DELETE エラー】", error?.message || error);
    return NextResponse.json(
      { error: "Failed to delete studio", detail: error?.message || String(error) },
      { status: 500 }
    );
  }
}
