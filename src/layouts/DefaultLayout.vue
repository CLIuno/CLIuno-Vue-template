<script setup lang="ts"></script>
<template>
  <NavbarComp />
  <section class="absolute w-full h-full">
    <div class="container mx-auto px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <RouterView />
      </div>
    </div>
    <FooterComp />
  </section>
</template>
