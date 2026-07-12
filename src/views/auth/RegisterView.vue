<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const showPassword = ref(false)

const form = ref({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

const passwordsMatch = computed(() => form.value.password === form.value.password_confirmation)
const isFormValid = computed(
  () =>
    form.value.first_name &&
    form.value.last_name &&
    form.value.username &&
    form.value.email &&
    form.value.phone &&
    form.value.password.length >= 8 &&
    passwordsMatch.value,
)

async function handleRegister() {
  if (!isFormValid.value) return
  try {
    await authStore.register(form.value)
  } catch {
    // error handled in store
  }
}
</script>

<template>
  <div
    class="tw:min-h-screen tw:flex tw:items-center tw:justify-center tw:bg-base-200 tw:px-4 tw:py-8"
  >
    <div class="tw:card tw:w-full tw:max-w-lg tw:bg-base-100 tw:shadow-xl">
      <div class="tw:card-body tw:p-8">
        <!-- Logo -->
        <div class="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:mb-2">
          <Icon icon="mdi:rocket-launch-outline" class="tw:w-8 tw:h-8 tw:text-primary" />
          <span class="tw:text-2xl tw:font-bold tw:text-primary">CLIuno</span>
        </div>

        <h2 class="tw:text-2xl tw:font-bold tw:text-center tw:mb-1">Create Account</h2>
        <p class="tw:text-center tw:text-base-content/60 tw:mb-6">Join the community</p>

        <!-- Error Alert -->
        <div v-if="authStore.error" class="tw:alert tw:alert-error tw:mb-4">
          <Icon icon="mdi:alert-circle" class="tw:w-5 tw:h-5" />
          <span>{{ authStore.error }}</span>
        </div>

        <form @submit.prevent="handleRegister" class="tw:space-y-4">
          <!-- Name Row -->
          <div class="tw:grid tw:grid-cols-2 tw:gap-4">
            <fieldset class="tw:fieldset">
              <legend class="tw:fieldset-legend">First Name</legend>
              <input
                v-model="form.first_name"
                type="text"
                placeholder="John"
                class="tw:input tw:w-full"
                required
              />
            </fieldset>
            <fieldset class="tw:fieldset">
              <legend class="tw:fieldset-legend">Last Name</legend>
              <input
                v-model="form.last_name"
                type="text"
                placeholder="Doe"
                class="tw:input tw:w-full"
                required
              />
            </fieldset>
          </div>

          <!-- Username -->
          <fieldset class="tw:fieldset">
            <legend class="tw:fieldset-legend">Username</legend>
            <div class="tw:input tw:w-full">
              <Icon icon="mdi:at" class="tw:h-[1em] tw:opacity-50" />
              <input
                id="reg-username"
                v-model="form.username"
                type="text"
                placeholder="johndoe"
                class="tw:grow"
                required
              />
            </div>
          </fieldset>

          <!-- Email -->
          <fieldset class="tw:fieldset">
            <legend class="tw:fieldset-legend">Email</legend>
            <div class="tw:input tw:w-full">
              <Icon icon="mdi:email-outline" class="tw:h-[1em] tw:opacity-50" />
              <input
                id="reg-email"
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                class="tw:grow"
                required
              />
            </div>
          </fieldset>

          <!-- Phone -->
          <fieldset class="tw:fieldset">
            <legend class="tw:fieldset-legend">Phone</legend>
            <div class="tw:input tw:w-full">
              <Icon icon="mdi:phone-outline" class="tw:h-[1em] tw:opacity-50" />
              <input
                id="reg-phone"
                v-model="form.phone"
                type="tel"
                placeholder="+966512345678"
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
                id="reg-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Min 8 characters"
                class="tw:grow"
                required
                minlength="8"
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

          <!-- Confirm Password -->
          <fieldset class="tw:fieldset">
            <legend class="tw:fieldset-legend">Confirm Password</legend>
            <div
              class="tw:input tw:w-full"
              :class="{ 'tw:input-error': form.password_confirmation && !passwordsMatch }"
            >
              <Icon icon="mdi:lock-check-outline" class="tw:h-[1em] tw:opacity-50" />
              <input
                id="reg-password-confirm"
                v-model="form.password_confirmation"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                class="tw:grow"
                required
              />
            </div>
            <p v-if="form.password_confirmation && !passwordsMatch" class="tw:label tw:text-error">
              Passwords do not match
            </p>
          </fieldset>

          <!-- Submit -->
          <button
            type="submit"
            class="tw:btn tw:btn-primary tw:w-full"
            :class="{ 'tw:loading': authStore.loading }"
            :disabled="authStore.loading || !isFormValid"
          >
            <Icon v-if="!authStore.loading" icon="mdi:account-plus-outline" class="tw:w-5 tw:h-5" />
            {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="tw:divider tw:text-sm">Already have an account?</div>

        <!-- Login Link -->
        <RouterLink :to="{ name: 'login' }" class="tw:btn tw:btn-outline tw:w-full">
          <Icon icon="mdi:login" class="tw:w-5 tw:h-5" />
          Sign In
        </RouterLink>
      </div>
    </div>
  </div>
</template>
