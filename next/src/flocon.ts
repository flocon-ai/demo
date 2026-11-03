// Your URL rule: where a Flocon page lives on this website.
// Used for the canonical URL, hreflang, related links, sitemap and llms.txt.
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000"

// The Flocon page shown at /<locale> (a Flocon path can't be "/").
export const HOME_PATH = "/home"

export const url = ({ locale, path }: { locale: string; path: string }) =>
  path === HOME_PATH ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}${path}`
