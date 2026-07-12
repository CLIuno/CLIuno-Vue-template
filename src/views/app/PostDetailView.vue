<script setup lang="ts">
import api from '@/apis'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const postId = route.params.id as string

interface Comment {
  id: string
  content: string
  createdAt: string
  user: { id: string; username: string; first_name: string; last_name: string }
}

interface Post {
  id: string
  title: string
  content: string
  imageUrl: string
  is_paid: boolean
  createdAt: string
  user: { id: string; username: string; first_name: string; last_name: string }
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
  <div class="tw:max-w-3xl tw:mx-auto tw:px-4 tw:py-8">
    <!-- Back -->
    <RouterLink :to="{ name: 'posts' }" class="tw:btn tw:btn-ghost tw:btn-sm tw:mb-6">
      <Icon icon="mdi:arrow-left" class="tw:w-5 tw:h-5" />
      Back to Posts
    </RouterLink>

    <!-- Loading -->
    <div v-if="loading" class="tw:flex tw:justify-center tw:py-20">
      <span class="tw:loading tw:loading-spinner tw:loading-lg tw:text-primary"></span>
    </div>

    <template v-else-if="post">
      <!-- Detail Card -->
      <div class="tw:card tw:bg-base-100 tw:shadow-lg tw:mb-6">
        <div class="tw:card-body">
          <template v-if="!editing">
            <div class="tw:flex tw:items-start tw:justify-between">
              <div>
                <h1 class="tw:text-2xl tw:font-bold">
                  {{ post.title }}
                </h1>
                <p v-if="post.content" class="tw:mt-3 tw:text-base-content/70">
                  {{ post.content }}
                </p>
              </div>
              <div v-if="post.user.id === authStore.user?.id" class="tw:flex tw:gap-2">
                <button @click="startEdit" class="tw:btn tw:btn-sm tw:btn-outline">
                  <Icon icon="mdi:pencil" class="tw:w-4 tw:h-4" />
                </button>
              </div>
            </div>
          </template>

          <!-- Edit Mode -->
          <template v-else>
            <form @submit.prevent="saveEdit" class="tw:space-y-4">
              <input
                v-model="editTitle"
                type="text"
                class="tw:input tw:input-bordered tw:w-full tw:text-xl tw:font-bold"
              />
              <textarea
                v-model="editContent"
                class="tw:textarea tw:textarea-bordered tw:w-full"
                rows="5"
              ></textarea>
              <div class="tw:flex tw:gap-2 tw:justify-end">
                <button type="button" @click="editing = false" class="tw:btn tw:btn-sm">
                  Cancel
                </button>
                <button type="submit" class="tw:btn tw:btn-sm tw:btn-primary">Save</button>
              </div>
            </form>
          </template>

          <!-- Meta -->
          <div
            class="tw:flex tw:items-center tw:gap-4 tw:mt-4 tw:pt-4 tw:border-t tw:border-base-200 tw:text-sm tw:text-base-content/50"
          >
            <RouterLink
              :to="{ name: 'user-profile', params: { id: post.user.id } }"
              class="tw:flex tw:items-center tw:gap-1 hover:tw:text-primary"
            >
              <Icon icon="mdi:account" class="tw:w-4 tw:h-4" />
              {{ post.user.first_name }} {{ post.user.last_name }} (@{{ post.user.username }})
            </RouterLink>
            <span>{{ timeAgo(post.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="tw:card tw:bg-base-100 tw:shadow-lg">
        <div class="tw:card-body">
          <h2 class="tw:text-xl tw:font-bold tw:mb-4">
            <Icon icon="mdi:comment-multiple-outline" class="tw:w-6 tw:h-6 tw:inline tw:mr-1" />
            Comments ({{ post.comments?.length || 0 }})
          </h2>

          <!-- Add Comment -->
          <form @submit.prevent="addComment" class="tw:mb-6">
            <div class="tw:flex tw:gap-2">
              <input
                v-model="newComment"
                type="text"
                placeholder="Write a comment..."
                class="tw:input tw:input-bordered tw:flex-1"
                required
              />
              <button type="submit" class="tw:btn tw:btn-primary" :disabled="submittingComment">
                <Icon icon="mdi:send" class="tw:w-5 tw:h-5" />
              </button>
            </div>
          </form>

          <!-- Comments List -->
          <div v-if="!post.comments?.length" class="tw:text-center tw:py-8 tw:text-base-content/40">
            <Icon icon="mdi:comment-off-outline" class="tw:w-10 tw:h-10 tw:mx-auto tw:mb-2" />
            <p>No comments yet. Be the first!</p>
          </div>

          <div v-else class="tw:space-y-4">
            <div v-for="comment in post.comments" :key="comment.id" class="tw:flex tw:gap-3">
              <div class="tw:avatar tw:placeholder">
                <div class="tw:bg-neutral tw:text-neutral-content tw:w-8 tw:h-8 tw:rounded-full">
                  <span class="tw:text-xs"
                    >{{ comment.user.first_name[0] }}{{ comment.user.last_name[0] }}</span
                  >
                </div>
              </div>
              <div class="tw:flex-1 tw:bg-base-200 tw:rounded-lg tw:p-3">
                <div class="tw:flex tw:items-center tw:justify-between tw:mb-1">
                  <RouterLink
                    :to="{ name: 'user-profile', params: { id: comment.user.id } }"
                    class="tw:font-semibold tw:text-sm hover:tw:text-primary"
                  >
                    {{ comment.user.username }}
                  </RouterLink>
                  <div class="tw:flex tw:items-center tw:gap-2">
                    <span class="tw:text-xs tw:text-base-content/50">{{
                      timeAgo(comment.createdAt)
                    }}</span>
                    <template v-if="comment.user.id === authStore.user?.id">
                      <button
                        @click="startEditComment(comment)"
                        class="tw:btn tw:btn-ghost tw:btn-xs"
                      >
                        <Icon icon="mdi:pencil" class="tw:w-3 tw:h-3" />
                      </button>
                      <button
                        @click="deleteComment(comment.id)"
                        class="tw:btn tw:btn-ghost tw:btn-xs tw:text-error"
                      >
                        <Icon icon="mdi:delete" class="tw:w-3 tw:h-3" />
                      </button>
                    </template>
                  </div>
                </div>

                <template v-if="editingCommentId === comment.id">
                  <div class="tw:flex tw:gap-2">
                    <input
                      v-model="editCommentContent"
                      class="tw:input tw:input-sm tw:input-bordered tw:flex-1"
                    />
                    <button
                      @click="saveEditComment(comment.id)"
                      class="tw:btn tw:btn-sm tw:btn-primary"
                    >
                      Save
                    </button>
                    <button @click="editingCommentId = null" class="tw:btn tw:btn-sm">
                      Cancel
                    </button>
                  </div>
                </template>
                <p v-else class="tw:text-sm">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
