<script setup lang="ts">
import { ArrowLeft, Check, Loader2, Pencil, Undo2 } from '@lucide/vue'
import api from '@/apis'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
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
  <div class="mx-auto max-w-3xl px-4 py-8">
    <!-- Back -->
    <Button variant="ghost" size="sm" class="mb-6" as-child>
      <RouterLink :to="{ name: 'todos' }">
        <ArrowLeft />
        Back to Todos
      </RouterLink>
    </Button>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="size-8 animate-spin text-muted-foreground" />
    </div>

    <template v-else-if="todo">
      <Card>
        <CardContent>
          <template v-if="!editing">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <Badge :variant="todo.is_completed ? 'secondary' : 'outline'" class="mb-2">
                  {{ todo.is_completed ? 'Completed' : 'Active' }}
                </Badge>
                <h1
                  class="text-2xl font-bold tracking-tight"
                  :class="{ 'text-muted-foreground line-through': todo.is_completed }"
                >
                  {{ todo.title }}
                </h1>
                <p v-if="todo.description" class="mt-3 text-muted-foreground">
                  {{ todo.description }}
                </p>
              </div>
              <div v-if="todo.user.id === authStore.user?.id" class="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" @click="toggleComplete">
                  <Undo2 v-if="todo.is_completed" />
                  <Check v-else />
                  {{ todo.is_completed ? 'Reopen' : 'Complete' }}
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="Edit todo" @click="startEdit">
                  <Pencil />
                </Button>
              </div>
            </div>
          </template>

          <!-- Edit Mode -->
          <template v-else>
            <form class="space-y-4" @submit.prevent="saveEdit">
              <Input
                v-model="editTitle"
                class="text-lg font-semibold"
                aria-label="Todo title"
                required
              />
              <Textarea v-model="editDescription" rows="3" aria-label="Todo description" />
              <div class="flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" @click="editing = false">
                  Cancel
                </Button>
                <Button type="submit" size="sm">Save</Button>
              </div>
            </form>
          </template>

          <!-- Meta -->
          <Separator class="my-4" />
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <RouterLink
              :to="{ name: 'user-profile', params: { id: todo.user.id } }"
              class="hover:text-foreground"
            >
              {{ todo.user.first_name }} {{ todo.user.last_name }} (@{{ todo.user.username }})
            </RouterLink>
            <span>{{ timeAgo(todo.createdAt) }}</span>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
