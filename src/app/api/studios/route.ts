// app/api/studios/route.ts
import { NextResponse } from "next/server";

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

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studi-go-488d1";
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    // Firestore REST API でrunQuery
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`;

    const queryBody = publishedOnly
      ? {
          structuredQuery: {
            from: [{ collectionId: "studios" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "isPublished" },
                op: "EQUAL",
                value: { booleanValue: true },
              },
            },
          },
        }
      : {
          structuredQuery: {
            from: [{ collectionId: "studios" }],
          },
        };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queryBody),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Firestore REST error:", errText);
      return NextResponse.json({ error: "Firestore query failed", detail: errText }, { status: 500 });
    }

    const data = await res.json();

    const studios = (Array.isArray(data) ? data : [])
      .filter((item: any) => item.document)
      .map((item: any) => {
        const doc = item.document;
        const id = doc.name.split("/").pop();
        const fields = doc.fields || {};
        const studio: any = { id };
        for (const [key, value] of Object.entries(fields)) {
          studio[key] = convertValue(value);
        }
        return studio;
      });

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
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "studio id required" }, { status: 400 });

    const { doc: firestoreDoc, deleteDoc } = await import("firebase/firestore");
    const { db: fireDb } = await import("@/lib/firebase");
    await deleteDoc(firestoreDoc(fireDb, "studios", id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("【studios DELETE エラー】", error?.message || error);
    return NextResponse.json(
      { error: "Failed to delete studio", detail: error?.message || String(error) },
      { status: 500 }
    );
  }
}
