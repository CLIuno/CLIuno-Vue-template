<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const initials = computed(() => {
  const u = authStore.user
  if (!u) return '?'
  return `${u.first_name?.[0] ?? ''}${u.last_name?.[0] ?? ''}`.toUpperCase() || '?'
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <Card>
      <CardContent>
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar class="size-20">
            <AvatarFallback class="text-2xl">{{ initials }}</AvatarFallback>
          </Avatar>

          <div class="min-w-0 flex-1 text-center sm:text-left">
            <h1 class="text-2xl font-bold tracking-tight">{{ authStore.fullName }}</h1>
            <p class="text-muted-foreground">@{{ authStore.user?.username }}</p>
          </div>
        </div>

        <Separator class="my-4" />

        <dl class="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt class="text-muted-foreground">Email</dt>
            <dd class="truncate font-medium">{{ authStore.user?.email || '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted-foreground">Phone</dt>
            <dd class="truncate font-medium">{{ authStore.user?.phone || '—' }}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  </div>
</template>
