<template>
  <DefaultLayout>
    <v-container fluid class="d-flex align-center justify-center" style="min-height: 100vh">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card elevation="2">
            <v-card-title class="text-h5 text-primary">Whoops, 404</v-card-title>
            <v-card-text>
              <p>The page you were looking for does not exist.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" outlined>Get me out of here!</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import DefaultLayout from './DefaultLayout.vue'

const route = useRoute()
useHead({
  title: 'Page not found'
})
</script>
