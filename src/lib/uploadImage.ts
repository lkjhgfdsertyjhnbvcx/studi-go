// 画像アップロード（サーバー経由 + クライアント側で自動縮小）
// 旧実装はクライアントSDKでFirebase Storageに直アップロードしていたが、
// Storageルールのロックダウン後は不可。認証済みのサーバーAPI経由に変更。
// さらにVercelのリクエスト上限(約4.5MB)対策として、送信前にブラウザで
// 画像を自動縮小・圧縮する（店舗が何MBの写真を選んでも安全なサイズになる）。
// 呼び出し側のシグネチャ (base64 data URL, folder, filename?) → URL は維持する。

// 縮小の基準
const MAX_DIMENSION = 1920;   // 長辺の最大px
const JPEG_QUALITY = 0.85;    // JPEG品質
const TARGET_MAX_BYTES = 4_000_000; // これ以下になるよう品質を段階的に下げる

/**
 * data URL を canvas で縮小・再圧縮して Blob を返す。
 * - 長辺を MAX_DIMENSION に収める
 * - GIF や透過PNGはそのまま（アニメ・透過を壊さない）、それ以外はJPEGへ再圧縮
 * - 失敗時は元データをそのまま Blob 化して返す（アップロード自体は継続）
 */
async function downscaleDataUrl(dataUrl: string): Promise<Blob> {
    const original = await (await fetch(dataUrl)).blob();

    // GIF（アニメ）はcanvasで壊れるため縮小しない
    if (original.type === "image/gif") return original;

    try {
        const img = await loadImage(dataUrl);
        const { width, height } = img;

        // 透過PNGは背景が黒く潰れるのを避けるためPNGのまま扱う
        const isPng = original.type === "image/png";
        const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));

        // 十分小さく、かつ縮小も不要なら元のまま返す
        if (scale === 1 && original.size <= TARGET_MAX_BYTES) return original;

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return original;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const mime = isPng ? "image/png" : "image/jpeg";

        // JPEGは品質を段階的に下げて目標サイズ以下に収める
        let quality = JPEG_QUALITY;
        let blob = await canvasToBlob(canvas, mime, quality);
        if (!isPng) {
            while (blob && blob.size > TARGET_MAX_BYTES && quality > 0.4) {
                quality -= 0.15;
                blob = await canvasToBlob(canvas, mime, quality);
            }
        }

        if (!blob) return original;
        // 縮小結果が元より大きい稀なケースは元を採用
        return blob.size < original.size ? blob : original;
    } catch {
        return original;
    }
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
    return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

export const uploadImageToStorage = async (
    base64: string,
    folder: string,
    filename?: string
): Promise<string> => {
    // 送信前に自動縮小（Vercelのリクエスト上限対策 + 高速化）
    const blob = await downscaleDataUrl(base64);

    const fd = new FormData();
    fd.append("file", blob, filename || "upload");
    fd.append("folder", folder);

    const res = await fetch("/api/store/upload-image", {
        method: "POST",
        body: fd,
    });

    if (!res.ok) {
        let msg = "アップロードに失敗しました";
        try {
            const e = await res.json();
            if (e?.error) msg = e.error;
        } catch { /* ignore */ }
        throw new Error(msg);
    }

    const data = await res.json();
    return data.url as string;
};
