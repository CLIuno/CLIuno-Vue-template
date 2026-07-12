<script setup lang="ts">
import api from '@/apis'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const todoId = route.params.id as string

interface Todo {
  id: string
  title: string
  description: string
  is_completed: boolean
  createdAt: string
  user: { id: string; username: string; first_name: string; last_name: string }
}

const todo = ref<Todo | null>(null)
const loading = ref(true)
const editing = ref(false)
const editTitle = ref('')
const editDescription = ref('')

async function fetchTodo() {
  loading.value = true
  try {
    const res = await api.todo.getTodoById(todoId)
    todo.value = res.data.data.todo
  } catch {
    // handle
  } finally {
    loading.value = false
  }
}

async function toggleComplete() {
  if (!todo.value) return
  try {
    await api.todo.toggleTodo(todoId)
    todo.value.is_completed = !todo.value.is_completed
  } catch {
    // handle
  }
}

function startEdit() {
  if (!todo.value) return
  editTitle.value = todo.value.title
  editDescription.value = todo.value.description || ''
  editing.value = true
}

async function saveEdit() {
  if (!todo.value) return
  try {
    await api.todo.updateTodo(todoId, {
      title: editTitle.value,
      description: editDescription.value,
    })
    todo.value.title = editTitle.value
    todo.value.description = editDescription.value
    editing.value = false
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

onMounted(fetchTodo)
</script>

<template>
  <div class="tw:max-w-3xl tw:mx-auto tw:px-4 tw:py-8">
    <!-- Back -->
    <RouterLink :to="{ name: 'todos' }" class="tw:btn tw:btn-ghost tw:btn-sm tw:mb-6">
      <Icon icon="mdi:arrow-left" class="tw:w-5 tw:h-5" />
      Back to Todos
    </RouterLink>

    <!-- Loading -->
    <div v-if="loading" class="tw:flex tw:justify-center tw:py-20">
      <span class="tw:loading tw:loading-spinner tw:loading-lg tw:text-primary"></span>
    </div>

    <template v-else-if="todo">
      <!-- Detail Card -->
      <div class="tw:card tw:bg-base-100 tw:shadow-lg">
        <div class="tw:card-body">
          <template v-if="!editing">
            <div class="tw:flex tw:items-start tw:justify-between">
              <div>
                <div class="tw:flex tw:items-center tw:gap-3 tw:mb-2">
                  <span
                    class="tw:badge"
                    :class="todo.is_completed ? 'tw:badge-success' : 'tw:badge-warning'"
                  >
                    {{ todo.is_completed ? 'Completed' : 'Active' }}
                  </span>
                </div>
                <h1
                  class="tw:text-2xl tw:font-bold"
                  :class="{ 'tw:line-through tw:opacity-60': todo.is_completed }"
                >
                  {{ todo.title }}
                </h1>
                <p v-if="todo.description" class="tw:mt-3 tw:text-base-content/70">
                  {{ todo.description }}
                </p>
              </div>
              <div v-if="todo.user.id === authStore.user?.id" class="tw:flex tw:gap-2">
                <button
                  @click="toggleComplete"
                  class="tw:btn tw:btn-sm tw:btn-outline"
                  :class="todo.is_completed ? 'tw:btn-warning' : 'tw:btn-success'"
                >
                  <Icon
                    :icon="todo.is_completed ? 'mdi:undo' : 'mdi:check'"
                    class="tw:w-4 tw:h-4"
                  />
                  {{ todo.is_completed ? 'Reopen' : 'Complete' }}
                </button>
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
                v-model="editDescription"
                class="tw:textarea tw:textarea-bordered tw:w-full"
                rows="3"
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
              :to="{ name: 'user-profile', params: { id: todo.user.id } }"
              class="tw:flex tw:items-center tw:gap-1 hover:tw:text-primary"
            >
              <Icon icon="mdi:account" class="tw:w-4 tw:h-4" />
              {{ todo.user.first_name }} {{ todo.user.last_name }} (@{{ todo.user.username }})
            </RouterLink>
            <span>{{ timeAgo(todo.createdAt) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
