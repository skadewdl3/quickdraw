import { createAuthClient } from "better-auth/react";

const config = useRuntimeConfig();

export const authClient = createAuthClient({
  baseURL: config.public.BETTER_AUTH_URL,
});
