import Link from "next/link"
import { Figtree } from "next/font/google"
import { fullWebsiteUrl } from "@/flocon"
import { getLocales, getNav, getPages, label, t } from "./nav"
import { Snowflake } from "./snowflake"
import "./full-website.css"

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-figtree" })

// Max pages in a dropdown. More = a "See all" link to the group's hub page.
const MAX_IN_MENU = 5

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export default async function FullWebsiteLayout({ children, params }: Props) {
  const { locale } = await params
  const [{ links, groups }, pages, locales] = await Promise.all([getNav(locale), getPages(locale), getLocales()])
  const home = pages.find((p) => p.path === "/")
  const href = (path: string) => fullWebsiteUrl({ locale, path })

  return (
    <div className={`fw ${figtree.variable}`} lang={locale}>
      <header className="fw-header">
        <div className="fw-container fw-header-row">
          <Link href={href("/")} className="fw-logo">
            <Snowflake size={22} />
            <span>{home?.title ?? "Flocon AI demo"}</span>
          </Link>
          <nav className="fw-nav" aria-label="Main">
            {links.map((p) => (
              <Link key={p.path} href={href(p.path)} title={p.title}>
                {label(p.path)}
              </Link>
            ))}
            {groups.map((g) => (
              <details key={g.folder} className="fw-group">
                <summary>{g.label}</summary>
                <div className="fw-menu">
                  {g.pages.slice(0, MAX_IN_MENU).map((p) => (
                    <Link key={p.path} href={href(p.path)}>
                      {p.title}
                    </Link>
                  ))}
                  {g.pages.length > MAX_IN_MENU && (
                    <Link href={href(`/${g.folder}`)} className="fw-see-all">
                      {t(locale, "seeAll")} ({g.pages.length})
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </nav>
        </div>
      </header>

      <main className="fw-main">{children}</main>

      <footer className="fw-footer">
        <div className="fw-container fw-footer-grid">
          <div>
            <h2>{t(locale, "pages")}</h2>
            <ul>
              {links.map((p) => (
                <li key={p.path}>
                  <Link href={href(p.path)}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          {groups.map((g) => (
            <div key={g.folder}>
              <h2>{g.label}</h2>
              <ul>
                {g.pages.map((p) => (
                  <li key={p.path}>
                    <Link href={href(p.path)}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>{t(locale, "language")}</h2>
            <ul>
              {locales.map((l) => (
                <li key={l}>
                  <Link href={fullWebsiteUrl({ locale: l, path: "/" })} aria-current={l === locale ? "page" : undefined}>
                    {l.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fw-container fw-footer-bottom">
          <p>
            <Snowflake size={16} /> {t(locale, "builtWith")} <a href="https://flocon-ai.com">Flocon AI</a>.
          </p>
          <a href="https://github.com/flocon-ai/demo">{t(locale, "code")}</a>
        </div>
      </footer>
    </div>
  )
}
