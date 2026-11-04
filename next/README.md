# Flocon AI + Next.js demo

A tiny Next.js website that shows [Flocon AI](https://flocon-ai.com) pages with [`@flocon-ai/next`](https://www.npmjs.com/package/@flocon-ai/next).

## Run it

```bash
npm install
echo "FLOCON_TOKEN=<your website token>" > .env.local
npm run dev
```

Get the token from [flocon-ai.com/app/tokens](https://flocon-ai.com/app/tokens). Never commit it.

Then open [localhost:3000](http://localhost:3000). It redirects to `/en`.

## The files

| File | What |
| --- | --- |
| `src/flocon.ts` | Your URL rule: `/<locale><path>` + `buildNav()`: groups pages by the first part of the path |
| `src/app/[locale]/layout.tsx` | Header + footer, links from `getAllPages()` |
| `src/app/page.tsx` | `/` redirects to `/en` |
| `src/app/[locale]/[[...slugs]]/page.tsx` | Every Flocon page: `/en` = page `/`, `/en/about` = page `/about` |
| `src/app/sitemap.ts` | `/sitemap.xml` |
| `src/app/llms.txt/route.ts` | `/llms.txt` |

Every page is a Flocon page, made through the MCP server. No i18n lib: the `[locale]` part of the URL goes to Flocon as is.

In production, set `SITE_URL` (like `https://demo.example.com`) and `FLOCON_TOKEN` in your host.

Docs: [flocon-ai.com/docs/nextjs/install](https://flocon-ai.com/docs/nextjs/install)
