import { NextResponse } from "next/server";
import { getBookingByIdFromFirestore, saveBookingToFirestore } from "@/lib/db-firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { bookingId } = await request.json();
        if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

        const booking = await getBookingByIdFromFirestore(bookingId);
        if (!booking) return NextResponse.json({ error: "not found" }, { status: 404 });

        const confirmed = { ...booking, status: "confirmed" as const, confirmedAt: new Date().toISOString() };
        await saveBookingToFirestore(confirmed);

        if (booking.userEmail) {
            const endTime = (() => {
                try {
                    const [h, m] = (booking.startTime || "00:00").split(":").map(Number);
                    const total = h * 60 + m + (booking.durationHours || 1) * 60;
                    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
                } catch { return ""; }
            })();
            const formattedDate = (() => {
                try {
                    const d = new Date(booking.date);
                    return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
                } catch { return booking.date; }
            })();
            const bookingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://studi-go.com"}/bookings/${booking.id}`;

            await resend.emails.send({
                from: "Studi-Go <noreply@studi-go.com>",
                to: booking.userEmail,
                subject: "【予約確定】ご予約が完了しました - Studi-Go",
                html: `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Kaku Gothic ProN','Hiragino Sans',sans-serif;">
  <div style="max-width:540px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:36px 40px;text-align:center;">
      <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Studi-Go</div>
      <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px;">スタジオ予約プラットフォーム</div>
    </div>

    <!-- Main Content -->
    <div style="padding:40px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="display:inline-block;background:#f0fdf4;border:2px solid #22c55e;border-radius:50%;width:60px;height:60px;line-height:60px;font-size:28px;margin-bottom:16px;">✓</div>
        <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111827;">予約が確定しました！</h1>
        <p style="margin:0;font-size:14px;color:#6b7280;">以下の内容でご予約が完了しています。</p>
      </div>

      <!-- Booking Details Card -->
      <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">予約詳細</div>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;width:40%;">スタジオ</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;font-weight:700;color:#111827;">${booking.storeName || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;">ルーム</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;font-weight:700;color:#111827;">${booking.roomName || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;">日付</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;font-weight:700;color:#111827;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;">時間</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;font-weight:700;color:#111827;">${booking.startTime}〜${endTime} (${booking.durationHours}時間)</td>
          </tr>
          ${booking.studioAddress ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;">住所</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#374151;">${booking.studioAddress}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:14px 0 0;font-size:13px;color:#6b7280;">ご利用料金</td>
            <td style="padding:14px 0 0;font-size:20px;font-weight:900;color:#7c3aed;">¥${(booking.totalPrice || 0).toLocaleString()}</td>
          </tr>
        </table>
      </div>

      ${booking.notes ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">備考</div>
        <p style="margin:0;font-size:13px;color:#78350f;">${booking.notes}</p>
      </div>` : ""}

      <!-- CTA Button -->
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${bookingUrl}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">予約詳細を確認する</a>
      </div>

      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:16px;">
        <div style="font-size:12px;font-weight:700;color:#0369a1;margin-bottom:6px;">キャンセルについて</div>
        <p style="margin:0;font-size:12px;color:#0c4a6e;line-height:1.7;">キャンセルや変更は予約詳細ページから行えます。スタジオの定めるキャンセルポリシーをご確認ください。</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;">このメールはStudi-Goから自動送信されています。</p>
      <p style="margin:0;font-size:11px;color:#d1d5db;">© Studi-Go | <a href="https://studi-go.com" style="color:#7c3aed;text-decoration:none;">studi-go.com</a></p>
    </div>
  </div>
</body>
</html>`,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}