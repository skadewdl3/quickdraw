import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@db";
import { User, Session, Account, Verification, Board } from "@db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: User,
      session: Session,
      account: Account,
      verification: Verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
