// Your URL rule: where a Flocon page lives on this website.
// Used for the canonical URL, hreflang, related links, sitemap and llms.txt.
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000"

export const url = ({ locale, path }: { locale: string; path: string }) =>
  `${SITE_URL}/${locale}${path === "/" ? "" : path}`

// The same pages under /full-website (header, nav, footer around them).
export const fullWebsiteUrl = ({ locale, path }: { locale: string; path: string }) =>
  `/full-website/${locale}${path === "/" ? "" : path}`
