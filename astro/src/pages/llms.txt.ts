import { floconLlmsTxt } from "@flocon-ai/astro"
import { url } from "../flocon"

export async function GET() {
  const text = await floconLlmsTxt({ url })
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } })
}
