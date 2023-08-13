<template>
  <VBreadcrumbs :items="items">
    <template v-slot:divider>
      <VIcon icon="mdi-forward" />
    </template>
  </VBreadcrumbs>
</template>

<script setup>
// import components
const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: 'breadcrumbs_dashboard'
  },
  {
    title: 'Link 1',
    disabled: false,
    href: 'breadcrumbs_link_1'
  },
  {
    title: 'Link 2',
    disabled: true,
    href: 'breadcrumbs_link_2'
  }
]
</script>
