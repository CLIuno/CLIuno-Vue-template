<template>
  <v-footer>
    <v-row justify="center" class="no-gutters">
      <v-btn v-for="link in links" :key="link" variant="text" class="mx-2" rounded="xl">
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-1" cols="12">
        {{ new Date().getFullYear() }} — <strong>cliuno</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'

const links = ref(['Home', ' About us', 'Contact us'])
</script>
