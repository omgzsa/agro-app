<script setup>
const { title, partners } = defineProps({
  title: String,
  partners: [Array, Object],
});

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
const pageCount = 12;

const slugify = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase();
};

const filteredRows = computed(() => {
  if (!query.value) {
    return partners.value;
  }

  return partners.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});

const paginatedAndFilteredRows = computed(() => {
  const startIndex = (page.value - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  return filteredRows.value.slice(startIndex, endIndex);
});

const filteredAndPaginatedLength = computed(() => {
  return filteredRows.value.length;
});
</script>

<template>
  <UContainer class="pb-16">
    <h2 class="mb-8">{{ title }}</h2>
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
          :to="`/uzletkoto/partnereim/${row.No}-${slugify(row.Name)}`"
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
</template>
