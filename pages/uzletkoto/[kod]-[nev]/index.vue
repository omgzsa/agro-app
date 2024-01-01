<script setup>
const user = ref({ name: 'Bolla Kálmán', kod: 'BK', bc: 243 });
</script>

<template>
  <div>
    <!-- header -->
    <div class="py-12 bg-agro-100">
      <UContainer class="flex flex-col items-start sm:items-center">
        <img
          src="assets/images/agrofeed-logo-dashboard.webp"
          alt="agrofeed logo"
          width="200"
          height="57"
          class="w-48 h-12 mx-auto mb-16"
        />
        <h1 class="mb-2 text-white">Webshop irányítópult</h1>
        <p class="text-2xl font-medium text-white">
          Üdvözöljük, {{ user.name }}!
        </p>
      </UContainer>
    </div>
    <!-- nav -->
    <NavUzletkoto :name="user.name" :kod="user.kod" />
    <!-- featured -->
    <UContainer>
      <div class="grid gap-4 pb-16 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <UCard :ui="{ divide: '', shadow: 'shadow-md' }" class="text-center">
          <template #header>
            <Icon
              name="heroicons:shopping-bag"
              size="40"
              class="mb-3 text-agro-100"
            />
            <h4>Rendelések száma</h4>
            <span class="text-xs text-gray-400">Ebben a hónapban</span>
          </template>

          <span class="text-xl font-bold">&mdash;</span>
        </UCard>
        <UCard :ui="{ divide: '', shadow: 'shadow-md' }" class="text-center">
          <template #header>
            <div class="flex flex-col items-center gap-y-2">
              <Icon
                name="heroicons:user-group"
                size="40"
                class="mb-2 text-agro-100"
              />
              <h4>Webshopban aktív partnerek</h4>
              <span class="text-xs text-gray-400">Ebben a hónapban</span>
            </div>
          </template>

          <span class="text-xl font-bold">&mdash;</span>
        </UCard>
        <UCard :ui="{ divide: '', shadow: 'shadow-md' }" class="text-center">
          <template #header>
            <Icon
              name="heroicons:light-bulb"
              size="40"
              class="mb-3 text-agro-100"
            />
            <h4>Népszerű termékeim</h4>
            <span class="text-xs text-gray-400">Ebben a hónapban</span>
          </template>

          <span class="text-xl font-bold">&mdash;</span>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
