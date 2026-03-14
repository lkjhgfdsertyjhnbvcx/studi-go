// /api/auth/line/session - localStorageへの保存をクライアント側で行うHTMLページを返す
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "";
    const userName = searchParams.get("userName") || "";
    const lineDisplayName = searchParams.get("lineDisplayName") || "";
    const linePictureUrl = searchParams.get("linePictureUrl") || "";
    const redirect = searchParams.get("redirect") || "/";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ログイン中...</title>
  <style>
    body { font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f7; }
    .box { text-align: center; padding: 40px; background: white; border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .line-icon { width: 48px; height: 48px; background: #06C755; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
    p { color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="box">
    <div class="line-icon">
      <svg width="28" height="28" viewBox="0 0 48 48" fill="white">
        <path d="M24 4C13 4 4 11.5 4 20.8c0 8 7.1 14.7 16.7 16.1l1.3 3.7c.3.9 1.5 1.1 2.1.4l3.8-3.8C38.1 35.5 44 28.6 44 20.8 44 11.5 35 4 24 4z"/>
      </svg>
    </div>
    <p>LINEでログインしました</p>
    <p>リダイレクト中...</p>
  </div>
  <script>
    try {
      localStorage.setItem("userId", ${JSON.stringify(userId)});
      localStorage.setItem("userName", ${JSON.stringify(userName || lineDisplayName)});
      localStorage.setItem("lineDisplayName", ${JSON.stringify(lineDisplayName)});
      localStorage.setItem("linePictureUrl", ${JSON.stringify(linePictureUrl)});
      localStorage.setItem("authProvider", "line");
    } catch(e) {}
    setTimeout(function() {
      window.location.href = ${JSON.stringify(redirect)};
    }, 800);
  </script>
</body>
</html>`;

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
