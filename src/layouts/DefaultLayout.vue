<template>
  <v-layout class="rounded rounded-md">
    <AppbarComp />
    <transition name="slide-x" mode="out-in" appear>
      <v-container>
        <v-main class="d-flex align-center justify-center" style="min-height: 300px">
          <RouterView />
        </v-main>
      </v-container>
    </transition>
  </v-layout>
  <FooterComp />
</template>

<script setup>
import AppbarComp from '@/components/Bars/AppbarComp.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>
<style scoped>
/* v-slide-x-transition look a like */
.slide-x-enter-active,
.slide-x-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.3s;
  opacity: 1;
}

.slide-x-enter-from,
.slide-x-leave-to {
  opacity: 0;
}

.slide-x-enter-from {
  transform: translateX(100px);
}

.slide-x-leave-to {
  transform: translateX(-100px);
}
</style>
