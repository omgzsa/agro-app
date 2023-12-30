<script lang="ts" setup>
//
</script>
<template>
  <UContainer>
    <nav class="grid py-16 place-content-center">
      <ul class="flex flex-wrap items-center gap-x-4 gap-y-6">
        <li>
          <ULink
            to="/uzletkotok"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Rendeléseim
          </ULink>
        </li>
        <li>
          <ULink
            to="/uzletkotok/uj-rendeles"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Új rendelés
          </ULink>
        </li>
        <li>
          <ULink
            to="/uzletkotok/segitseg-nyujtas"
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
