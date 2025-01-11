import "dotenv/config";
import { defineConfig } from "drizzle-kit";
const config = useRuntimeConfig();

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DB_URL,
  },
  verbose: true,
  strict: true,
});
