<script setup lang="ts">
import api from '@/apis'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

interface User {
  id: string
  username: string
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
  <div class="tw:max-w-3xl tw:mx-auto tw:px-4 tw:py-8">
    <div v-if="loading" class="tw:flex tw:justify-center tw:py-20">
      <span class="tw:loading tw:loading-spinner tw:loading-lg tw:text-primary"></span>
    </div>

    <template v-else-if="user">
      <!-- Profile Card -->
      <div class="tw:card tw:bg-base-100 tw:shadow-lg tw:mb-6">
        <!-- Cover -->
        <div
          class="tw:bg-linear-to-r tw:from-primary tw:to-secondary tw:h-32 tw:rounded-t-2xl"
        ></div>

        <div class="tw:card-body tw:pt-0">
          <div
            class="tw:flex tw:flex-col sm:tw:flex-row tw:items-center sm:tw:items-end tw:gap-4 tw:-mt-12"
          >
            <!-- Avatar -->
            <div class="tw:avatar tw:placeholder">
              <div
                class="tw:bg-neutral tw:text-neutral-content tw:w-24 tw:h-24 tw:rounded-full tw:ring-4 tw:ring-base-100"
              >
                <span class="tw:text-3xl">{{ user.first_name[0] }}{{ user.last_name[0] }}</span>
              </div>
            </div>

            <div class="tw:flex-1 tw:text-center sm:tw:text-left">
              <h1 class="tw:text-2xl tw:font-bold">{{ user.first_name }} {{ user.last_name }}</h1>
              <p class="tw:text-base-content/60">@{{ user.username }}</p>
            </div>

            <!-- Follow Button -->
            <button
              v-if="!isOwnProfile"
              @click="toggleFollow"
              class="tw:btn"
              :class="isFollowing ? 'tw:btn-outline' : 'tw:btn-primary'"
            >
              <Icon
                :icon="isFollowing ? 'mdi:account-check' : 'mdi:account-plus'"
                class="tw:w-5 tw:h-5"
              />
              {{ isFollowing ? 'Following' : 'Follow' }}
            </button>
          </div>

          <!-- Stats -->
          <div class="tw:flex tw:justify-center sm:tw:justify-start tw:gap-8 tw:mt-6">
            <div class="tw:text-center">
              <span class="tw:text-xl tw:font-bold">{{ followers.length }}</span>
              <p class="tw:text-sm tw:text-base-content/60">Followers</p>
            </div>
            <div class="tw:text-center">
              <span class="tw:text-xl tw:font-bold">{{ following.length }}</span>
              <p class="tw:text-sm tw:text-base-content/60">Following</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Followers -->
      <div v-if="followers.length" class="tw:card tw:bg-base-100 tw:shadow-lg tw:mb-6">
        <div class="tw:card-body">
          <h2 class="tw:text-lg tw:font-bold tw:mb-3">Followers</h2>
          <div class="tw:flex tw:flex-wrap tw:gap-3">
            <RouterLink
              v-for="f in followers"
              :key="f.id"
              :to="{ name: 'user-profile', params: { id: f.id } }"
              class="tw:flex tw:items-center tw:gap-2 tw:bg-base-200 tw:rounded-full tw:px-3 tw:py-1 hover:tw:bg-base-300 tw:transition-colors"
            >
              <div class="tw:avatar tw:placeholder">
                <div class="tw:bg-primary tw:text-primary-content tw:w-6 tw:h-6 tw:rounded-full">
                  <span class="tw:text-xs">{{ f.first_name[0] }}</span>
                </div>
              </div>
              <span class="tw:text-sm">{{ f.username }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Following -->
      <div v-if="following.length" class="tw:card tw:bg-base-100 tw:shadow-lg">
        <div class="tw:card-body">
          <h2 class="tw:text-lg tw:font-bold tw:mb-3">Following</h2>
          <div class="tw:flex tw:flex-wrap tw:gap-3">
            <RouterLink
              v-for="f in following"
              :key="f.id"
              :to="{ name: 'user-profile', params: { id: f.id } }"
              class="tw:flex tw:items-center tw:gap-2 tw:bg-base-200 tw:rounded-full tw:px-3 tw:py-1 hover:tw:bg-base-300 tw:transition-colors"
            >
              <div class="tw:avatar tw:placeholder">
                <div
                  class="tw:bg-secondary tw:text-secondary-content tw:w-6 tw:h-6 tw:rounded-full"
                >
                  <span class="tw:text-xs">{{ f.first_name[0] }}</span>
                </div>
              </div>
              <span class="tw:text-sm">{{ f.username }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
