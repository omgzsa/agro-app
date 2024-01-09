<script setup>
definePageMeta({
  middleware: 'auth',
});
// import { useGroupBy } from '@/composables/groupBy';
// import rendelesek from '@/assets/0032-rendelesek.json';

const { id, name } = useRoute().params;
const router = useRouter();

const directus_user = useDirectusUser();
const base_url = useDirectusUrl();

const q = ref('');
const isOpen = ref(false);
const page = ref(1);
const pageCount = 12;
const selectedEntries = ref([]);

const { data: user } = await useFetch(
  `${base_url}/users/${directus_user.value.id}?fields=first_name,last_name,uzletkoto.*`
);

const { data: sales } = await useFetch(
  `${base_url}/items/uzletkoto/${user.value.data.uzletkoto[0].uzletkoto_uzletkotokod}`
);

const { data: ugyfel } = await useFetch(
  `${base_url}/items/ugyfel/${id}?fields=nev,bcrendelesek.*`
);

const columns = [
  {
    key: 'bcRendelesszam',
    label: 'WS rendelés szám',
  },
  {
    key: 'datum',
    label: 'Dátum',
  },
  {
    key: 'szallitasiVaros',
    label: 'Szállítási város',
  },
  {
    key: 'szallitasiCim',
    label: 'Szállítási cím',
  },
  {
    key: 'actions',
    label: 'Műveletek',
  },
];

const items = (row) => [
  [
    {
      label: 'Rendelés újra',
      icon: 'i-heroicons-plus-circle-20-solid',
      click: () => goToOrderWithParams(row.termekek),
      // click: () => console.log(row.termekek),
    },
    {
      label: 'Megtekintés',
      icon: 'i-heroicons-document-text-20-solid',
      click: () => openModal(row.termekek),
    },
  ],
];

const openModal = (termekek) => {
  selectedEntries.value = termekek;
  isOpen.value = true;
};

const goToOrderWithParams = (termekek) => {
  const termekekString = JSON.stringify(termekek);
  router.push({
    path: `/uzletkoto/partnereim/${id}-${name}/ujra-rendeles`,
    query: { allEntries: termekekString },
  });
};

// 1. GROUP ARRAY BY ORDER NO
// const { groupedArray } = useGroupBy(rendelesek.value, (item) => item.Order_No);

// 2. FORMAT ARRAY TO BE USED IN TABLE
// const formattedArray = groupedArray.map((group) => {
//   const orderNo = group[0].Order_No;
//   const shipmentDate = group[0].Shipment_Date;
//   const documentNum = group[0].Document_No;
//   return { id: orderNo, shipmentDate, documentNum, entries: group };
// });

// 1. REVERSE THE FORMATTED ARRAY BY DATE
const sortedArray = computed(() => {
  return ugyfel.value.data.bcrendelesek.slice().sort((a, b) => {
    return new Date(b.datum) - new Date(a.datum);
  });
});

// 2. FILTER THE FORMATTED ARRAY BY SEARCH QUERY
const filteredRows = computed(() => {
  if (!q.value) {
    return sortedArray.value;
  }

  return sortedArray.value.filter((order) => {
    return Object.values(order).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

// 3. PAGINATE THE FORMATTED ARRAY
const paginatedAndFilteredRows = computed(() => {
  const startIndex = (page.value - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  return filteredRows.value.slice(startIndex, endIndex);
});
</script>

<template>
  <div>
    <!-- header -->
    <UserHeader
      title="Webshop irányítópult"
      :name="sales.data.nev"
      :is-visible="true"
    />
    <!-- nav -->
    <NavUzletkoto :id="id" :name="name" />
    <!-- orders -->
    <UContainer class="pb-16">
      <h2 class="mb-8">{{ ugyfel.data.nev }} rendelések</h2>
      <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Megrendelés keresése" />
      </div>
      <UModal v-model="isOpen">
        <div class="px-10 py-8">
          <h3 class="mb-8">Rendelés részletei</h3>
          <div v-for="(termek, index) in selectedEntries" :key="termek">
            <div class="pb-4">
              <!-- <p>
                <span class="text-agro-100">Rendelés szám:</span>
                {{ entry.Document_No }}
              </p> -->
              <p>
                <span class="text-agro-100">Termék kód:</span>
                {{ termek.termekkod }}
              </p>
              <p>
                <span class="text-agro-100">Termék:</span>
                {{ termek.Description }}
              </p>
              <p class="pb-4">
                <span class="text-agro-100">Mennyiség:</span>
                {{ termek.mennyiseg }}
                <span>kg</span>
              </p>
              <hr />
            </div>
          </div>
          <!-- order again button -->
          <UButton
            color="primary"
            variant="solid"
            @click="goToOrderWithParams(selectedEntries)"
            class="mt-4"
          >
            Rendelés újra
          </UButton>
        </div>
      </UModal>
      <UTable :columns="columns" :rows="paginatedAndFilteredRows">
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-information-circle-16-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <div
        class="flex justify-end py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="filteredRows.length"
        />
      </div>
    </UContainer>
  </div>
</template>
