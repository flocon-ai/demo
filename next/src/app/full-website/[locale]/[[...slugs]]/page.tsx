import Link from "next/link"
import { notFound } from "next/navigation"
import { FloconPage, getFloconMetadata } from "@flocon-ai/next"
import { fullWebsiteUrl, url } from "@/flocon"
import { getPages, groupLabel } from "../../nav"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ locale: string; slugs?: string[] }> }

// /full-website/en → "/" (home), /full-website/en/about → "/about"
const toPath = (slugs: string[] = []) => "/" + slugs.join("/")

// A folder with no Flocon page of its own (e.g. /vs) = a hub: the list of its pages.
async function hubPages(locale: string, path: string) {
  const pages = await getPages(locale)
  if (pages.some((p) => p.path === path)) return null
  return pages.filter((p) => p.path.startsWith(path + "/"))
}

export async function generateMetadata({ params }: Props) {
  const { locale, slugs } = await params
  const path = toPath(slugs)
  const hub = await hubPages(locale, path)
  if (hub?.length) return { title: groupLabel(locale, path.slice(1)), robots: { index: false } }
  // Canonical = the /<locale>/... URL, so Google sees one URL per page.
  return getFloconMetadata({ locale, path, url })
}

export default async function Page({ params }: Props) {
  const { locale, slugs } = await params
  const path = toPath(slugs)
  const hub = await hubPages(locale, path)
  if (hub) {
    if (!hub.length) notFound()
    return (
      <section className="fw-container fw-hub">
        <h1>{groupLabel(locale, path.slice(1))}</h1>
        <ul>
          {hub.map((p) => (
            <li key={p.path}>
              <Link href={fullWebsiteUrl(p)}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }
  // Related links stay inside /full-website.
  return <FloconPage locale={locale} path={path} url={fullWebsiteUrl} />
}
