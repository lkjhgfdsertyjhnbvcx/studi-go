// 画像アップロード（サーバー経由）
// 旧実装はクライアントSDKでFirebase Storageに直アップロードしていたが、
// Storageルールのロックダウン後は不可。認証済みのサーバーAPI経由に変更。
// 呼び出し側のシグネチャ (base64 data URL, folder, filename?) → URL は維持する。

export const uploadImageToStorage = async (
    base64: string,
    folder: string,
    filename?: string
): Promise<string> => {
    // base64 data URL を Blob に変換（バイナリ送信でリクエストサイズを抑える）
    const blob = await (await fetch(base64)).blob();

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
