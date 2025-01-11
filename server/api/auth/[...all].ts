import { auth } from "@auth/server";

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
