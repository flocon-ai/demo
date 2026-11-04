# Flocon AI + React demo

A tiny React website (React Router v7, server-rendered) that shows [Flocon AI](https://flocon-ai.com) pages with [`@flocon-ai/react`](https://www.npmjs.com/package/@flocon-ai/react).

Server rendering is required: most AI bots don't run JavaScript. A browser-only React app (Vite SPA) would show them an empty page.

## Run it

```bash
npm install
echo "FLOCON_TOKEN=<your website token>" > .env
npm run dev
```

Get the token from [flocon-ai.com/app/tokens](https://flocon-ai.com/app/tokens). Never commit it.

Then open [localhost:5173](http://localhost:5173). It redirects to `/en`.

## The files

| File | What |
| --- | --- |
| `app/flocon.ts` | Your URL rule: `/<locale><path>` + `buildNav()`: groups pages by the first part of the path |
| `app/site.css` | Header + footer style |
| `app/routes.ts` | The 4 routes |
| `app/routes/home.ts` | `/` redirects to `/en` |
| `app/routes/flocon.tsx` | Every Flocon page: `/en` = page `/`, `/en/about` = page `/about`. Header + footer, links from `getAllPages()` |
| `app/routes/sitemap.ts` | `/sitemap.xml` |
| `app/routes/llms.ts` | `/llms.txt` |
| `vite.config.ts` | Loads `.env` into `process.env` (the lib reads the token there) |

Every page is a Flocon page, made through the MCP server. No i18n lib: the `:locale` part of the URL goes to Flocon as is.

In production, set `SITE_URL` (like `https://demo.example.com`) and `FLOCON_TOKEN` in your host.

Docs: [flocon-ai.com/docs](https://flocon-ai.com/docs)
