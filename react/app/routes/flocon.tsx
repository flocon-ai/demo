// Every Flocon page: /en = page "/", /en/about = page "/about"
import { FloconPage, getAllPages, getFloconMetadata, getPage } from "@flocon-ai/react"
import { buildNav, href, url } from "../flocon"
import type { Route } from "./+types/flocon"

export async function loader({ params }: Route.LoaderArgs) {
  const [page, pages] = await Promise.all([
    getPage({ locale: params.locale, path: "/" + (params["*"] ?? "") }),
    getAllPages(),
  ])
  if (!page) throw new Response("Not found", { status: 404 })
  // Header + footer links, built from your published pages
  return { page, nav: buildNav(pages, params.locale) }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Not found" }]
  const m = getFloconMetadata({ page: data.page, url })
  return [
    { title: m.title },
    { name: "description", content: m.description },
    { property: "og:type", content: m.openGraph.type },
    { property: "og:title", content: m.openGraph.title },
    { property: "og:description", content: m.openGraph.description },
    { property: "og:url", content: m.openGraph.url },
    { property: "og:locale", content: m.openGraph.locale },
    { name: "twitter:card", content: m.twitter.card },
    { name: "twitter:title", content: m.twitter.title },
    { name: "twitter:description", content: m.twitter.description },
    { tagName: "link", rel: "canonical", href: m.canonical },
    ...Object.entries(m.languages).map(([hrefLang, href]) => ({ tagName: "link", rel: "alternate", hrefLang, href })),
  ]
}

export default function Page({ loaderData: { page, nav } }: Route.ComponentProps) {
  return (
    <>
      <header className="site-header">
        <a className="logo" href={`/${page.locale}`}>Flocon AI demo</a>
        {nav.links.map((p) => (
          <a key={p.path} href={href(p)}>{p.title}</a>
        ))}
        {nav.groups.map((group) => (
          <details key={group.label}>
            <summary>{group.label}</summary>
            <ul>
              {group.pages.map((p) => (
                <li key={p.path}><a href={href(p)}>{p.title}</a></li>
              ))}
            </ul>
          </details>
        ))}
      </header>

      <main>
        <FloconPage page={page} url={url} />
      </main>

      <footer className="site-footer">
        {nav.groups.map((group) => (
          <section key={group.label}>
            <h2>{group.label}</h2>
            <ul>
              {group.pages.map((p) => (
                <li key={p.path}><a href={href(p)}>{p.title}</a></li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2>Pages</h2>
          <ul>
            {nav.links.map((p) => (
              <li key={p.path}><a href={href(p)}>{p.title}</a></li>
            ))}
          </ul>
        </section>
      </footer>
    </>
  )
}
