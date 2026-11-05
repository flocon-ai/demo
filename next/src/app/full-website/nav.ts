import { cache } from "react"
import { getAllPages, type PageEntry } from "@flocon-ai/next"

// UI text. EN + FR. Any other locale gets English.
export const STRINGS: Record<string, Record<string, string>> = {
  en: {
    seeAll: "See all",
    pages: "Pages",
    language: "Language",
    builtWith: "Every page of this website is written by an AI and published with",
    code: "Source code",
    vs: "Comparisons",
    alternatives: "Alternatives",
    integrations: "Integrations",
    "use-cases": "Use cases"
  },
  fr: {
    seeAll: "Tout voir",
    pages: "Pages",
    language: "Langue",
    builtWith: "Chaque page de ce site est écrite par une IA et publiée avec",
    code: "Code source",
    vs: "Comparaisons",
    alternatives: "Alternatives",
    integrations: "Intégrations",
    "use-cases": "Cas d'usage"
  }
}

export const t = (locale: string, key: string) => (STRINGS[locale] ?? STRINGS.en)[key] ?? key

// "vs" → "Comparisons". Unknown folder → "My folder".
export const groupLabel = (locale: string, folder: string) =>
  (STRINGS[locale] ?? STRINGS.en)[folder] ?? label("/" + folder)

// Published pages only (no drafts). One fetch per request, shared by the layout and the page.
const allPages = cache(() => getAllPages())

export const getPages = async (locale: string) =>
  (await allPages()).filter((p) => p.locale === locale)

export const getLocales = async () => [...new Set((await allPages()).map((p) => p.locale))].sort()

export type Group = { folder: string; label: string; pages: PageEntry[] }

// Short nav label from the path: "/how-it-works" → "How it works". The full title stays in the footer.
export const label = (path: string) => {
  const last = path.split("/").pop() ?? ""
  const words = last.replace(/-/g, " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// /about → a plain link. /vs/a-vs-b → the "vs" group. The homepage "/" is the logo link.
export async function getNav(locale: string) {
  const links: PageEntry[] = []
  const byFolder: Record<string, PageEntry[]> = {}
  for (const p of await getPages(locale)) {
    if (p.path === "/") continue
    const [, folder, sub] = p.path.split("/")
    if (!sub) links.push(p)
    else (byFolder[folder] ??= []).push(p)
  }
  const groups: Group[] = Object.entries(byFolder).map(([folder, pages]) => ({
    folder,
    label: groupLabel(locale, folder),
    pages
  }))
  return { links, groups }
}
