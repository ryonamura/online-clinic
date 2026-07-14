import type { APIRoute } from "astro";
import { withBase } from "../lib/links";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(withBase("/sitemap-index.xml"), site).href;

  return new Response(
    ["User-agent: *", "Allow: /", `Sitemap: ${sitemapURL}`, ""].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
