<!-- <script lang="ts" setup>
const { id } = useRoute().params;
</script>

<template>
  <div>
    {{ id }}
  </div>
</template> -->
<script setup>
import { useGroupBy } from '@/composables/groupBy';
import rendelesek from '@/assets/0032-rendelesek.json';

const directus_user = useDirectusUser();
const base_url = useDirectusUrl();
const { data: user } = await useFetch(
  `${base_url}/users/${directus_user.value.id}?fields=first_name,last_name,uzletkoto.*`
);

const { data: sales } = await useFetch(
  `${base_url}/items/uzletkoto/${user.value.data.uzletkoto[0].uzletkoto_uzletkotokod}`
);

definePageMeta({
  middleware: 'auth',
});

const router = useRouter();

// const user = ref({ name: 'Agro-M Zrt.', bc: '0032' });

const q = ref('');
const isOpen = ref(false);
const page = ref(1);
const pageCount = 12;
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
    path: `/uzletkoto/partnereim/ujra-rendeles`,
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
    <UserHeader
      title="Webshop irányítópult"
      :name="sales.data.nev"
      :is-visible="true"
    />
    <!-- nav -->
    <NavUzletkoto />
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
