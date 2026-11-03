import { FloconPage, getFloconMetadata } from "@flocon-ai/next"
import { HOME_PATH, url } from "@/flocon"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return getFloconMetadata({ locale, path: HOME_PATH, url })
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  return <FloconPage locale={locale} path={HOME_PATH} url={url} />
}
