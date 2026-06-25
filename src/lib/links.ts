// 内部リンクを base パス（GitHub Pages のサブディレクトリ等）に対応させるヘルパー。
// 本番(カスタムドメイン)や開発では base="/" なので素通り、
// GitHub Pages では base="/online-clinic/" を前置きする。
const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path; // 外部/アンカーはそのまま
  const b = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE; // "" または "/online-clinic"
  return path.startsWith("/") ? b + path : b + "/" + path;
}
