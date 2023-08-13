<script setup>
import { ref } from 'vue'
import ParticlesComp from '@/components/common/ParticlesComp.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  router.push('/')
}
const password = ref('')
const visible = ref(false)
const rules = ref({
  required: (value) => !!value || 'Required.'
})
</script>
<template>
  <div class="container">
    <ParticlesComp />
    <div class="tw-grid place-items-center">
      <v-img
        class="mx-auto my-6"
        width="328"
        max-width="328"
        alt="CLIuno logo"
        src="@/assets/images/loading.png"
      ></v-img>
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field
          name="username"
          label="Username"
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[rules.required]"
          class="tw-pb-4"
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          class="tw-pb-4"
          label="Password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          :rules="[rules.required]"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily
            locked for three hours.
          </v-card-text>
        </v-card>
        <v-btn block class="mb-8" color="#644DD2" size="large" variant="tonal" @click="login()">
          Log In
        </v-btn>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
