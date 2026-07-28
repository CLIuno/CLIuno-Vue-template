<script setup lang="ts">
import { LogOut, Rocket, User } from '@lucide/vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isAuthenticated)
const initials = computed(() => {
  const u = authStore.user
  if (!u) return '?'
  return `${u.first_name?.[0] ?? ''}${u.last_name?.[0] ?? ''}`.toUpperCase() || '?'
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
    <nav class="container mx-auto flex h-14 items-center justify-between gap-2 px-4">
      <!-- Brand + links -->
      <div class="flex items-center gap-4 sm:gap-6">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold">
          <Rocket class="size-5" />
          <span>CLIuno</span>
        </RouterLink>

        <div class="flex items-center gap-1">
          <Button variant="ghost" size="sm" as-child>
            <RouterLink :to="{ name: 'todos' }">Todos</RouterLink>
          </Button>
          <Button variant="ghost" size="sm" as-child>
            <RouterLink :to="{ name: 'posts' }">Posts</RouterLink>
          </Button>
          <Button variant="ghost" size="sm" as-child>
            <RouterLink :to="{ name: 'users' }">Users</RouterLink>
          </Button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <ThemeToggle />

        <DropdownMenu v-if="isLoggedIn">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full" aria-label="User menu">
              <Avatar>
                <AvatarImage
                  v-if="authStore.user?.avatar_url"
                  :src="authStore.user.avatar_url"
                  :alt="initials"
                />
                <AvatarFallback>{{ initials }}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel class="truncate">
              @{{ authStore.user?.username }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem v-if="authStore.user" as-child>
              <RouterLink :to="{ name: 'user-profile', params: { id: authStore.user.id } }">
                <User />
                Profile
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" @select="authStore.logout()">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <template v-else>
          <Button variant="ghost" size="sm" as-child>
            <RouterLink :to="{ name: 'login' }">Login</RouterLink>
          </Button>
          <Button size="sm" as-child>
            <RouterLink :to="{ name: 'register' }">Register</RouterLink>
          </Button>
        </template>
      </div>
    </nav>
  </header>
</template>
