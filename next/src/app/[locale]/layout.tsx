import Link from "next/link"
import { getAllPages } from "@flocon-ai/next"
import { buildNav, href } from "@/flocon"

// Header + footer around every Flocon page. The links come from your published pages.
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params
  const nav = buildNav(await getAllPages(), locale)

  return (
    <>
      <header className="site-header">
        <Link className="logo" href={`/${locale}`}>Flocon AI demo</Link>
        {nav.links.map((page) => (
          <Link key={page.path} href={href(page)}>{page.title}</Link>
        ))}
        {nav.groups.map((group) => (
          <details key={group.label}>
            <summary>{group.label}</summary>
            <ul>
              {group.pages.map((page) => (
                <li key={page.path}><Link href={href(page)}>{page.title}</Link></li>
              ))}
            </ul>
          </details>
        ))}
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        {nav.groups.map((group) => (
          <section key={group.label}>
            <h2>{group.label}</h2>
            <ul>
              {group.pages.map((page) => (
                <li key={page.path}><Link href={href(page)}>{page.title}</Link></li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h2>Pages</h2>
          <ul>
            {nav.links.map((page) => (
              <li key={page.path}><Link href={href(page)}>{page.title}</Link></li>
            ))}
          </ul>
        </section>
      </footer>
    </>
  )
}
