import { NextRequest, NextResponse } from "next/server";

/**
 * カスタムドメインミドルウェア
 * カスタムドメインからのアクセスを対応するスタジオページにリライトする
 */
export async function middleware(request: NextRequest) {
    const hostname = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;

    // studi-go.com のメインドメインはスキップ
    const mainDomains = [
        "localhost",
        "studi-go.com",
        "www.studi-go.com",
        "studi-go-488d1.web.app",
        "studi-go-488d1.firebaseapp.com",
    ];

    const isMainDomain = mainDomains.some(d => hostname.includes(d));
    if (isMainDomain) {
        return NextResponse.next();
    }

    // API・静的アセット・内部ルートはスキップ
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // カスタムドメインからのアクセス → スタジオ検索APIで解決
    try {
        const baseUrl = request.nextUrl.origin;
        const res = await fetch(`${baseUrl}/api/resolve-domain?domain=${encodeURIComponent(hostname)}`, {
            headers: { "x-middleware-request": "true" },
        });

        if (res.ok) {
            const data = await res.json();
            if (data.studioId) {
                // /studios/[id] にリライト（URLは変えない）
                const url = request.nextUrl.clone();
                url.pathname = `/studios/${data.studioId}${pathname === "/" ? "" : pathname}`;
                return NextResponse.rewrite(url);
            }
        }
    } catch (e) {
        console.error("Custom domain resolution error:", e);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // 静的ファイル・_next以外のすべてにマッチ
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
