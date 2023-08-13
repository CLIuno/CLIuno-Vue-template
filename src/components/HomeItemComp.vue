<template>
  <v-main class="btn-color-is-primary">
    <v-container>
      <v-row>
        <v-col v-for="item in items" :key="item" cols="4">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <router-link :to="item.link" class="text-decoration-none">
                <v-card height="150" v-bind="props" :color="isHovering ? 'primary' : undefined">
                  <v-card-item
                    class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-p-4 tw-m-2"
                  >
                    <v-icon size="48" class="tw-mb-4">{{ item.icon }}</v-icon>
                    <v-card-title class="tw-text-lg tw-font-bold">{{ item.title }}</v-card-title>
                  </v-card-item>
                </v-card>
              </router-link>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([
  { title: 'Database', icon: 'mdi-database-outline', link: 'database' },
  { title: 'Chat', icon: 'mdi-chat-outline', link: 'chat' },
  { title: 'Exams', icon: 'mdi-map', link: 'map' },
  { title: 'Alerts', icon: 'mdi-alert-circle-outline', link: 'alert' },
  { title: 'training', icon: 'mdi-earth', link: 'training' }
])
</script>
<style scoped>
.asd {
  align-items: center;
}
</style>
