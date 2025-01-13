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
import { z } from "zod";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref<Record<string, string>>({});

// Watch for changes and clear corresponding errors
watch(email, () => {
  if (errors.value.email) {
    errors.value.email = "";
  }
});

watch(password, () => {
  if (errors.value.password) {
    errors.value.password = "";
  }
});

watch(confirmPassword, () => {
  if (errors.value.confirmPassword) {
    errors.value.confirmPassword = "";
  }
});

const schema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const onSubmit = () => {
  errors.value = {};
  try {
    schema.parse({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
    // Form is valid, handle submission
    console.log({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.errors.forEach((error) => {
        if (error.path) {
          errors.value[error.path[0]] = error.message;
        }
      });
    }
  } finally {
    console.log(errors.value);
  }
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
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                v-model="email"
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
                v-model="password"
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
                v-model="confirmPassword"
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
