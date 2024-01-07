<script lang="ts" setup>
const { title } = defineProps({
  title: String,
  name: String,
  isVisible: Boolean,
});
</script>

<template>
  <div class="py-12 bg-agro-100">
    <UContainer class="flex flex-col items-start sm:items-center">
      <img
        src="assets/images/agrofeed-logo-dashboard.webp"
        alt="agrofeed logo"
        width="200"
        height="57"
        class="w-48 h-12 mx-auto mb-16"
      />
      <h1 class="mb-2 text-white">{{ title }}</h1>
      <p v-if="isVisible" class="text-2xl font-medium text-white">
        Üdvözöljük, {{ name }}!
      </p>
    </UContainer>
  </div>
</template>
