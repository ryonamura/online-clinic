// @ts-check
import { defineConfig } from 'astro/config';

// 静的サイト出力（既存の Firebase Hosting 等にそのまま乗る）
export default defineConfig({
  // 本番はカスタムドメイン想定。GitHub Pages 等は CI で PUBLIC_SITE / PUBLIC_BASE を渡す
  site: process.env.PUBLIC_SITE || 'https://kireirepo-online.clinic',
  base: process.env.PUBLIC_BASE || '/',
  trailingSlash: 'ignore',
});
