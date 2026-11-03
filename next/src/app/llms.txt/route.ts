import { floconLlmsTxt } from "@flocon-ai/next"
import { url } from "@/flocon"

export const dynamic = "force-dynamic"

export async function GET() {
  const text = await floconLlmsTxt({ url })
  return new Response(text, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
