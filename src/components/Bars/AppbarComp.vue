<template>
  <div>
    <VAppBar>
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VImg class="mx-2" src="@/assets/images/loading.png" max-height="40" max-width="40" />
      <RouterLink :to="{ name: 'home' }" class="text-decoration-none">
        <span class="text-h5">
          <VToolbarTitle>CLIuno</VToolbarTitle>
        </span>
      </RouterLink>
      <VSpacer />
      <VDivider vertical />
      <VTooltip location="top" v-for="item in listOfItems" :key="item.text">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn v-bind="mergeProps(tooltip)">{{ item.text }}</v-btn>
        </template>
        <span>{{ item.text }} Mode</span>
      </VTooltip>
      <VDivider vertical="" />
      <VSpacer />
      <VBtn icon @click="toggleLocale">
        <VIcon>mdi-translate-variant</VIcon>
        <VTooltip activator="parent" location="bottom">change langauge</VTooltip>
      </VBtn>
      <VBtn icon @click="toggleTheme">
        <VIcon>mdi-theme-light-dark</VIcon>
        <VTooltip activator="parent" location="bottom">change theme</VTooltip>
      </VBtn>
      <UseFullscreen>
        <VBtn @click="toggle" icon>
          <span v-if="!isFullscreen">
            <VIcon>mdi-arrow-expand-all</VIcon>
            <VTooltip activator="parent" location="bottom">expand screen</VTooltip>
          </span>
          <span v-else>
            <VIcon>mdi-arrow-collapse-all</VIcon>
            <VTooltip activator="parent" location="bottom">collapse screen</VTooltip>
          </span>
        </VBtn>
      </UseFullscreen>
      <VBtn icon>
        <VIcon>mdi-magnify</VIcon>
        <VTooltip activator="parent" location="bottom">search</VTooltip>
      </VBtn>
      <VBtn icon>
        <NotificationComp />
        <VTooltip activator="parent" location="bottom">notification</VTooltip>
      </VBtn>
      <VBtn icon>
        <UserProfileComp />
      </VBtn>
    </VAppBar>
    <NavDrawerComp v-model="drawer" />
    <VAppBar class="transparent-style" elevation="0">
      <BreadcrumbComp />
    </VAppBar>
  </div>
</template>

<script setup>
// import components
import NavDrawerComp from '@/components/Bars/NavDrawerComp.vue'

// import functions
import { mergeProps, ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useTheme, useLocale } from 'vuetify'
import UserProfileComp from '@/components/UserProfileComp.vue'
import NotificationComp from '@/components/NotificationComp.vue'
import BreadcrumbComp from '@/components/common/BreadcrumbComp.vue'

// const variables
const theme = useTheme()
const el = ref(null)
const { toggle, isFullscreen } = useFullscreen(el)
const { current } = useLocale()
const drawer = ref(null)
const listOfItems = ref([
  { text: 'Home' },
  { text: 'About us' },

])

// functions
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
const toggleLocale = () => {
  current.value = current.value === 'en' ? 'ar' : 'en'
}
</script>
