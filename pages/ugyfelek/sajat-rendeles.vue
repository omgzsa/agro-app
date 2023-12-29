<script setup>
const user = ref({ name: 'Molnár István' });

const columns = [
  {
    key: 'szallitasiDatum',
    label: 'Szállítási dátum',
  },
  {
    key: 'termekkod',
    label: 'Termékkód',
  },
  {
    key: 'termekLeiras',
    label: 'Termék leírás',
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

const orders = [
  {
    szallitasiDatum: '2023-04-27',
    termekkod: 'K3462',
    termekLeiras: 'Cunicral HT nyúl tak.kev.',
    mennyiseg: 40,
    mertekegyseg: 'kg',
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

  return orders.filter((person) => {
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
    <NavUgyfel />
    <!-- my orders -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Saját rendelés</h2>
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

    <!-- new order -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Új rendelés</h2>
    </UContainer>
  </div>
</template>
