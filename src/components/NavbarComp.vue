<script setup lang="ts">
const showMenu = ref(false)
const toggleNavbar = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="bg-white shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold text-gray-800"> CLIuno </RouterLink>

      <!-- Hamburger Menu -->
      <button @click="toggleNavbar" class="lg:hidden text-gray-800 focus:outline-none">
        <i class="fas fa-bars text-2xl"></i>
      </button>

      <!-- Navigation Links -->
      <div :class="{ hidden: !showMenu, block: showMenu }" class="w-full lg:flex lg:items-center lg:w-auto">
        <ul class="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0">
          <li>
            <a href="https://github.com/CLIuno" class="text-gray-800 hover:text-gray-600">Docs</a>
          </li>
          <li>
            <a href="https://ko-fi.com/ru44y" class="text-gray-800 hover:text-gray-600">Donate</a>
          </li>
          <li>
            <a href="https://x.com/RU44_Y" class="text-gray-800 hover:text-gray-600">X</a>
          </li>
          <li>
            <a href="https://github.com/CLIuno" class="text-gray-800 hover:text-gray-600">Star</a>
          </li>
          <li>
            <RouterLink :to="{ name: 'login' }" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
