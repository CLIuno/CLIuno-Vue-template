<script setup lang="ts">
import { Loader2, UserCheck, UserPlus } from '@lucide/vue'
import api from '@/apis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

interface User {
  id: string
  username: string
  avatar_url?: string | null
  first_name: string
  last_name: string
  email: string
}

const user = ref<User | null>(null)
const loading = ref(true)
const followers = ref<User[]>([])
const following = ref<User[]>([])
const isFollowing = ref(false)

const isOwnProfile = computed(() => authStore.user?.id === user.value?.id)

async function loadProfile() {
  loading.value = true
  const userId = (route.params.id as string) || authStore.user?.id
  if (!userId) {
    loading.value = false
    return
  }
  try {
    const userRes = await api.user.getUserById(userId)
    user.value = userRes.data.data.user

    const [followersRes, followingRes, followStatusRes] = await Promise.all([
      api.follow.getFollowers(userId),
      api.follow.getFollowing(userId),
      authStore.user?.id === userId
        ? Promise.resolve({ data: { data: { isFollowing: false } } })
        : api.follow.isFollowing(userId),
    ])
    followers.value = followersRes.data.data.followers
    following.value = followingRes.data.data.following
    isFollowing.value = followStatusRes.data.data.isFollowing
  } catch {
    // handle
  } finally {
    loading.value = false
  }
}

async function toggleFollow() {
  if (!user.value) return
  try {
    if (isFollowing.value) {
      await api.follow.unfollow(user.value.id)
      isFollowing.value = false
      followers.value = followers.value.filter((f) => f.id !== authStore.user?.id)
    } else {
      await api.follow.follow(user.value.id)
      isFollowing.value = true
      if (authStore.user) followers.value.push(authStore.user as User)
    }
  } catch {
    // handle
  }
}

watch(() => route.params.id, loadProfile)
onMounted(loadProfile)
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="size-8 animate-spin text-muted-foreground" />
    </div>

    <template v-else-if="user">
      <!-- Profile Card -->
      <Card class="mb-6">
        <CardContent>
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar class="size-20">
              <AvatarImage v-if="user.avatar_url" :src="user.avatar_url" :alt="user.username" />
              <AvatarFallback class="text-2xl">
                {{ user.first_name[0] }}{{ user.last_name[0] }}
              </AvatarFallback>
            </Avatar>

            <div class="min-w-0 flex-1 text-center sm:text-left">
              <h1 class="text-2xl font-bold tracking-tight">
                {{ user.first_name }} {{ user.last_name }}
              </h1>
              <p class="text-muted-foreground">@{{ user.username }}</p>
              <p v-if="user.email" class="truncate text-sm text-muted-foreground">
                {{ user.email }}
              </p>
            </div>

            <Button
              v-if="!isOwnProfile"
              :variant="isFollowing ? 'outline' : 'default'"
              class="shrink-0"
              @click="toggleFollow"
            >
              <UserCheck v-if="isFollowing" />
              <UserPlus v-else />
              {{ isFollowing ? 'Following' : 'Follow' }}
            </Button>
          </div>

          <Separator class="my-4" />

          <!-- Stats -->
          <div class="flex justify-center gap-8 sm:justify-start">
            <div class="text-center">
              <span class="text-xl font-bold">{{ followers.length }}</span>
              <p class="text-sm text-muted-foreground">Followers</p>
            </div>
            <div class="text-center">
              <span class="text-xl font-bold">{{ following.length }}</span>
              <p class="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Followers -->
      <Card v-if="followers.length" class="mb-6">
        <CardContent>
          <h2 class="mb-3 text-lg font-semibold">Followers</h2>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="f in followers"
              :key="f.id"
              :to="{ name: 'user-profile', params: { id: f.id } }"
              class="flex items-center gap-2 rounded-full bg-muted py-1 pr-3 pl-1 text-sm transition-colors hover:bg-accent"
            >
              <Avatar class="size-6">
                <AvatarImage v-if="f.avatar_url" :src="f.avatar_url" :alt="f.username" />
                <AvatarFallback class="text-xs">{{ f.first_name[0] }}</AvatarFallback>
              </Avatar>
              <span>{{ f.username }}</span>
            </RouterLink>
          </div>
        </CardContent>
      </Card>

      <!-- Following -->
      <Card v-if="following.length">
        <CardContent>
          <h2 class="mb-3 text-lg font-semibold">Following</h2>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="f in following"
              :key="f.id"
              :to="{ name: 'user-profile', params: { id: f.id } }"
              class="flex items-center gap-2 rounded-full bg-muted py-1 pr-3 pl-1 text-sm transition-colors hover:bg-accent"
            >
              <Avatar class="size-6">
                <AvatarImage v-if="f.avatar_url" :src="f.avatar_url" :alt="f.username" />
                <AvatarFallback class="text-xs">{{ f.first_name[0] }}</AvatarFallback>
              </Avatar>
              <span>{{ f.username }}</span>
            </RouterLink>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
