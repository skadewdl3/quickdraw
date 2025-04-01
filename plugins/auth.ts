import { createAuthClient } from "better-auth/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const auth = createAuthClient({
    baseURL: config.public.BETTER_AUTH_URL,
  });

  return {
    provide: {
      auth,
    },
  };
});
