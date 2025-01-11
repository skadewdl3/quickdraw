// Export all the schemas from a single file, for easier access
export * from "./schema/auth";
export * from "./schema/board";

// Export all all utilities from drizzle-orm for easier access
export * from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

// Create a new database connection
export const db = drizzle({
  connection: process.env.DATABASE_URL as string,
});
