<template>
  <v-navigation-drawer temporary="" class="tw-mx-auto" width="300">
    <v-list>
      <v-list-group value="dashboard">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-police-badge-outline"
            title="Dashboard"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="([title, icon], i) in crud"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        ></v-list-item>
      </v-list-group>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        rounded="shaped"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list> </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([
  { text: 'home', icon: 'mdi-account-outline' },
  { text: 'about us', icon: 'mdi-star-box-outline' },
  { text: 'contact', icon: 'mdi-fire' },
  { text: 'who are you', icon: 'mdi-truck-minus-outline' }
])

const crud = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete']
]
</script>
