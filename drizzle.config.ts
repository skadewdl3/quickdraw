import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL || "",
  },
  verbose: true,
  strict: true,
});
