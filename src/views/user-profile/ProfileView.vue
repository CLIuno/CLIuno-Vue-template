<script setup lang="ts">
import api from '@/apis'
import { useImageUpload } from '@/composables/useImageUpload'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { uploading, uploadError, uploadImage } = useImageUpload()
const fileInput = ref<HTMLInputElement | null>(null)

const initials = computed(() => {
  const u = authStore.user
  if (!u) return '?'
  return `${u.first_name?.[0] ?? ''}${u.last_name?.[0] ?? ''}`.toUpperCase() || '?'
})

async function onAvatarPicked(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const url = await uploadImage(file)
  if (url) {
    await api.user.updateCurrentUser({ avatar_url: url })
    await authStore.fetchCurrentUser()
  }

  // reset so re-picking the same file still fires change
  input.value = ''
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <Card>
      <CardContent>
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div class="flex flex-col items-center gap-2">
            <Avatar class="size-20">
              <AvatarImage
                v-if="authStore.user?.avatar_url"
                :src="authStore.user.avatar_url"
                :alt="authStore.fullName"
              />
              <AvatarFallback class="text-2xl">{{ initials }}</AvatarFallback>
            </Avatar>

            <input
              ref="fileInput"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              class="hidden"
              @change="onAvatarPicked"
            />
            <Button variant="outline" size="sm" :disabled="uploading" @click="fileInput?.click()">
              {{ uploading ? 'Uploading…' : 'Change photo' }}
            </Button>
          </div>

          <div class="min-w-0 flex-1 text-center sm:text-left">
            <h1 class="text-2xl font-bold tracking-tight">{{ authStore.fullName }}</h1>
            <p class="text-muted-foreground">@{{ authStore.user?.username }}</p>
            <p v-if="uploadError" class="mt-2 text-sm text-destructive">{{ uploadError }}</p>
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
