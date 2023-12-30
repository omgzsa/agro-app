<script setup>
const user = ref({ name: 'Molnár István' });

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
  },
  {
    key: 'kelte',
    label: 'Számla kelte',
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

const orders = [
  {
    szamlaszam: 'AF2300029',
    vevokod: 78,
    termekkod: 'K3462',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
    mennyiseg: 2975,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'Á3221',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'Vivafat (Quality fat)',
    mennyiseg: 1200,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K6821',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AS-2625-P/NSP vemhes koca premix 3%',
    mennyiseg: 2010,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'E0254',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'Arbocell RC Fine',
    mennyiseg: 1020,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K7080',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AS-2516-P/NSP+ Szoptató koca px 4%',
    mennyiseg: 960,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K7396',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AS-2403-P/NSP Süldő/Hízó premix 2,5%',
    mennyiseg: 975,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K8078',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AS-2627-P+/NSP búgató koca premix 4%',
    mennyiseg: 960,
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
    <NavUzletkoto />
    <!-- orders -->
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
  </div>
</template>
