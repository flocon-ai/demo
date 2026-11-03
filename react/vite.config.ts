import { reactRouter } from "@react-router/dev/vite"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // @flocon-ai/react reads FLOCON_TOKEN from process.env. Vite doesn't put .env there, so we do.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))
  return { plugins: [reactRouter()] }
})
