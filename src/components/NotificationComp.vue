<script setup>
import { ref } from 'vue'
</script>

<template>
  <VBadge content="12" offset-x="10" offset-y="5" color="error">
    <VAvatar class="cursor-pointer">
      <v-icon>mdi-bell</v-icon>
      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <v-icon>mdi-bell</v-icon>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>
            <VListItemTitle class="font-weight-semibold"> Attack me </VListItemTitle>
            <VListItemSubtitle>we are under attack</VListItemSubtitle>
            <!-- Add clear button -->
            <template #append>
              <VBtn class="hover:tw-text-purple-600" icon @click="clearInput" variant="plain">
                <VIcon>mdi-close</VIcon>
              </VBtn>
            </template>
          </VListItem>
          <VDivider class="my-2" />
          <v-hover>
            <template v-slot="{ isHovering, props }">
              <VListItem
                :elevation="isHovering ? 16 : 2"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
              >
                <template #prepend>
                  <VListItemAction start>
                    <VBadge
                      dot
                      location="bottom right"
                      offset-x="3"
                      offset-y="3"
                      :color="isHovering ? 'info' : 'success'"
                    >
                      <VAvatar :color="isHovering ? 'primary' : 'warning'" variant="tonal">
                        <v-icon>mdi-bell</v-icon>
                      </VAvatar>
                    </VBadge>
                  </VListItemAction>
                </template>
                <VListItemTitle class="font-weight-semibold"> Attack me </VListItemTitle>
                <VListItemSubtitle>we are under attack</VListItemSubtitle>
                <!-- Add clear button -->
                <template #append>
                  <VBtn class="hover:tw-text-purple-600" icon @click="clearInput" variant="plain">
                    <VIcon>mdi-close</VIcon>
                  </VBtn>
                </template>
              </VListItem>
            </template>
          </v-hover>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
