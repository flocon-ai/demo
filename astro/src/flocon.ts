// Your URL rule: where a Flocon page lives on this website.
// Used for the canonical URL, hreflang, related links, sitemap and llms.txt.
const SITE_URL = import.meta.env.SITE_URL ?? "http://localhost:4321"

export const url = ({ locale, path }: { locale: string; path: string }) =>
  `${SITE_URL}/${locale}${path === "/" ? "" : path}`
