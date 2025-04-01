<script setup lang="ts">
import { ref } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import Result from "@/lib/result";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
});

type SchemaKeys = keyof z.infer<typeof schema>;

const formData = ref<z.infer<typeof schema>>({
  email: "",
  password: "",
  remember: false,
});
const errors = ref<Partial<Record<SchemaKeys, string>>>({});
const { $auth } = useNuxtApp();
const router = useRouter();

// Watch for changes and clear corresponding errors
watch(
  formData,
  () => {
    for (let key of Object.keys(formData.value) as SchemaKeys[]) {
      if (errors.value[key]) {
        errors.value[key] = "";
      }
    }
  },
  { deep: true },
);

const handleSubmit = async () => {
  // Ignoring remember choice for now
  const { remember, ...data } = formData.value;
  const authResult = await Result.wrapAsync($auth.signIn.email, data);

  if (authResult.isErr) {
    console.log("Unknown error: ", authResult.unwrapErr());
    return;
  }

  let res = authResult.unwrap();
  if (res.error) {
    console.log("Sign in error: ", res.error);
    return;
  }

  router.push("/dashboard");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription
          >Enter your credentials to access your account</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="formData.email"
                placeholder="Enter your email"
              />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="formData.password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <!-- <div class="flex items-center mt-4">
            <Checkbox id="remember" v-model="formData.remember" />
            <Label class="ml-2" for="remember">Remember me</Label>
          </div> -->
          <Button class="w-full mt-6" type="submit"> Sign in </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
