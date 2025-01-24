<script setup lang="ts">
const x = ref(0);

const { status, data, send, open, close } = useWebSocketSafe({
  schema: z.object({ message: z.string() }),
});

watch(data, () => {
  console.log({ status: status.value, data: data.value });
});

watch(status, () => {
  if (status.value === "OPEN") {
    send({ message: "Hello World" });
  }
});
</script>

<template>
  <p>{{ x }}</p>
  <Button>Hello World</Button>
</template>
