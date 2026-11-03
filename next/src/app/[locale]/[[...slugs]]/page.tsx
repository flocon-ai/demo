import { FloconPage, getFloconMetadata } from "@flocon-ai/next"
import { url } from "@/flocon"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ locale: string; slugs?: string[] }> }

// /en → "/" (home), /en/about → "/about"
const toPath = (slugs: string[] = []) => "/" + slugs.join("/")

export async function generateMetadata({ params }: Props) {
  const { locale, slugs } = await params
  return getFloconMetadata({ locale, path: toPath(slugs), url })
}

export default async function Page({ params }: Props) {
  const { locale, slugs } = await params
  return <FloconPage locale={locale} path={toPath(slugs)} url={url} />
}
