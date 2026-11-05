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
| `src/flocon.ts` | Your URL rule: `/<locale><path>` |
| `src/app/page.tsx` | `/` redirects to `/en` |
| `src/app/[locale]/[[...slugs]]/page.tsx` | Every Flocon page: `/en` = page `/`, `/en/about` = page `/about` |
| `src/app/sitemap.ts` | `/sitemap.xml` |
| `src/app/llms.txt/route.ts` | `/llms.txt` |

Every page is a Flocon page, made through the MCP server. No i18n lib: the `[locale]` part of the URL goes to Flocon as is.

## A full website: `/full-website`

The same pages, in a real website: a header, a nav that builds itself, and a footer. Open [localhost:3000/full-website](http://localhost:3000/full-website).

| File | What |
| --- | --- |
| `src/app/full-website/[locale]/layout.tsx` | Header, nav and footer around every page |
| `src/app/full-website/[locale]/[[...slugs]]/page.tsx` | The Flocon page. A folder with no page of its own (like `/vs`) lists its pages |
| `src/app/full-website/nav.ts` | Builds the nav from `getAllPages()`: `/about` = a link, `/vs/*` = a dropdown |
| `src/app/full-website/full-website.css` | The Flocon AI look (light + dark), for `/full-website` only |

Publish a new page from your AI tool: it shows up in the nav and the footer on the next visit. No code change.

The canonical URL of each page stays `/<locale>/...`, so Google sees one URL per page.

In production, set `SITE_URL` (like `https://demo.example.com`) and `FLOCON_TOKEN` in your host.

Docs: [flocon-ai.com/docs/nextjs/install](https://flocon-ai.com/docs/nextjs/install)
