<script setup>
const date = new Date();
const label = computed(() =>
  date.toLocaleDateString('hu-HU', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
);
</script>

<template>
  <div>
    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />

      <template #panel="{ close }">
        <LazyDatePicker :model-value="date" @close="close" />
      </template>
    </UPopover>
  </div>
</template>
