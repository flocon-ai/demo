import { floconSitemap } from "@flocon-ai/next"
import { url } from "@/flocon"

export const dynamic = "force-dynamic"

export default function sitemap() {
  return floconSitemap({ url })
}
