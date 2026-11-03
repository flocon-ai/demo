# Flocon AI demo

Tiny example websites that show [Flocon AI](https://flocon-ai.com) pages.

Flocon AI lets your AI agent (Claude, Cursor…) write SEO pages through an MCP server. Your website shows them with one npm package.

## The examples

| Folder | Framework | Package |
| --- | --- | --- |
| [`next/`](./next) | Next.js | [`@flocon-ai/next`](https://www.npmjs.com/package/@flocon-ai/next) |
| [`astro/`](./astro) | Astro | [`@flocon-ai/astro`](https://www.npmjs.com/package/@flocon-ai/astro) |
| [`react/`](./react) | React (React Router, server-rendered) | [`@flocon-ai/react`](https://www.npmjs.com/package/@flocon-ai/react) |

Each one is as small as possible. Pick yours and follow its README.

## What every example does

- `/` redirects to `/en`.
- `/<locale>/<path>` shows the Flocon page (home page included).
- `/sitemap.xml` and `/llms.txt` list your published pages.
- No i18n lib: the locale in the URL goes to Flocon as is.

You need a `FLOCON_TOKEN` from [flocon-ai.com/app/tokens](https://flocon-ai.com/app/tokens). Never commit it.

Docs: [flocon-ai.com/docs](https://flocon-ai.com/docs)

## License

[MIT](./LICENSE). Copy anything you want.
