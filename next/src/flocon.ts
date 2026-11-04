// Your URL rule: where a Flocon page lives on this website.
// Used for the canonical URL, hreflang, related links, sitemap and llms.txt.
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000"

export const url = (page: { locale: string; path: string }) => SITE_URL + href(page)

// The link to a Flocon page on this website: /en, /en/about, /en/vs/a-vs-b
export const href = ({ locale, path }: { locale: string; path: string }) =>
  `/${locale}${path === "/" ? "" : path}`

// Group labels. A group without a label uses its path segment ("guides" → "Guides").
const LABELS: Record<string, string> = { vs: "Comparisons" }

type NavPage = { locale: string; path: string; title: string }
export type Nav = {
  links: NavPage[] // top-level pages: /about, /pricing
  groups: { label: string; pages: NavPage[] }[] // /vs/*, /alternatives/*…
}

// Header + footer links, built from your published pages.
// Publish /vs/a-vs-b with your AI → a "Comparisons" group shows up. No code change.
export function buildNav(pages: NavPage[], locale: string): Nav {
  const links: NavPage[] = []
  const groups = new Map<string, NavPage[]>()
  for (const page of pages) {
    if (page.locale !== locale || page.path === "/") continue // home = the logo
    const [, first, rest] = page.path.split("/") // "/vs/a-vs-b" → ["", "vs", "a-vs-b"]
    if (!rest) links.push(page)
    else groups.set(first, [...(groups.get(first) ?? []), page])
  }
  return {
    links,
    groups: [...groups].map(([segment, pages]) => ({
      label: LABELS[segment] ?? segment[0].toUpperCase() + segment.slice(1),
      pages,
    })),
  }
}
