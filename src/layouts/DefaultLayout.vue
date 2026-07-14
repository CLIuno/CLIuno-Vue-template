<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <NavbarComp />

    <main class="flex-1">
      <RouterView />
    </main>

    <FooterComp />
  </div>
</template>
