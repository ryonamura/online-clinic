// 内部リンクを base パス（本番・プレビューとも /online-clinic 配下）に対応させるヘルパー。
// Astro の BASE_URL を前置きする（末尾スラッシュ有無は吸収）。
const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path; // 外部/アンカーはそのまま
  const b = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE; // "" または "/online-clinic"
  return path.startsWith("/") ? b + path : b + "/" + path;
}
