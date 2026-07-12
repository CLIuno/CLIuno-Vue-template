<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const authStore = useAuthStore()

function onThemeChange(e: Event) {
  isDark.value = (e.target as HTMLInputElement).checked
}
</script>

<template>
  <div class="tw:min-h-screen tw:flex tw:flex-col tw:bg-base-200">
    <!-- App Navbar -->
    <header class="tw:bg-base-100 tw:shadow-sm tw:sticky tw:top-0 tw:z-50">
      <nav
        class="tw:container tw:mx-auto tw:flex tw:items-center tw:justify-between tw:px-4 tw:py-3"
      >
        <!-- Logo -->
        <RouterLink :to="{ name: 'todos' }" class="tw:flex tw:items-center tw:gap-2">
          <Icon icon="mdi:rocket-launch-outline" class="tw:w-6 tw:h-6 tw:text-primary" />
          <span class="tw:text-xl tw:font-bold tw:text-primary">CLIuno</span>
        </RouterLink>

        <!-- Nav Links -->
        <div class="tw:flex tw:items-center tw:gap-1">
          <RouterLink
            :to="{ name: 'todos' }"
            class="tw:btn tw:btn-ghost tw:btn-sm"
            active-class="tw:btn-active"
          >
            <Icon icon="mdi:clipboard-check-outline" class="tw:w-5 tw:h-5" />
            <span class="tw:hidden sm:tw:inline">Todos</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'posts' }"
            class="tw:btn tw:btn-ghost tw:btn-sm"
            active-class="tw:btn-active"
          >
            <Icon icon="mdi:post-outline" class="tw:w-5 tw:h-5" />
            <span class="tw:hidden sm:tw:inline">Posts</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'users' }"
            class="tw:btn tw:btn-ghost tw:btn-sm"
            active-class="tw:btn-active"
          >
            <Icon icon="mdi:account-group-outline" class="tw:w-5 tw:h-5" />
            <span class="tw:hidden sm:tw:inline">Users</span>
          </RouterLink>

          <!-- Theme Toggle (DaisyUI theme-controller with icons inside) -->
          <label class="tw:toggle tw:text-base-content tw:ml-1">
            <input
              type="checkbox"
              :checked="isDark"
              @change="onThemeChange"
              value="dark"
              class="theme-controller"
            />
            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>
            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>

          <!-- User Menu -->
          <div class="tw:dropdown tw:dropdown-end">
            <button class="tw:btn tw:btn-ghost tw:btn-sm">
              <div class="tw:avatar tw:placeholder">
                <div class="tw:bg-primary tw:text-primary-content tw:w-7 tw:h-7 tw:rounded-full">
                  <span class="tw:text-xs"
                    >{{ authStore.user?.first_name?.[0] || '?'
                    }}{{ authStore.user?.last_name?.[0] || '' }}</span
                  >
                </div>
              </div>
              <span class="tw:hidden sm:tw:inline tw:ml-1">{{ authStore.user?.username }}</span>
              <Icon icon="mdi:chevron-down" class="tw:w-4 tw:h-4" />
            </button>
            <ul
              class="tw:dropdown-content tw:menu tw:p-2 tw:shadow-lg tw:bg-base-100 tw:rounded-box tw:w-52 tw:z-10"
            >
              <li>
                <RouterLink
                  v-if="authStore.user"
                  :to="{ name: 'user-profile', params: { id: authStore.user.id } }"
                >
                  <Icon icon="mdi:account" class="tw:w-4 tw:h-4" /> My Profile
                </RouterLink>
              </li>
              <li>
                <button @click="authStore.logout()" class="tw:text-error">
                  <Icon icon="mdi:logout" class="tw:w-4 tw:h-4" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="tw:flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="tw:py-4 tw:text-center tw:text-sm tw:text-base-content/50">
      &copy; {{ new Date().getFullYear() }} CLIuno — Built with Vue
    </footer>
  </div>
</template>
