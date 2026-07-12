<script setup lang="ts">
import api from '@/apis'
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
  <div class="tw:max-w-4xl tw:mx-auto tw:px-4 tw:py-8">
    <!-- Header -->
    <div class="tw:flex tw:items-center tw:justify-between tw:mb-8">
      <div>
        <h1 class="tw:text-3xl tw:font-bold tw:text-base-content">Todos</h1>
        <p class="tw:text-base-content/60">Manage your tasks and collaborate with others</p>
      </div>
      <button @click="showCreateModal = true" class="tw:btn tw:btn-primary">
        <Icon icon="mdi:plus" class="tw:w-5 tw:h-5" />
        New Todo
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
      <button
        class="tw:tab"
        :class="{ 'tw:tab-active': filter === 'active' }"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button
        class="tw:tab"
        :class="{ 'tw:tab-active': filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Completed
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="tw:flex tw:justify-center tw:py-20">
      <span class="tw:loading tw:loading-spinner tw:loading-lg tw:text-primary"></span>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTodos.length === 0" class="tw:text-center tw:py-20">
      <Icon
        icon="mdi:clipboard-check-outline"
        class="tw:w-16 tw:h-16 tw:mx-auto tw:text-base-content/30"
      />
      <h3 class="tw:text-xl tw:font-semibold tw:mt-4">No todos yet</h3>
      <p class="tw:text-base-content/60 tw:mt-2">Create your first todo to get started!</p>
    </div>

    <!-- List -->
    <div v-else class="tw:space-y-3">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="tw:card tw:bg-base-100 tw:shadow-sm hover:tw:shadow-md tw:transition-shadow"
      >
        <div class="tw:card-body tw:p-4">
          <div class="tw:flex tw:items-start tw:gap-3">
            <!-- Checkbox -->
            <button
              v-if="todo.user.id === authStore.user?.id"
              @click="toggleTodo(todo.id)"
              class="tw:mt-1 tw:shrink-0"
            >
              <Icon
                :icon="
                  todo.is_completed
                    ? 'mdi:checkbox-marked-circle'
                    : 'mdi:checkbox-blank-circle-outline'
                "
                class="tw:w-6 tw:h-6"
                :class="todo.is_completed ? 'tw:text-success' : 'tw:text-base-content/30'"
              />
            </button>
            <div v-else class="tw:mt-1 tw:shrink-0">
              <Icon
                :icon="
                  todo.is_completed
                    ? 'mdi:checkbox-marked-circle'
                    : 'mdi:checkbox-blank-circle-outline'
                "
                class="tw:w-6 tw:h-6"
                :class="todo.is_completed ? 'tw:text-success' : 'tw:text-base-content/30'"
              />
            </div>

            <!-- Content -->
            <div class="tw:flex-1 tw:min-w-0">
              <RouterLink :to="{ name: 'todo-detail', params: { id: todo.id } }">
                <h3
                  class="tw:font-semibold tw:text-lg hover:tw:text-primary tw:transition-colors"
                  :class="{ 'tw:line-through tw:opacity-60': todo.is_completed }"
                >
                  {{ todo.title }}
                </h3>
              </RouterLink>
              <p
                v-if="todo.description"
                class="tw:text-base-content/60 tw:text-sm tw:mt-1 tw:line-clamp-2"
              >
                {{ todo.description }}
              </p>
              <div
                class="tw:flex tw:items-center tw:gap-4 tw:mt-2 tw:text-sm tw:text-base-content/50"
              >
                <RouterLink
                  :to="{ name: 'user-profile', params: { id: todo.user.id } }"
                  class="tw:flex tw:items-center tw:gap-1 hover:tw:text-primary"
                >
                  <Icon icon="mdi:account" class="tw:w-4 tw:h-4" />
                  {{ todo.user.username }}
                </RouterLink>
                <span>{{ timeAgo(todo.createdAt) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="todo.user.id === authStore.user?.id" class="tw:dropdown tw:dropdown-end">
              <button class="tw:btn tw:btn-ghost tw:btn-sm tw:btn-circle">
                <Icon icon="mdi:dots-vertical" class="tw:w-5 tw:h-5" />
              </button>
              <ul
                class="tw:dropdown-content tw:menu tw:p-2 tw:shadow tw:bg-base-100 tw:rounded-box tw:w-40 tw:z-10"
              >
                <li>
                  <RouterLink :to="{ name: 'todo-detail', params: { id: todo.id } }">
                    <Icon icon="mdi:eye" class="tw:w-4 tw:h-4" /> View
                  </RouterLink>
                </li>
                <li>
                  <button @click="deleteTodo(todo.id)" class="tw:text-error">
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
        <h3 class="tw:font-bold tw:text-lg tw:mb-4">Create New Todo</h3>
        <form @submit.prevent="createTodo" class="tw:space-y-4">
          <div class="tw:form-control">
            <div class="tw:label"><span class="tw:label-text">Title</span></div>
            <input
              v-model="newTitle"
              type="text"
              placeholder="What needs to be done?"
              class="tw:input tw:input-bordered tw:w-full"
              required
            />
          </div>
          <div class="tw:form-control">
            <div class="tw:label"><span class="tw:label-text">Description (optional)</span></div>
            <textarea
              v-model="newDescription"
              placeholder="Add more details..."
              class="tw:textarea tw:textarea-bordered tw:w-full"
              rows="3"
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
