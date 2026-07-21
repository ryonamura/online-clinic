import type { APIRoute } from "astro";

// robots.txt を site / base に追従して動的生成する。
// sitemap の場所は @astrojs/sitemap が出力する sitemap-index.xml を指す。
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL; // "/" もしくは "/online-clinic/"
  const sitemapPath = `${base.replace(/\/$/, "")}/sitemap-index.xml`;
  const sitemapUrl = site ? new URL(sitemapPath, site).href : sitemapPath;

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
