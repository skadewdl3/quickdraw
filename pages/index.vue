<script setup lang="ts">
import { useWebSocket } from "@vueuse/core";
const x = ref(0);

const { status, data, send, open, close } = useWebSocket(
    "ws://localhost:3000/_ws",
);

watch([status, data], () => {
    console.log({ status: status.value, data: data.value });
});
</script>

<template>
    <p>{{ x }}</p>
    <Button>Hello World</Button>
</template>
