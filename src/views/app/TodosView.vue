<script setup lang="ts">
import { ClipboardList, Loader2, Plus, Trash2 } from '@lucide/vue'
import api from '@/apis'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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

interface Todo {
  id: string
  title: string
  description: string
  is_completed: boolean
  createdAt: string
  user: { id: string; username: string; first_name: string; last_name: string }
}

const todos = ref<Todo[]>([])
const loading = ref(true)
const showCreateModal = ref(false)
const newTitle = ref('')
const newDescription = ref('')
const creating = ref(false)
const filter = ref<'all' | 'mine' | 'active' | 'completed'>('all')

const filteredTodos = computed(() => {
  let result = todos.value
  if (filter.value === 'mine') result = result.filter((t) => t.user.id === authStore.user?.id)
  if (filter.value === 'active') result = result.filter((t) => !t.is_completed)
  if (filter.value === 'completed') result = result.filter((t) => t.is_completed)
  return result
})

async function fetchTodos() {
  loading.value = true
  try {
    const res = await api.todo.getAllTodos()
    todos.value = res.data.data.todos
  } catch {
    // handle
  } finally {
    loading.value = false
  }
}

async function createTodo() {
  if (!newTitle.value.trim()) return
  creating.value = true
  try {
    await api.todo.createTodo({ title: newTitle.value, description: newDescription.value })
    newTitle.value = ''
    newDescription.value = ''
    showCreateModal.value = false
    await fetchTodos()
  } catch {
    // handle
  } finally {
    creating.value = false
  }
}

async function toggleTodo(id: string) {
  try {
    await api.todo.toggleTodo(id)
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.is_completed = !todo.is_completed
  } catch {
    // handle
  }
}

async function deleteTodo(id: string) {
  try {
    await api.todo.deleteTodo(id)
    todos.value = todos.value.filter((t) => t.id !== id)
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

onMounted(fetchTodos)
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Todos</h1>
        <p class="text-muted-foreground">Manage your tasks and collaborate with others</p>
      </div>

      <!-- Create Dialog -->
      <Dialog v-model:open="showCreateModal">
        <DialogTrigger as-child>
          <Button>
            <Plus />
            New Todo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
            <DialogDescription>Add a task to your list.</DialogDescription>
          </DialogHeader>
          <form class="space-y-4" @submit.prevent="createTodo">
            <div class="space-y-2">
              <Label for="todo-title">Title</Label>
              <Input
                id="todo-title"
                v-model="newTitle"
                placeholder="What needs to be done?"
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="todo-description">Description (optional)</Label>
              <Textarea
                id="todo-description"
                v-model="newDescription"
                placeholder="Add more details..."
                rows="3"
              />
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
      <Button
        size="sm"
        :variant="filter === 'active' ? 'outline' : 'ghost'"
        @click="filter = 'active'"
      >
        Active
      </Button>
      <Button
        size="sm"
        :variant="filter === 'completed' ? 'outline' : 'ghost'"
        @click="filter = 'completed'"
      >
        Completed
      </Button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="size-8 animate-spin text-muted-foreground" />
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTodos.length === 0" class="py-20 text-center">
      <ClipboardList class="mx-auto size-16 text-muted-foreground/40" />
      <h3 class="mt-4 text-xl font-semibold">No todos yet</h3>
      <p class="mt-2 text-muted-foreground">Create your first todo to get started!</p>
    </div>

    <!-- List -->
    <div v-else class="space-y-3">
      <Card v-for="todo in filteredTodos" :key="todo.id" class="transition-shadow hover:shadow-md">
        <CardContent class="flex items-start gap-3">
          <Checkbox
            class="mt-1"
            :model-value="todo.is_completed"
            :disabled="todo.user.id !== authStore.user?.id"
            :aria-label="todo.is_completed ? 'Mark as active' : 'Mark as completed'"
            @update:model-value="toggleTodo(todo.id)"
          />

          <div class="min-w-0 flex-1">
            <RouterLink :to="{ name: 'todo-detail', params: { id: todo.id } }">
              <h3
                class="text-base font-medium underline-offset-4 hover:underline"
                :class="{ 'text-muted-foreground line-through': todo.is_completed }"
              >
                {{ todo.title }}
              </h3>
            </RouterLink>
            <p v-if="todo.description" class="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {{ todo.description }}
            </p>
            <div class="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <RouterLink
                :to="{ name: 'user-profile', params: { id: todo.user.id } }"
                class="hover:text-foreground"
              >
                @{{ todo.user.username }}
              </RouterLink>
              <span>{{ timeAgo(todo.createdAt) }}</span>
            </div>
          </div>

          <Button
            v-if="todo.user.id === authStore.user?.id"
            variant="ghost"
            size="icon"
            class="text-muted-foreground hover:text-destructive"
            aria-label="Delete todo"
            @click="deleteTodo(todo.id)"
          >
            <Trash2 />
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
