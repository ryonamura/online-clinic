// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 静的サイト出力（本番は kireireport.com/online-clinic 配下）
export default defineConfig({
  // 本番既定値。GitHub Pages プレビュー等は CI で PUBLIC_SITE / PUBLIC_BASE を上書き
  site: process.env.PUBLIC_SITE || 'https://kireireport.com',
  base: process.env.PUBLIC_BASE || '/online-clinic/',
  // canonical / sitemap の URL を末尾スラッシュで統一し、重複URLを防ぐ
  trailingSlash: 'always',
  // sitemap-index.xml / sitemap-0.xml を自動生成（site + base を反映）
  integrations: [sitemap()],
});
