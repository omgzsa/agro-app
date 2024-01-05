<script setup>
import { useGroupBy } from '@/composables/groupBy';
import rendelesek from '@/assets/0032-rendelesek.json';

definePageMeta({
  middleware: 'auth',
});

const router = useRouter();

const user = ref({ name: 'Agro-M Zrt.', bc: '0032' });

const q = ref('');
const isOpen = ref(false);
const page = ref(1);
const pageCount = 20;
const selectedEntries = ref([]);
const columns = [
  {
    key: 'id',
    label: 'Számlaszám',
  },
  {
    key: 'documentNum',
    label: 'Rendelés szám',
  },
  {
    key: 'shipmentDate',
    label: 'Szállítási dátum',
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
      click: () => goToOrderWithParams(row.entries),
    },
    {
      label: 'Megtekintés',
      icon: 'i-heroicons-document-text-20-solid',
      click: () => openModal(row.entries),
    },
  ],
];

const openModal = (entries) => {
  // console.log(entries);
  selectedEntries.value = entries;
  isOpen.value = true;
};

const goToOrderWithParams = (entries) => {
  const entriesString = JSON.stringify(entries);
  router.push({
    path: `/partner/0032-agro-m-zrt-/ujra-rendeles`,
    query: { allEntries: entriesString },
  });
};

// 1. GROUP ARRAY BY ORDER NO
const { groupedArray } = useGroupBy(rendelesek.value, (item) => item.Order_No);

// 2. FORMAT ARRAY TO BE USED IN TABLE
const formattedArray = groupedArray.map((group) => {
  const orderNo = group[0].Order_No;
  const shipmentDate = group[0].Shipment_Date;
  const documentNum = group[0].Document_No;
  return { id: orderNo, shipmentDate, documentNum, entries: group };
});

// 3. PAGINATE THE FORMATTED ARRAY
const paginatedAndFilteredRows = computed(() => {
  const startIndex = (page.value - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  return filteredRows.value.slice(startIndex, endIndex);
});

// 4. REVERSE THE FORMATTED ARRAY BY DATE
const sortedArray = computed(() => {
  return formattedArray.slice().sort((a, b) => {
    return new Date(b.shipmentDate) - new Date(a.shipmentDate);
  });
});

// 5. FILTER THE FORMATTED ARRAY BY SEARCH QUERY
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
</script>

<template>
  <div>
    <!-- header -->
    <div class="py-12 bg-agro-100">
      <UContainer class="flex flex-col items-start sm:items-center gap-y-2">
        <img
          src="assets/images/agrofeed-logo-dashboard.webp"
          alt="agrofeed logo"
          width="200"
          height="57"
          class="w-48 h-12 mx-auto mb-16"
        />
        <h1 class="mb-2 text-white">Webshop irányítópult</h1>
        <p class="mb-2 text-2xl font-medium text-white">
          Üdvözöljük, {{ user.name }}!
        </p>
        <UButton
          icon="i-heroicons-arrow-uturn-left-20-solid"
          to="/uzletkoto/BK-bolla-kalman"
          class="text-white"
          >Vissza az irányítópulthoz</UButton
        >
      </UContainer>
    </div>
    <!-- nav -->
    <NavPartner :name="user.name" :bc="user.bc" />
    <!-- orders -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Utolsó rendelések</h2>
      <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Megrendelés keresése" />
      </div>
      <UModal v-model="isOpen">
        <div class="p-4">
          <div v-for="entry in selectedEntries" :key="entry" class="p-2">
            <p>
              <span class="text-agro-100">Rendelés szám:</span>
              {{ entry.Document_No }}
            </p>
            <p><span class="text-agro-100">Termék kód:</span> {{ entry.No }}</p>
            <p>
              <span class="text-agro-100">Termék:</span> {{ entry.Description }}
            </p>
            <p class="pb-2">
              <span class="text-agro-100">Mennyiség:</span> {{ entry.Amount }}
              <span>{{ entry.Unit_of_Measure }}</span>
            </p>
            <hr />
          </div>
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
