import { FloconPage, getFloconMetadata } from "@flocon-ai/next"
import { url } from "@/flocon"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ locale: string; slugs: string[] }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slugs } = await params
  return getFloconMetadata({ locale, path: "/" + slugs.join("/"), url })
}

export default async function Page({ params }: Props) {
  const { locale, slugs } = await params
  return <FloconPage locale={locale} path={"/" + slugs.join("/")} url={url} />
}
