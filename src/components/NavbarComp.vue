<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleTheme = useToggle(isDark)
const showMenu = ref(false)
const toggleNavbar = () => {
  showMenu.value = !showMenu.value
}

const navButtons = [
  { label: 'Get Started', link: '/', style: 'primary' },
  { label: 'Docs', link: 'https://github.com/CLIuno', style: 'secondary' },
  { label: 'Donate', link: 'https://ko-fi.com/ru44y', style: 'accent' },
  { label: 'Star', link: 'https://github.com/CLIuno', style: 'info' },
  { label: 'X', link: 'https://x.com/RU44_Y', style: 'warning' },
]
</script>

<template>
  <header class="tw:bg-base-100 tw:shadow-sm tw:px-4 sm:tw:px-6 tw:py-3">
    <nav class="tw:flex tw:items-center tw:justify-between tw:container tw:mx-auto">
      <!-- Logo -->
      <div class="tw:flex tw:items-center tw:gap-2">
        <Icon icon="mdi:rocket-launch-outline" class="tw:w-6 tw:h-6 tw:text-primary" />
        <span class="tw:text-xl tw:font-bold tw:text-primary">Cliuno</span>
      </div>

      <!-- Desktop Buttons -->
      <div class="tw:hidden tw:md:flex">
        <!-- Theme toggle -->
        <button
          class="tw:btn tw:btn-sm tw:btn-ghost"
          aria-label="Toggle Theme"
          @click="toggleTheme()"
        >
          <Icon
            :icon="isDark ? 'line-md:moon-filled-alt-loop' : 'line-md:sunny-filled-loop'"
            class="tw:w-5 tw:h-5"
          />
        </button>

        <!-- Main buttons -->
        <a
          v-for="btn in navButtons"
          :key="btn.label"
          :href="btn.link"
          target="_blank"
          rel="noopener"
          class="tw:btn tw:btn-sm tw:ml-3"
          :class="`tw:btn-${btn.style}`"
        >
          {{ btn.label }}
        </a>

        <!-- Login -->
        <RouterLink :to="{ name: 'login' }" class="tw:btn tw:btn-sm tw:btn-success tw:ml-3">
          Login
        </RouterLink>
      </div>

      <!-- Hamburger Menu Button -->
      <button
        @click="toggleNavbar"
        class="tw:p-2 tw:rounded-md hover:tw:bg-base-200 tw:transition-colors tw:md:hidden"
        aria-label="Toggle navigation menu"
      >
        <Icon
          :icon="showMenu ? 'mdi:close' : 'mdi:menu'"
          class="tw:w-6 tw:h-6 tw:text-base-content"
        />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      class="tw:overflow-hidden tw:transition-all tw:duration-300 tw:ease-in-out tw:mx-auto tw:mt-1 tw:rounded-lg tw:bg-base-200 tw:shadow-md md:tw:hidden"
      :style="{ maxHeight: showMenu ? '500px' : '0px' }"
    >
      <div class="tw:p-3">
        <ul class="tw:flex tw:flex-col tw:gap-2">
          <li v-for="btn in navButtons" :key="btn.label">
            <a
              :href="btn.link"
              target="_blank"
              rel="noopener"
              class="tw:block tw:px-4 tw:py-2 tw:rounded-md tw:transition-colors"
              :class="`hover:tw:bg-${btn.style}/10 hover:tw:text-${btn.style}`"
            >
              {{ btn.label }}
            </a>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'login' }"
              class="tw:block tw:px-4 tw:py-2 tw:bg-success tw:text-white tw:rounded-md hover:tw:bg-success-focus tw:transition-colors"
            >
              Login
            </RouterLink>
          </li>
          <li>
            <button
              class="tw:flex tw:items-center tw:gap-2 tw:w-full tw:text-left tw:px-4 tw:py-2 tw:rounded-md hover:tw:bg-base-300 tw:transition-colors"
              @click="toggleTheme()"
            >
              <Icon
                :icon="isDark ? 'line-md:moon-filled-alt-loop' : 'line-md:sunny-filled-loop'"
                class="tw:w-5 tw:h-5"
              />
              <span>Toggle Theme</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
