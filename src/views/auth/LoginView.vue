<script setup lang="ts">
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
  <div class="tw:min-h-screen tw:flex tw:items-center tw:justify-center tw:bg-base-200 tw:px-4">
    <div class="tw:card tw:w-full tw:max-w-md tw:bg-base-100 tw:shadow-xl">
      <div class="tw:card-body tw:p-8">
        <!-- Logo -->
        <div class="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:mb-2">
          <Icon icon="mdi:rocket-launch-outline" class="tw:w-8 tw:h-8 tw:text-primary" />
          <span class="tw:text-2xl tw:font-bold tw:text-primary">CLIuno</span>
        </div>

        <h2 class="tw:text-2xl tw:font-bold tw:text-center tw:mb-1">Welcome back</h2>
        <p class="tw:text-center tw:text-base-content/60 tw:mb-6">Sign in to your account</p>

        <!-- Error Alert -->
        <div v-if="authStore.error" class="tw:alert tw:alert-error tw:mb-4">
          <Icon icon="mdi:alert-circle" class="tw:w-5 tw:h-5" />
          <span>{{ authStore.error }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="tw:space-y-4">
          <!-- Email/Username -->
          <fieldset class="tw:fieldset">
            <legend class="tw:fieldset-legend">Email or Username</legend>
            <div class="tw:input tw:w-full">
              <Icon icon="mdi:account-outline" class="tw:h-[1em] tw:opacity-50" />
              <input
                id="login-username"
                v-model="usernameOrEmail"
                type="text"
                placeholder="Enter your email or username"
                class="tw:grow"
                required
              />
            </div>
          </fieldset>

          <!-- Password -->
          <fieldset class="tw:fieldset">
            <legend class="tw:fieldset-legend">Password</legend>
            <div class="tw:input tw:w-full">
              <Icon icon="mdi:lock-outline" class="tw:h-[1em] tw:opacity-50" />
              <input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="tw:grow"
                required
              />
              <button
                type="button"
                @click.prevent="showPassword = !showPassword"
                class="tw:btn tw:btn-ghost tw:btn-xs tw:btn-circle"
              >
                <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="tw:w-4 tw:h-4" />
              </button>
            </div>
          </fieldset>

          <!-- Forgot Password -->
          <div class="tw:flex tw:justify-end">
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="tw:link tw:link-primary tw:text-sm"
            >
              Forgot password?
            </RouterLink>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="tw:btn tw:btn-primary tw:w-full"
            :class="{ 'tw:loading': authStore.loading }"
            :disabled="authStore.loading"
          >
            <Icon v-if="!authStore.loading" icon="mdi:login" class="tw:w-5 tw:h-5" />
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="tw:divider tw:text-sm">Don't have an account?</div>

        <!-- Register Link -->
        <RouterLink
          :to="{ name: 'register' }"
          class="tw:btn tw:btn-outline tw:btn-secondary tw:w-full"
        >
          <Icon icon="mdi:account-plus-outline" class="tw:w-5 tw:h-5" />
          Create Account
        </RouterLink>
      </div>
    </div>
  </div>
</template>
