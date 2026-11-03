import { floconSitemap } from "@flocon-ai/react"
import { url } from "../flocon"

export async function loader() {
  const xml = await floconSitemap({ url })
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } })
}
