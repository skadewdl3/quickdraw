import { createAuthClient } from "better-auth/vue";

const config = useRuntimeConfig();

const auth = createAuthClient({
  baseURL: config.public.BETTER_AUTH_URL,
});

export default auth;
