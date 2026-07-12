<script setup lang="ts">
import api from '@/apis'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface Post {
  id: string
  title: string
  content: string
  imageUrl: string
  is_paid: boolean
  createdAt: string
  user: { id: string; username: string; first_name: string; last_name: string }
  comments: Record<string, unknown>[]
}

const posts = ref<Post[]>([])
const loading = ref(true)
const showCreateModal = ref(false)
const newTitle = ref('')
const newContent = ref('')
const creating = ref(false)
const filter = ref<'all' | 'mine'>('all')

const filteredPosts = computed(() => {
  if (filter.value === 'mine') return posts.value.filter((p) => p.user.id === authStore.user?.id)
  return posts.value
})

async function fetchPosts() {
  loading.value = true
  try {
    const res = await api.post.getAllPosts()
    posts.value = res.data.data.posts
  } catch {
    // handle
  } finally {
    loading.value = false
  }
}

async function createPost() {
  if (!newTitle.value.trim() || !newContent.value.trim()) return
  creating.value = true
  try {
    await api.post.createPost({ title: newTitle.value, content: newContent.value })
    newTitle.value = ''
    newContent.value = ''
    showCreateModal.value = false
    await fetchPosts()
  } catch {
    // handle
  } finally {
    creating.value = false
  }
}

async function deletePost(id: string) {
  try {
    await api.post.deletePostById(id)
    posts.value = posts.value.filter((p) => p.id !== id)
  } catch {
    // handle
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

onMounted(fetchPosts)
</script>

<template>
  <div class="tw:max-w-4xl tw:mx-auto tw:px-4 tw:py-8">
    <!-- Header -->
    <div class="tw:flex tw:items-center tw:justify-between tw:mb-8">
      <div>
        <h1 class="tw:text-3xl tw:font-bold tw:text-base-content">Posts</h1>
        <p class="tw:text-base-content/60">Share and discuss with the community</p>
      </div>
      <button @click="showCreateModal = true" class="tw:btn tw:btn-primary">
        <Icon icon="mdi:plus" class="tw:w-5 tw:h-5" />
        New Post
      </button>
    </div>

    <!-- Filters -->
    <div class="tw:tabs tw:tabs-boxed tw:mb-6 tw:w-fit">
      <button class="tw:tab" :class="{ 'tw:tab-active': filter === 'all' }" @click="filter = 'all'">
        All
      </button>
      <button
        class="tw:tab"
        :class="{ 'tw:tab-active': filter === 'mine' }"
        @click="filter = 'mine'"
      >
        Mine
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="tw:flex tw:justify-center tw:py-20">
      <span class="tw:loading tw:loading-spinner tw:loading-lg tw:text-primary"></span>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredPosts.length === 0" class="tw:text-center tw:py-20">
      <Icon icon="mdi:post-outline" class="tw:w-16 tw:h-16 tw:mx-auto tw:text-base-content/30" />
      <h3 class="tw:text-xl tw:font-semibold tw:mt-4">No posts yet</h3>
      <p class="tw:text-base-content/60 tw:mt-2">Create your first post to get started!</p>
    </div>

    <!-- List -->
    <div v-else class="tw:space-y-3">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="tw:card tw:bg-base-100 tw:shadow-sm hover:tw:shadow-md tw:transition-shadow"
      >
        <div class="tw:card-body tw:p-4">
          <div class="tw:flex tw:items-start tw:gap-3">
            <!-- Content -->
            <div class="tw:flex-1 tw:min-w-0">
              <RouterLink :to="{ name: 'post-detail', params: { id: post.id } }">
                <h3 class="tw:font-semibold tw:text-lg hover:tw:text-primary tw:transition-colors">
                  {{ post.title }}
                </h3>
              </RouterLink>
              <p
                v-if="post.content"
                class="tw:text-base-content/60 tw:text-sm tw:mt-1 tw:line-clamp-2"
              >
                {{ post.content }}
              </p>
              <div
                class="tw:flex tw:items-center tw:gap-4 tw:mt-2 tw:text-sm tw:text-base-content/50"
              >
                <RouterLink
                  :to="{ name: 'user-profile', params: { id: post.user.id } }"
                  class="tw:flex tw:items-center tw:gap-1 hover:tw:text-primary"
                >
                  <Icon icon="mdi:account" class="tw:w-4 tw:h-4" />
                  {{ post.user.username }}
                </RouterLink>
                <span class="tw:flex tw:items-center tw:gap-1">
                  <Icon icon="mdi:comment-outline" class="tw:w-4 tw:h-4" />
                  {{ post.comments?.length || 0 }}
                </span>
                <span>{{ timeAgo(post.createdAt) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="post.user.id === authStore.user?.id" class="tw:dropdown tw:dropdown-end">
              <button class="tw:btn tw:btn-ghost tw:btn-sm tw:btn-circle">
                <Icon icon="mdi:dots-vertical" class="tw:w-5 tw:h-5" />
              </button>
              <ul
                class="tw:dropdown-content tw:menu tw:p-2 tw:shadow tw:bg-base-100 tw:rounded-box tw:w-40 tw:z-10"
              >
                <li>
                  <RouterLink :to="{ name: 'post-detail', params: { id: post.id } }">
                    <Icon icon="mdi:eye" class="tw:w-4 tw:h-4" /> View
                  </RouterLink>
                </li>
                <li>
                  <button @click="deletePost(post.id)" class="tw:text-error">
                    <Icon icon="mdi:delete" class="tw:w-4 tw:h-4" /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="tw:modal tw:modal-open">
      <div class="tw:modal-box">
        <h3 class="tw:font-bold tw:text-lg tw:mb-4">Create New Post</h3>
        <form @submit.prevent="createPost" class="tw:space-y-4">
          <div class="tw:form-control">
            <div class="tw:label"><span class="tw:label-text">Title</span></div>
            <input
              v-model="newTitle"
              type="text"
              placeholder="Post title"
              class="tw:input tw:input-bordered tw:w-full"
              required
            />
          </div>
          <div class="tw:form-control">
            <div class="tw:label"><span class="tw:label-text">Content</span></div>
            <textarea
              v-model="newContent"
              placeholder="Write your post..."
              class="tw:textarea tw:textarea-bordered tw:w-full"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="tw:modal-action">
            <button type="button" @click="showCreateModal = false" class="tw:btn">Cancel</button>
            <button type="submit" class="tw:btn tw:btn-primary" :disabled="creating">
              {{ creating ? 'Creating...' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
      <div class="tw:modal-backdrop" @click="showCreateModal = false"></div>
    </div>
  </div>
</template>
