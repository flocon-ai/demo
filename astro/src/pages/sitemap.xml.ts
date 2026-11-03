import { floconSitemap } from "@flocon-ai/astro"
import { url } from "../flocon"

export async function GET() {
  const pages = await floconSitemap({ url })
  const urls = pages
    .map((p) => `<url><loc>${p.url}</loc><lastmod>${p.lastModified}</lastmod></url>`)
    .join("")
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "content-type": "application/xml; charset=utf-8" } }
  )
}
