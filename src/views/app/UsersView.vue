<script setup lang="ts">
import api from '@/apis'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface User {
  id: string
  username: string
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
  <div class="tw:max-w-4xl tw:mx-auto tw:px-4 tw:py-8">
    <div class="tw:mb-8">
      <h1 class="tw:text-3xl tw:font-bold tw:text-base-content">Users</h1>
      <p class="tw:text-base-content/60">Discover and follow other users</p>
    </div>

    <div v-if="loading" class="tw:flex tw:justify-center tw:py-20">
      <span class="tw:loading tw:loading-spinner tw:loading-lg tw:text-primary"></span>
    </div>

    <div v-else-if="users.length === 0" class="tw:text-center tw:py-20">
      <Icon
        icon="mdi:account-group-outline"
        class="tw:w-16 tw:h-16 tw:mx-auto tw:text-base-content/30"
      />
      <h3 class="tw:text-xl tw:font-semibold tw:mt-4">No other users yet</h3>
    </div>

    <div v-else class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-4">
      <div
        v-for="user in users"
        :key="user.id"
        class="tw:card tw:bg-base-100 tw:shadow-sm hover:tw:shadow-md tw:transition-shadow"
      >
        <div class="tw:card-body tw:p-4 tw:flex tw:flex-row tw:items-center tw:gap-4">
          <!-- Avatar -->
          <div class="tw:avatar tw:placeholder">
            <div class="tw:bg-primary tw:text-primary-content tw:w-12 tw:h-12 tw:rounded-full">
              <span class="tw:text-lg">{{ user.first_name[0] }}{{ user.last_name[0] }}</span>
            </div>
          </div>

          <!-- Info -->
          <div class="tw:flex-1">
            <RouterLink
              :to="{ name: 'user-profile', params: { id: user.id } }"
              class="tw:font-semibold hover:tw:text-primary tw:transition-colors"
            >
              {{ user.first_name }} {{ user.last_name }}
            </RouterLink>
            <p class="tw:text-sm tw:text-base-content/50">@{{ user.username }}</p>
          </div>

          <!-- Follow Button -->
          <button
            @click="toggleFollow(user.id)"
            class="tw:btn tw:btn-sm"
            :class="followingMap[user.id] ? 'tw:btn-outline' : 'tw:btn-primary'"
          >
            <Icon
              :icon="followingMap[user.id] ? 'mdi:account-check' : 'mdi:account-plus'"
              class="tw:w-4 tw:h-4"
            />
            {{ followingMap[user.id] ? 'Following' : 'Follow' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
