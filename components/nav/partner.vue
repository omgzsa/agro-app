<script lang="ts" setup>
const props = defineProps({
  name: String,
  bc: Number,
});

const slugName = computed(() => {
  let slug;
  if (props.name) {
    slug = props.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
  }
  return slug;
});

// console.log(slugName.value);
</script>
<template>
  <UContainer>
    <nav class="grid py-16 place-content-center">
      <!-- <DarkMode /> -->
      <ul class="flex flex-wrap items-center gap-x-4 gap-y-6">
        <li>
          <ULink
            :to="`/partner/${props.bc}-${slugName}`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Rendeléseim
          </ULink>
        </li>
        <li>
          <ULink
            :to="`/partner/${props.bc}-${slugName}/uj-rendeles`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Új rendelés
          </ULink>
        </li>
        <li>
          <ULink
            :to="`/partner/${props.bc}-${slugName}/segitseg-nyujtas`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Segítségnyújtás
          </ULink>
        </li>
      </ul>
    </nav>
  </UContainer>
</template>

<style></style>
