<script setup>
const user = ref({ name: 'Bolla Kálmán', kod: 'BK', bc: 243 });

const columns = [
  {
    key: 'bc',
    label: 'BC azonosító',
  },
  {
    key: 'nev',
    label: 'Név',
  },
  {
    key: 'varos',
    label: 'Város',
  },
  {
    key: 'cim',
    label: 'Cím',
  },
  {
    key: 'actions',
  },
];

const partners = [
  {
    bc: 78,
    nev: 'Goldavis Kft.',
    varos: 'Sármellék',
    cim: 'Ízek útja 8/1.',
  },
  {
    bc: 81,
    nev: 'Göcsejmix Kft',
    varos: 'Ormándlak',
    cim: 'Külterület, Hrsz. 043/4',
  },
  {
    bc: 330,
    nev: 'Jancsecz Lajos',
    varos: 'Belezna',
    cim: 'Kossuth Lajos út 59.',
  },
  {
    bc: 379,
    nev: 'Karát Broiler Kft.',
    varos: 'Vasvár',
    cim: 'Nagymákfa út 18.',
  },
  {
    bc: 461,
    nev: 'Hombár Kft.',
    varos: 'Galambok',
    cim: 'Major',
  },
  {
    bc: 510,
    nev: 'Horváth Zsolt',
    varos: 'Szany',
    cim: 'Dózsa György u. 80.',
  },
  {
    bc: 603,
    nev: 'Zalatárnok - Tófej Mg. Kft.',
    varos: 'Zalatárnok',
    cim: 'Petőfi u. 61.',
  },
  {
    bc: 850,
    nev: 'Varga Szárnyas Kft.',
    varos: 'Becsehely',
    cim: 'Kossuth L. u. 254.',
  },
  {
    bc: 1175,
    nev: 'Y Takarmányipari Kft.',
    varos: 'Sásd',
    cim: 'Törökmalom u. 2.',
  },
  {
    bc: 1473,
    nev: 'Szőlőfürt Mezőgazdasági Szövetkezet',
    varos: 'Kecel',
    cim: 'Szabadság tér 9.',
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
    return partners;
  }

  return partners.filter((person) => {
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
        <template #actions-data>
          <UButton
            to="/partner/78-goldavis-kft"
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
          :total="partners.length"
        />
      </div>
    </UContainer>
  </div>
</template>
