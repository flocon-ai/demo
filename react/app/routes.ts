import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.ts"), // / → /en
  route("sitemap.xml", "routes/sitemap.ts"),
  route("llms.txt", "routes/llms.ts"),
  route(":locale/*", "routes/flocon.tsx"), // every Flocon page (also /en)
] satisfies RouteConfig
