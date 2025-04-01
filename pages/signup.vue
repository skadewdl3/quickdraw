<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Schema, z } from "zod";
import Result from "@/lib/result";

const { $auth } = useNuxtApp();
const router = useRouter();

const schema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    name: z.string().min(1, "Name cannot be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SchemaKeys = keyof z.infer<typeof schema>;

const formData = ref<z.infer<typeof schema>>({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
});

const errors = ref<Partial<Record<SchemaKeys, string>>>({});

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

const onSubmit = async () => {
  let res = Result.wrap(schema.parse, formData.value);

  if (res.isErr) {
    let err = res.unwrapErr();
    if (!(err instanceof z.ZodError)) return;

    err.errors.forEach((error) => {
      if (error.path) {
        errors.value[error.path[0] as SchemaKeys] = error.message;
      }
    });
    return;
  }

  let data = res.unwrap();
  let authResult = await Result.wrapAsync($auth.signUp.email, data);

  if (authResult.isErr) {
    // TODO: show error toast
    console.log("Unknown error: ", authResult.unwrapErr());
    return;
  }

  let authRes = authResult.unwrap();
  if (authRes.error) {
    // TODO: show error toast
    console.log("Sign up Error: ", authRes.error);
    return;
  }

  router.push("/login");
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="John Doe"
                v-model="formData.name"
                :class="{ 'border-red-500': errors.name }"
              />
              <span v-if="errors.name" class="text-sm text-red-500">{{
                errors.name
              }}</span>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@quickdraw.com"
                v-model="formData.email"
                :class="{ 'border-red-500': errors.email }"
              />
              <span v-if="errors.email" class="text-sm text-red-500">{{
                errors.email
              }}</span>
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                v-model="formData.password"
                :class="{ 'border-red-500': errors.password }"
              />
              <span v-if="errors.password" class="text-sm text-red-500">{{
                errors.password
              }}</span>
            </div>
            <div class="grid gap-2">
              <Label for="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                v-model="formData.confirmPassword"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <span
                v-if="errors.confirmPassword"
                class="text-sm text-red-500"
                >{{ errors.confirmPassword }}</span
              >
            </div>
            <Button type="submit" class="w-full">Create Account</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-center">
        <p class="text-sm text-gray-500">
          Already have an account?
          <RouterLink to="/login" class="text-primary hover:underline">
            Sign in
          </RouterLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
