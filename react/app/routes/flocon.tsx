// Every Flocon page: /en = page "/", /en/about = page "/about"
import { FloconPage, getFloconMetadata, getPage } from "@flocon-ai/react"
import { url } from "../flocon"
import type { Route } from "./+types/flocon"

export async function loader({ params }: Route.LoaderArgs) {
  const page = await getPage({ locale: params.locale, path: "/" + (params["*"] ?? "") })
  if (!page) throw new Response("Not found", { status: 404 })
  return page
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Not found" }]
  const m = getFloconMetadata({ page: data, url })
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

export default function Page({ loaderData }: Route.ComponentProps) {
  return <FloconPage page={loaderData} url={url} />
}
