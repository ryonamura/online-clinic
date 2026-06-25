// @ts-check
import { defineConfig } from 'astro/config';

// 静的サイト出力（既存の Firebase Hosting 等にそのまま乗る）
export default defineConfig({
  site: 'https://kireirepo-online.clinic',
  trailingSlash: 'ignore',
});
