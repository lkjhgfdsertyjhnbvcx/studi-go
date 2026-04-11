"use client";
import React, { useState, useEffect, useMemo } from "react";

/* ─────────────── 型定義 ─────────────── */
export interface TargetField {
  key: string;          // 内部キー（"name", "email" など）
  label: string;        // 表示名（"顧客名", "メールアドレス" など）
  required?: boolean;   // 必須カラムかどうか
  /** 自動マッチ用の別名リスト（小文字・記号除去で比較） */
  aliases: string[];
}

export interface ColumnMapping {
  [csvHeader: string]: string; // CSVヘッダー → TargetField.key（"" = 無視）
}

interface Props {
  /** CSVから読み取った生のヘッダー行 */
  csvHeaders: string[];
  /** CSVの先頭数行（プレビュー用） */
  previewRows: string[][];
  /** マッピング先のフィールド定義 */
  targetFields: TargetField[];
  /** マッピング確定時コールバック */
  onConfirm: (mapping: ColumnMapping) => void;
  /** キャンセル時コールバック */
  onCancel: () => void;
  /** アクセントカラー（purple / cyan） */
  accentColor?: "purple" | "cyan";
}

/* ─────── 正規化（全角スペース・記号除去・小文字化） ─────── */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[\s_\-　・]+/g, "").replace(/[()（）]/g, "");
}

/* ─────── 自動マッチング ─────── */
function autoMatch(
  csvHeaders: string[],
  targetFields: TargetField[]
): ColumnMapping {
  const mapping: ColumnMapping = {};
  const used = new Set<string>(); // 既にマッチ済みの target key

  for (const h of csvHeaders) {
    const hn = normalize(h);
    let matched = "";
    for (const tf of targetFields) {
      if (used.has(tf.key)) continue;
      for (const alias of tf.aliases) {
        if (hn === normalize(alias)) {
          matched = tf.key;
          break;
        }
      }
      if (matched) break;
    }
    if (matched) {
      mapping[h] = matched;
      used.add(matched);
    } else {
      mapping[h] = ""; // 未マッチ → 「無視」
    }
  }
  return mapping;
}

/* ══════════════════════════════════════════════════════ */
export default function CsvColumnMapper({
  csvHeaders,
  previewRows,
  targetFields,
  onConfirm,
  onCancel,
  accentColor = "purple",
}: Props) {
  const [mapping, setMapping] = useState<ColumnMapping>({});

  /* 初回：自動マッチング */
  useEffect(() => {
    setMapping(autoMatch(csvHeaders, targetFields));
  }, [csvHeaders, targetFields]);

  /* バリデーション：必須フィールドがマッピングされているか */
  const missingRequired = useMemo(() => {
    const mapped = new Set(Object.values(mapping));
    return targetFields.filter(f => f.required && !mapped.has(f.key));
  }, [mapping, targetFields]);

  /* 現在マッピングに使用中のキー（重複防止） */
  const usedKeys = useMemo(() => {
    const s = new Set<string>();
    for (const v of Object.values(mapping)) {
      if (v) s.add(v);
    }
    return s;
  }, [mapping]);

  const handleChange = (csvHeader: string, targetKey: string) => {
    setMapping(prev => ({ ...prev, [csvHeader]: targetKey }));
  };

  const accent = accentColor === "cyan" ? "cyan" : "purple";
  const btnBg = accent === "cyan" ? "bg-cyan-600 hover:bg-cyan-700" : "bg-purple-600 hover:bg-purple-700";
  const borderAccent = accent === "cyan" ? "border-cyan-500/40" : "border-purple-500/40";
  const badgeBg = accent === "cyan" ? "bg-cyan-500/20 text-cyan-300" : "bg-purple-500/20 text-purple-300";

  /* 自動マッチされた数 */
  const matchedCount = Object.values(mapping).filter(v => v).length;

  return (
    <div className={`border ${borderAccent} rounded-2xl p-5 bg-card`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-black text-foreground text-sm">カラムマッピング</h3>
          <p className="text-xs text-muted-foreground mt-1">
            CSVの各列をどのフィールドに対応させるか選択してください
          </p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${badgeBg}`}>
          {matchedCount}/{csvHeaders.length} 列マッチ
        </span>
      </div>

      {/* 自動マッチ結果バナー */}
      {matchedCount > 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2 mb-4 text-xs text-green-400">
          自動検出で {matchedCount} 列がマッチしました。必要に応じて手動で調整してください。
        </div>
      )}

      {/* マッピングテーブル */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 font-black text-muted-foreground">CSV列ヘッダー</th>
              <th className="text-left p-2 font-black text-muted-foreground">サンプル値</th>
              <th className="text-left p-2 font-black text-muted-foreground">→</th>
              <th className="text-left p-2 font-black text-muted-foreground">対応フィールド</th>
            </tr>
          </thead>
          <tbody>
            {csvHeaders.map((h, idx) => {
              const currentTarget = mapping[h] || "";
              // サンプル値（先頭3行から）
              const samples = previewRows
                .slice(0, 3)
                .map(row => row[idx] || "")
                .filter(v => v);
              return (
                <tr key={h} className="border-b border-border/50 hover:bg-accent/5">
                  <td className="p-2 font-bold text-foreground">{h}</td>
                  <td className="p-2 text-muted-foreground max-w-[200px] truncate">
                    {samples.length > 0 ? samples.join(" / ") : "—"}
                  </td>
                  <td className="p-2 text-muted-foreground">→</td>
                  <td className="p-2">
                    <select
                      value={currentTarget}
                      onChange={e => handleChange(h, e.target.value)}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                        ${currentTarget
                          ? `bg-${accent}-500/10 border-${accent}-500/30 text-foreground`
                          : "bg-accent/10 border-border text-muted-foreground"
                        }
                      `}
                    >
                      <option value="">（無視する）</option>
                      {targetFields.map(tf => {
                        const disabled = usedKeys.has(tf.key) && currentTarget !== tf.key;
                        return (
                          <option key={tf.key} value={tf.key} disabled={disabled}>
                            {tf.label}{tf.required ? " *" : ""}{disabled ? "（使用済み）" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 必須フィールド警告 */}
      {missingRequired.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 mt-4 text-xs text-red-400">
          <span className="font-black">必須フィールドが未設定:</span>{" "}
          {missingRequired.map(f => f.label).join("、")}
        </div>
      )}

      {/* プレビュー（マッピング適用後） */}
      {matchedCount > 0 && previewRows.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-black text-muted-foreground mb-2">マッピング適用プレビュー</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  {csvHeaders.map(h => {
                    const target = mapping[h];
                    const tf = targetFields.find(f => f.key === target);
                    if (!target) return null;
                    return (
                      <th key={h} className={`text-left p-1.5 bg-${accent}-500/10 font-black text-${accent}-300 border-b border-border`}>
                        {tf?.label || target}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {previewRows.slice(0, 3).map((row, ri) => (
                  <tr key={ri}>
                    {csvHeaders.map((h, ci) => {
                      if (!mapping[h]) return null;
                      return (
                        <td key={ci} className="p-1.5 border-b border-border/50 text-foreground">
                          {row[ci] || ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ボタン */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onConfirm(mapping)}
          disabled={missingRequired.length > 0}
          className={`px-5 py-2 ${btnBg} disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black rounded-lg transition-all`}
        >
          このマッピングでインポート
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-accent/10 hover:bg-accent/20 text-foreground text-xs font-bold rounded-lg transition-all"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
