import { useWebSocket } from "@vueuse/core";
import type { UseWebSocketOptions } from "@vueuse/core";
import { z } from "zod";

type UseWebSocketSafeOptions<T extends z.ZodType> = UseWebSocketOptions & {
  url?: string;
  schema: T;
};

export function useWebSocketSafe<T extends z.ZodType>({
  url = "http://localhost:3000/socket",
  schema,
  ...options
}: UseWebSocketSafeOptions<T>) {
  const socket = useWebSocket(url, options);

  const typedData = computed(() => {
    if (!socket.data.value) return null;

    try {
      return schema.parse(JSON.parse(socket.data.value));
    } catch (e) {
      console.error("WebSocket data validation failed:", e);
      return null;
    }
  });

  const send = (data: z.infer<T>) => {
    console.log(data);
    socket.send(JSON.stringify(data));
  };

  return {
    ...socket,
    data: typedData,
    send,
  };
}
