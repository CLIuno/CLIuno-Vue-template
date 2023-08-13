<template>
  <VCard>
    <VCardTitle>Account Settings</VCardTitle>
    <VCardText>
      <VForm>
        <VTextField label="Name" v-model="name"></VTextField>
        <VTextField label="Email" v-model="email"></VTextField>
        <VTextField label="Password" v-model="password"></VTextField>
        <VAvatar size="128" tile>
          <VImg src="https://avatars.githubusercontent.com/u/123456789" />
        </VAvatar>
        <VSelect label="Timezone" v-model="timezone" :items="timezones"></VSelect>
        <VCheckbox label="Receive marketing emails" v-model="receiveMarketingEmails"></VCheckbox>
        <VCheckbox label="Enable notifications" v-model="enableNotifications"></VCheckbox>
      </VForm>
    </VCardText>
    <VCardActions>
      <VSpacer></VSpacer>
      <VBtn color="primary" @click="save">Save</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup></script>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      timezone: 'America/Los_Angeles',
      receiveMarketingEmails: false,
      enableNotifications: true
    }
  },
  methods: {
    save() {
      // Save the user's settings
    }
  }
}
</script>
