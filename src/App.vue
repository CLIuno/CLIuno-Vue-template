<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <VLocaleProvider>
    <vApp id="inspire">
      <RouterView />
    </vApp>
  </VLocaleProvider>
</template>
