<script setup lang="ts">
import { Loader2, UserCheck, UserPlus, Users } from '@lucide/vue'
import api from '@/apis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface User {
  id: string
  username: string
  avatar_url?: string | null
  first_name: string
  last_name: string
  email: string
}

const users = ref<User[]>([])
const loading = ref(true)
const followingMap = ref<Record<string, boolean>>({})

async function fetchUsers() {
  loading.value = true
  try {
    const res = await api.user.getUsers()
    users.value = res.data.data.users.filter((u: User) => u.id !== authStore.user?.id)
    // Check following status for each user
    for (const user of users.value) {
      try {
        const followRes = await api.follow.isFollowing(user.id)
        followingMap.value[user.id] = followRes.data.data.isFollowing
      } catch {
        followingMap.value[user.id] = false
      }
    }
  } catch {
    // handle
  } finally {
    loading.value = false
  }
}

async function toggleFollow(userId: string) {
  try {
    if (followingMap.value[userId]) {
      await api.follow.unfollow(userId)
      followingMap.value[userId] = false
    } else {
      await api.follow.follow(userId)
      followingMap.value[userId] = true
    }
  } catch {
    // handle
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Users</h1>
      <p class="text-muted-foreground">Discover and follow other users</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="size-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Empty State -->
    <div v-else-if="users.length === 0" class="py-20 text-center">
      <Users class="mx-auto size-16 text-muted-foreground/40" />
      <h3 class="mt-4 text-xl font-semibold">No other users yet</h3>
    </div>

    <!-- List -->
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card v-for="user in users" :key="user.id" class="transition-shadow hover:shadow-md">
        <CardContent class="flex items-center gap-4">
          <Avatar class="size-10">
            <AvatarImage v-if="user.avatar_url" :src="user.avatar_url" :alt="user.username" />
            <AvatarFallback>{{ user.first_name[0] }}{{ user.last_name[0] }}</AvatarFallback>
          </Avatar>

          <div class="min-w-0 flex-1">
            <RouterLink
              :to="{ name: 'user-profile', params: { id: user.id } }"
              class="block truncate font-medium underline-offset-4 hover:underline"
            >
              {{ user.first_name }} {{ user.last_name }}
            </RouterLink>
            <p class="truncate text-sm text-muted-foreground">
              @{{ user.username }}<template v-if="user.email"> &middot; {{ user.email }}</template>
            </p>
          </div>

          <Button
            size="sm"
            :variant="followingMap[user.id] ? 'outline' : 'default'"
            class="shrink-0"
            @click="toggleFollow(user.id)"
          >
            <UserCheck v-if="followingMap[user.id]" />
            <UserPlus v-else />
            {{ followingMap[user.id] ? 'Following' : 'Follow' }}
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
