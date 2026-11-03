import { floconLlmsTxt } from "@flocon-ai/react"
import { url } from "../flocon"

export async function loader() {
  const text = await floconLlmsTxt({ url })
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } })
}
