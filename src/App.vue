<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchCurrentUser()
  }
})
</script>

<template>
  <RouterView />
</template>
