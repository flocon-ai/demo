// Your URL rule: where a Flocon page lives on this website.
// Used for the canonical URL, hreflang, related links, sitemap and llms.txt.
const SITE_URL = process.env.SITE_URL ?? "http://localhost:5173"

export const url = ({ locale, path }: { locale: string; path: string }) =>
  `${SITE_URL}/${locale}${path === "/" ? "" : path}`
