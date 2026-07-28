<script setup lang="ts">
import { ArrowLeft, Loader2, MessageSquare, Pencil, Send, Trash2 } from '@lucide/vue'
import api from '@/apis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const postId = route.params.id as string

interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    username: string
    first_name: string
    last_name: string
    avatar_url?: string | null
  }
}

interface Post {
  id: string
  title: string
  content: string
  image_url?: string | null
  is_paid: boolean
  createdAt: string
  user: {
    id: string
    username: string
    first_name: string
    last_name: string
    avatar_url?: string | null
  }
  comments: Comment[]
}

const post = ref<Post | null>(null)
const loading = ref(true)
const newComment = ref('')
const submittingComment = ref(false)
const editing = ref(false)
const editTitle = ref('')
const editContent = ref('')
const editingCommentId = ref<string | null>(null)
const editCommentContent = ref('')

async function fetchPost() {
  loading.value = true
  try {
    const res = await api.post.getPostById(postId)
    post.value = res.data.data.post
  } catch {
    // handle
  } finally {
    loading.value = false
  }
}

async function addComment() {
  if (!newComment.value.trim()) return
  submittingComment.value = true
  try {
    await api.post.createComment(postId, { content: newComment.value })
    newComment.value = ''
    await fetchPost()
  } catch {
    // handle
  } finally {
    submittingComment.value = false
  }
}

async function deleteComment(commentId: string) {
  try {
    await api.post.deleteComment(postId, commentId)
    if (post.value) {
      post.value.comments = post.value.comments.filter((c) => c.id !== commentId)
    }
  } catch {
    // handle
  }
}

function startEdit() {
  if (!post.value) return
  editTitle.value = post.value.title
  editContent.value = post.value.content || ''
  editing.value = true
}

async function saveEdit() {
  if (!post.value) return
  try {
    await api.post.updatePostById(postId, {
      title: editTitle.value,
      content: editContent.value,
    })
    post.value.title = editTitle.value
    post.value.content = editContent.value
    editing.value = false
  } catch {
    // handle
  }
}

function startEditComment(comment: Comment) {
  editingCommentId.value = comment.id
  editCommentContent.value = comment.content
}

async function saveEditComment(commentId: string) {
  try {
    await api.post.updateComment(postId, commentId, { content: editCommentContent.value })
    const comment = post.value?.comments.find((c) => c.id === commentId)
    if (comment) comment.content = editCommentContent.value
    editingCommentId.value = null
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

onMounted(fetchPost)
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <!-- Back -->
    <Button variant="ghost" size="sm" class="mb-6" as-child>
      <RouterLink :to="{ name: 'posts' }">
        <ArrowLeft />
        Back to Posts
      </RouterLink>
    </Button>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="size-8 animate-spin text-muted-foreground" />
    </div>

    <template v-else-if="post">
      <Card>
        <CardContent>
          <!-- Article -->
          <article v-if="!editing">
            <div class="flex items-start justify-between gap-4">
              <h1 class="text-2xl font-bold tracking-tight">{{ post.title }}</h1>
              <Button
                v-if="post.user.id === authStore.user?.id"
                variant="outline"
                size="icon-sm"
                class="shrink-0"
                aria-label="Edit post"
                @click="startEdit"
              >
                <Pencil />
              </Button>
            </div>
            <p v-if="post.content" class="mt-3 whitespace-pre-line text-muted-foreground">
              {{ post.content }}
            </p>
            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="mt-3 max-h-96 w-full rounded-md border object-cover"
            />
            <div class="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <RouterLink
                :to="{ name: 'user-profile', params: { id: post.user.id } }"
                class="hover:text-foreground"
              >
                {{ post.user.first_name }} {{ post.user.last_name }} (@{{ post.user.username }})
              </RouterLink>
              <span>{{ timeAgo(post.createdAt) }}</span>
            </div>
          </article>

          <!-- Edit Mode -->
          <form v-else class="space-y-4" @submit.prevent="saveEdit">
            <Input
              v-model="editTitle"
              class="text-lg font-semibold"
              aria-label="Post title"
              required
            />
            <Textarea v-model="editContent" rows="5" aria-label="Post content" />
            <div class="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" @click="editing = false">
                Cancel
              </Button>
              <Button type="submit" size="sm">Save</Button>
            </div>
          </form>

          <Separator class="my-6" />

          <!-- Comments -->
          <h2 class="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare class="size-5" />
            Comments ({{ post.comments?.length || 0 }})
          </h2>

          <!-- Add Comment -->
          <form class="mt-4 flex gap-2" @submit.prevent="addComment">
            <Input
              v-model="newComment"
              placeholder="Write a comment..."
              aria-label="New comment"
              required
            />
            <Button
              type="submit"
              size="icon"
              class="shrink-0"
              :disabled="submittingComment"
              aria-label="Send comment"
            >
              <Loader2 v-if="submittingComment" class="animate-spin" />
              <Send v-else />
            </Button>
          </form>

          <!-- Comments List -->
          <div v-if="!post.comments?.length" class="py-8 text-center text-muted-foreground">
            <p>No comments yet. Be the first!</p>
          </div>

          <div v-else class="mt-6 space-y-4">
            <div v-for="comment in post.comments" :key="comment.id" class="flex gap-3">
              <Avatar>
                <AvatarImage
                  v-if="comment.user.avatar_url"
                  :src="comment.user.avatar_url"
                  :alt="comment.user.username"
                />
                <AvatarFallback class="text-xs">
                  {{ comment.user.first_name[0] }}{{ comment.user.last_name[0] }}
                </AvatarFallback>
              </Avatar>

              <div class="min-w-0 flex-1 rounded-lg bg-muted p-3">
                <div class="mb-1 flex items-center justify-between gap-2">
                  <RouterLink
                    :to="{ name: 'user-profile', params: { id: comment.user.id } }"
                    class="text-sm font-medium underline-offset-4 hover:underline"
                  >
                    @{{ comment.user.username }}
                  </RouterLink>
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-muted-foreground">
                      {{ timeAgo(comment.createdAt) }}
                    </span>
                    <template v-if="comment.user.id === authStore.user?.id">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Edit comment"
                        @click="startEditComment(comment)"
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        class="text-muted-foreground hover:text-destructive"
                        aria-label="Delete comment"
                        @click="deleteComment(comment.id)"
                      >
                        <Trash2 />
                      </Button>
                    </template>
                  </div>
                </div>

                <div v-if="editingCommentId === comment.id" class="flex gap-2">
                  <Input
                    v-model="editCommentContent"
                    class="bg-background"
                    aria-label="Edit comment content"
                  />
                  <Button size="sm" @click="saveEditComment(comment.id)">Save</Button>
                  <Button size="sm" variant="outline" @click="editingCommentId = null">
                    Cancel
                  </Button>
                </div>
                <p v-else class="text-sm">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
