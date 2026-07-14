<script setup lang="ts">
import { CircleAlert, CircleCheck, Loader2, Rocket } from '@lucide/vue'
import api from '@/apis'
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

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    await api.auth.forgotPassword(email.value)
    success.value = true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
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
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive a reset link</CardDescription>
      </CardHeader>

      <CardContent>
        <Alert v-if="success" class="mb-4">
          <CircleCheck />
          <AlertDescription>Reset link sent! Check your email.</AlertDescription>
        </Alert>

        <Alert v-if="error" variant="destructive" class="mb-4">
          <CircleAlert />
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form v-if="!success" class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="forgot-email">Email Address</Label>
            <Input
              id="forgot-email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <Button type="submit" class="w-full" :disabled="loading">
            <Loader2 v-if="loading" class="animate-spin" />
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </Button>
        </form>
      </CardContent>

      <CardFooter class="justify-center">
        <RouterLink
          :to="{ name: 'login' }"
          class="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Back to Sign In
        </RouterLink>
      </CardFooter>
    </Card>
  </div>
</template>
