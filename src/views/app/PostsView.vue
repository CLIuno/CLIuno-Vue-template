<script setup lang="ts">
import { FileText, Loader2, MessageSquare, Plus, Trash2 } from '@lucide/vue'
import api from '@/apis'
import { useImageUpload } from '@/composables/useImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface Post {
  id: string
  title: string
  content: string
  image_url: string | null
  is_paid: boolean
  createdAt: string
  user: { id: string; username: string; first_name: string; last_name: string }
  comments: Record<string, unknown>[]
}

const { uploading, uploadError, uploadImage } = useImageUpload()
const newImageUrl = ref('')
const postImageInput = ref<HTMLInputElement | null>(null)

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

async function onPostImagePicked(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const url = await uploadImage(file)
  if (url) newImageUrl.value = url
  input.value = ''
}

async function createPost() {
  if (!newTitle.value.trim() || !newContent.value.trim()) return
  creating.value = true
  try {
    await api.post.createPost({
      title: newTitle.value,
      content: newContent.value,
      ...(newImageUrl.value ? { image_url: newImageUrl.value } : {}),
    })
    newTitle.value = ''
    newContent.value = ''
    newImageUrl.value = ''
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
  <div class="mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Posts</h1>
        <p class="text-muted-foreground">Share and discuss with the community</p>
      </div>

      <!-- Create Dialog -->
      <Dialog v-model:open="showCreateModal">
        <DialogTrigger as-child>
          <Button>
            <Plus />
            New Post
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>Share something with the community.</DialogDescription>
          </DialogHeader>
          <form class="space-y-4" @submit.prevent="createPost">
            <div class="space-y-2">
              <Label for="post-title">Title</Label>
              <Input id="post-title" v-model="newTitle" placeholder="Post title" required />
            </div>
            <div class="space-y-2">
              <Label for="post-content">Content</Label>
              <Textarea
                id="post-content"
                v-model="newContent"
                placeholder="Write your post..."
                rows="5"
                required
              />
            </div>
            <div class="space-y-2">
              <Label>Image</Label>
              <div class="flex items-center gap-3">
                <input
                  ref="postImageInput"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  class="hidden"
                  @change="onPostImagePicked"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  :disabled="uploading"
                  @click="postImageInput?.click()"
                >
                  {{ uploading ? 'Uploading…' : newImageUrl ? 'Replace image' : 'Add image' }}
                </Button>
                <Button
                  v-if="newImageUrl"
                  type="button"
                  variant="ghost"
                  size="sm"
                  @click="newImageUrl = ''"
                >
                  Remove
                </Button>
              </div>
              <img
                v-if="newImageUrl"
                :src="newImageUrl"
                alt="Selected image preview"
                class="max-h-40 rounded-md border object-cover"
              />
              <p v-if="uploadError" class="text-sm text-destructive">{{ uploadError }}</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" @click="showCreateModal = false">
                Cancel
              </Button>
              <Button type="submit" :disabled="creating">
                <Loader2 v-if="creating" class="animate-spin" />
                {{ creating ? 'Creating...' : 'Create' }}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Filters -->
    <div class="mb-6 flex w-fit items-center gap-1 rounded-lg bg-muted p-1">
      <Button size="sm" :variant="filter === 'all' ? 'outline' : 'ghost'" @click="filter = 'all'">
        All
      </Button>
      <Button size="sm" :variant="filter === 'mine' ? 'outline' : 'ghost'" @click="filter = 'mine'">
        Mine
      </Button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="size-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredPosts.length === 0" class="py-20 text-center">
      <FileText class="mx-auto size-16 text-muted-foreground/40" />
      <h3 class="mt-4 text-xl font-semibold">No posts yet</h3>
      <p class="mt-2 text-muted-foreground">Create your first post to get started!</p>
    </div>

    <!-- List -->
    <div v-else class="space-y-3">
      <Card v-for="post in filteredPosts" :key="post.id" class="transition-shadow hover:shadow-md">
        <CardContent class="flex items-start gap-3">
          <div class="min-w-0 flex-1">
            <RouterLink :to="{ name: 'post-detail', params: { id: post.id } }">
              <h3 class="text-base font-medium underline-offset-4 hover:underline">
                {{ post.title }}
              </h3>
            </RouterLink>
            <p v-if="post.content" class="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {{ post.content }}
            </p>
            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="mt-2 max-h-64 w-full rounded-md border object-cover"
            />
            <div class="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <RouterLink
                :to="{ name: 'user-profile', params: { id: post.user.id } }"
                class="hover:text-foreground"
              >
                @{{ post.user.username }}
              </RouterLink>
              <span class="flex items-center gap-1">
                <MessageSquare class="size-3.5" />
                {{ post.comments?.length || 0 }}
              </span>
              <span>{{ timeAgo(post.createdAt) }}</span>
            </div>
          </div>

          <Button
            v-if="post.user.id === authStore.user?.id"
            variant="ghost"
            size="icon"
            class="text-muted-foreground hover:text-destructive"
            aria-label="Delete post"
            @click="deletePost(post.id)"
          >
            <Trash2 />
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
