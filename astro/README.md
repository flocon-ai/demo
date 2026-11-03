# Flocon AI + Astro demo

A tiny Astro website that shows [Flocon AI](https://flocon-ai.com) pages with [`@flocon-ai/astro`](https://www.npmjs.com/package/@flocon-ai/astro).

## Run it

```bash
npm install
echo "FLOCON_TOKEN=<your website token>" > .env
npm run dev
```

Get the token from [flocon-ai.com/app/tokens](https://flocon-ai.com/app/tokens). Never commit it.

Then open [localhost:4321](http://localhost:4321). It redirects to `/en`.

## The files

| File | What |
| --- | --- |
| `astro.config.mjs` | SSR (`output: "server"`) + Node adapter |
| `src/flocon.ts` | Your URL rule: `/<locale><path>` |
| `src/pages/index.astro` | `/` redirects to `/en` |
| `src/pages/[locale]/[...slugs].astro` | Every Flocon page: `/en` = page `/`, `/en/about` = page `/about` |
| `src/pages/sitemap.xml.ts` | `/sitemap.xml` |
| `src/pages/llms.txt.ts` | `/llms.txt` |

Every page is a Flocon page, made through the MCP server. No i18n lib: the `[locale]` part of the URL goes to Flocon as is.

In production, set `SITE_URL` (like `https://demo.example.com`) and `FLOCON_TOKEN` in your host.

Docs: [flocon-ai.com/docs](https://flocon-ai.com/docs)
