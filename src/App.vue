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
  <div class="min-h-screen bg-background text-foreground">
    <RouterView />
  </div>
</template>
