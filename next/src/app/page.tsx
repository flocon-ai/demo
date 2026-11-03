import { getAllPages } from "@flocon-ai/next"
import { url } from "@/flocon"

export const dynamic = "force-dynamic"

export default async function Home() {
  const pages = await getAllPages()

  return (
    <main>
      <h1>Flocon AI demo</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.locale + page.path}>
            <a href={url(page)}>{page.title}</a> ({page.locale})
          </li>
        ))}
      </ul>
    </main>
  )
}
