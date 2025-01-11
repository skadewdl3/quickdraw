import { resolve } from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode"],
  alias: {
    "@db": resolve(__dirname, "./lib/db/db.ts"),
    "@auth": resolve(__dirname, "./lib/auth"),
    "@components": resolve(__dirname, "./components"),
    "@utils": resolve(__dirname, "./lib/utils.ts"),
  },
  runtimeConfig: {
    DB_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    public: {
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
