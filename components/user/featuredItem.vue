<script lang="ts" setup>
const { icon, title, value } = defineProps({
  icon: String,
  title: String,
  value: String,
});
</script>

<template>
  <UCard :ui="{ divide: '', shadow: 'shadow-md' }" class="text-center">
    <template #header>
      <Icon :name="icon" size="40" class="mb-3 text-agro-100" />
      <h4>{{ title }}</h4>
      <span class="text-xs text-gray-400">Ebben a hónapban</span>
    </template>

    <span class="text-xl font-bold">{{ value }}</span>
  </UCard>
</template>
