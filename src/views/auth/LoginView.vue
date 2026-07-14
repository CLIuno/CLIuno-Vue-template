<script setup lang="ts">
import { CircleAlert, Eye, EyeOff, Loader2, Rocket } from '@lucide/vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const usernameOrEmail = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  if (!usernameOrEmail.value || !password.value) return
  try {
    await authStore.login(usernameOrEmail.value, password.value)
  } catch {
    // error handled in store
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background px-4 py-8">
    <Card class="w-full max-w-sm">
      <CardHeader class="text-center">
        <RouterLink to="/" class="mx-auto mb-2 flex items-center gap-2 font-semibold">
          <Rocket class="size-6" />
          <span class="text-xl">CLIuno</span>
        </RouterLink>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="authStore.error" variant="destructive" class="mb-4">
          <CircleAlert />
          <AlertDescription>{{ authStore.error }}</AlertDescription>
        </Alert>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <Label for="login-username">Email or Username</Label>
            <Input
              id="login-username"
              v-model="usernameOrEmail"
              type="text"
              placeholder="Enter your email or username"
              required
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="login-password">Password</Label>
              <RouterLink
                :to="{ name: 'forgot-password' }"
                class="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </RouterLink>
            </div>
            <div class="relative">
              <Input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="pr-9"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground hover:text-foreground"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="size-4" />
                <Eye v-else class="size-4" />
              </button>
            </div>
          </div>

          <Button type="submit" class="w-full" :disabled="authStore.loading">
            <Loader2 v-if="authStore.loading" class="animate-spin" />
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </Button>
        </form>
      </CardContent>

      <CardFooter class="justify-center">
        <p class="text-sm text-muted-foreground">
          Don't have an account?
          <RouterLink
            :to="{ name: 'register' }"
            class="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create account
          </RouterLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
