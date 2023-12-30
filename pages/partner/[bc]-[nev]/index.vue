<script setup>
const user = ref({ name: 'Goldavis Kft.', bc: 78 });

const columns = [
  {
    key: 'datum',
    label: 'Szállítási dátum',
    sortable: true,
  },
  {
    key: 'szamlaszam',
    label: 'Számlaszám',
  },
  {
    key: 'termekkod',
    label: 'Termékkód',
  },
  {
    key: 'termek',
    label: 'Termék',
  },
  {
    key: 'mennyiseg',
    label: 'Mennyiség',
  },
  {
    key: 'mertekegyseg',
    label: 'Mértékegység',
  },
  {
    key: 'actions',
  },
];

const orders = [
  {
    datum: '2023-06-06',
    szamlaszam: 'VR2306245',
    termekkod: 'K3462',
    termek: 'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
    mennyiseg: 1000,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-05-22',
    szamlaszam: 'VR2306068',
    termekkod: 'F0016',
    termek: 'Szójadara II.o.46%',
    mennyiseg: 25800,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-05-19',
    szamlaszam: 'VR2305464',
    termekkod: 'K3462',
    termek: 'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
    mennyiseg: 2000,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-05-19',
    szamlaszam: 'VR2305464',
    termekkod: 'K3748',
    termek: 'AF-4300-Tox/E/AP Tt csibe 4%',
    mennyiseg: 980,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-05-11',
    szamlaszam: 'VR2305739',
    termekkod: 'F0016',
    termek: 'Szójadara II.o.46%',
    mennyiseg: 25200,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-05-04',
    szamlaszam: 'VR2305679',
    termekkod: 'F0016',
    termek: 'Szójadara II.o.46%',
    mennyiseg: 22960,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-05-02',
    szamlaszam: 'VR2304740',
    termekkod: 'K3462',
    termek: 'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
    mennyiseg: 1975,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-04-24',
    szamlaszam: 'VR2304313',
    termekkod: 'K3462',
    termek: 'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
    mennyiseg: 2000,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-04-17',
    szamlaszam: 'VR2304759',
    termekkod: 'F0016',
    termek: 'Szójadara II.o.46%',
    mennyiseg: 25500,
    mertekegyseg: 'kg',
  },
  {
    datum: '2023-04-13',
    szamlaszam: 'VR2304758',
    termekkod: 'F0016',
    termek: 'Szójadara II.o.46%',
    mennyiseg: 25000,
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

  return orders.filter((order) => {
    return Object.values(order).some((value) => {
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
    <NavPartner :name="user.name" :bc="user.bc" />
    <!-- orders -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Utolsó rendelések</h2>
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
        :sort="{ column: 'datum' }"
      >
        <template #actions-data>
          <UButton
            to="/partner/78-goldavis-kft-/uj-rendeles"
            :ui="{ rounded: 'rounded-full' }"
          >
            Rendelés újra
          </UButton>
        </template>
      </UTable>
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
  </div>
</template>
