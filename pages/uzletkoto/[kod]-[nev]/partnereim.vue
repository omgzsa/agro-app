<script setup>
definePageMeta({
  middleware: ['auth', 'is-partner'],
});

import partnerek from '@/assets/bk-partnerek.json';
const user = ref({ name: 'Bolla Kálmán', kod: 'BK', bc: 243 });

const columns = [
  {
    key: 'No',
    label: 'BC azonosító',
  },
  {
    key: 'Name',
    label: 'Név',
  },
  {
    key: 'City',
    label: 'Város',
  },
  {
    key: 'Address',
    label: 'Cím',
  },
  {
    key: 'actions',
  },
];

const query = ref('');

const page = ref(1);
const pageCount = 20;

const slugify = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase();
};

const paginatedAndFilteredRows = computed(() => {
  const startIndex = (page.value - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  return filteredRows.value.slice(startIndex, endIndex);
});

const filteredAndPaginatedLength = computed(() => {
  return filteredRows.value.length;
});

const filteredRows = computed(() => {
  if (!query.value) {
    return partnerek.value;
  }

  return partnerek.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});
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
    <!-- partners -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Partnereim</h2>
      <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="query" placeholder="Partner keresése..." />
      </div>

      <UTable
        :rows="paginatedAndFilteredRows"
        :columns="columns"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No items.',
        }"
      >
        <template #actions-data="{ row }">
          <UButton
            :to="`/partner/${row.No}-${slugify(row.Name)}`"
            :ui="{ rounded: 'rounded-full' }"
          >
            Partnerhez
          </UButton>
        </template>
      </UTable>
      <div
        class="flex justify-end py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="filteredAndPaginatedLength"
        />
      </div>
    </UContainer>
  </div>
</template>
