<script lang="ts" setup>
const { title, orders } = defineProps({
  title: String,
  orders: Array,
});

const columns = [
  {
    key: 'szamlaszam',
    label: 'Számlaszám',
  },
  {
    key: 'vevokod',
    label: 'Vevőkód',
  },
  {
    key: 'termekkod',
    label: 'Termékkód',
  },
  {
    key: 'datum',
    label: 'Szállítási dátum',
    sortable: true,
  },
  {
    key: 'kelte',
    label: 'Számla kelte',
    sortable: true,
  },
  {
    key: 'leiras',
    label: 'Leírás',
  },
  {
    key: 'mennyiseg',
    label: 'Mennyiség',
  },
  {
    key: 'mertekegyseg',
    label: 'Mértékegység',
  },
];
const query = ref('');

const page = ref(1);
const pageCount = 6;

const paginatedAndFilteredRows = computed(() => {
  const startIndex = (page.value - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  return filteredRows.value.slice(startIndex, endIndex);
});

const filteredRows = computed(() => {
  if (!query.value) {
    return orders;
  }

  return orders.filter((order) => {
    return Object.values(order).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});
</script>

<template>
  <UContainer class="pb-16">
    <h2 class="mb-8">Rendeléseim</h2>
    <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="query" placeholder="Megrendelés keresése..." />
    </div>

    <UTable
      :rows="paginatedAndFilteredRows"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No items.',
      }"
      :sort="{ columns: ['datum', 'kelte'] }"
    />
    <div
      class="flex justify-end py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="orders.length"
      />
    </div>
  </UContainer>
</template>
