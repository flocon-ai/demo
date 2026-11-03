import { defineConfig } from "astro/config"
import node from "@astrojs/node"

// SSR: pages are read from Flocon on each request.
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
})
