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

const email = ref("");
const password = ref("");
const remember = ref(false);

const handleSubmit = () => {
    // Handle login logic here
    console.log("Login submitted", {
        email: email.value,
        password: password.value,
        remember: remember.value,
    });
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <Card class="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription
                    >Enter your credentials to access your
                    account</CardDescription
                >
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleSubmit">
                    <div class="grid w-full items-center gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                v-model="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                v-model="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <div class="flex items-center mt-4">
                        <Checkbox id="remember" v-model="remember" />
                        <Label class="ml-2" for="remember">Remember me</Label>
                    </div>
                    <Button class="w-full mt-6" type="submit"> Sign in </Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
