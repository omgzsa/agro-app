<script setup>
definePageMeta({
  middleware: 'auth',
});

const route = useRoute();
const allEntries = ref([]);
const toast = useToast();
const router = useRouter();

// onMounted(() => {
// Parse the JSON string back into an object
const serializedEntries = route.query.allEntries;
if (serializedEntries) {
  allEntries.value = JSON.parse(serializedEntries);
}
// console.log(allEntries.value);
// });

const user = ref({
  name: 'Agro-M Zrt.',
  bc: '0032',
  city: 'Orosháza',
  postCode: 5900,
  address: 'Zöldfa utca 1.',
});

const products = [
  'VTP-130-SC/U Tejelő tehén 5%',
  'AS-22972-P+/NSP malac px 3,5%',
  'AS-1000 Amox Zero prest.',
  'Pigipro 1 Milk Care',
  'Kukoricacsíra zsákos (darált)',
  'Arbocell RC Fine',
  'Ammónium klorid',
  'Szójahéj zsákos, darált',
  'Takarmánysó - Ért. - zsák',
  'VTP-110-U Tejelő tehén px.4%',
  'Nátrium-hidrogén-karbonát',
  'Takarmánymész 0,02 - 1,25 mm',
  'Kukoricacsíra zsákos (darált)',
  'AS-2499-P+/NSP Sertés hízó 1 kpx 3%',
  'AS-5097 Tutti Babyst.',
  'AS-24991-P/NSP Sertés hízó 2 kpx 3%',
  'AS-5750 Zeusz kantáp BAG',
  'AS-22972-P+/NSP malac px 3,5%',
  'AS-3274-S BEST malac starter koncentrátum 10%',
  'AS-1000 Amox Zero prest.',
  'AS-2599-P/NSP Szoptató koca kpx 4%',
  'BasDiar',
  'AS-26991 P/NSP Vemhes koca kpx 3,5%',
  'Szójahéj zsákos, darált',
  'Kukoricacsíra zsákos (darált)',
  'AS-2499-P+/NSP Sertés hízó 1 kpx 3%',
  'AS-24991-P/NSP Sertés hízó 2 kpx 3%',
  'AS-22972-P+/NSP malac px 3,5%',
  'Dextróz',
  'AS-3274-S BEST malac starter koncentrátum 10%',
  'AS-2599-P/NSP Szoptató koca kpx 4%',
  'AS-26991 P/NSP Vemhes koca kpx 3,5%',
  'Szójahéj zsákos, darált',
  'VBT-201A Borjú indító tak',
  'Magnézium-oxid',
  'VivaStart',
  'Nyalósó szelénes 5 kg',
  'Takarmánysó - Ért. - zsák',
  'VTK-1550-Glüka Liver tejelő k',
  'VTP-110-U Tejelő tehén px.4%',
  'Takarmánymész 0,02 - 1,25 mm',
  'Nyalósó szelénes 5 kg',
  'Takarmánysó - Ért. - zsák',
  'VBT-201A Borjú indító tak',
  'VTP-110-U Tejelő tehén px.4%',
  'VTK-1550-Glüka Liver tejelő k',
  'Nátrium-hidrogén-karbonát',
  'Takarmánymész 0,02 - 1,25 mm',
  'AS-1000 Amox Zero prest.',
  'AS-3274-S BEST malac starter koncentrátum 10%',
  'Szójahéj zsákos, darált',
  'Kukoricacsíra zsákos (darált)',
  'Arbocell RC Fine',
  'Ammónium klorid',
  'AS-2499-P+/NSP Sertés hízó 1 kpx 3%',
  'AS-24991-P/NSP Sertés hízó 2 kpx 3%',
  'AS-5750 Zeusz kantáp BAG',
  'Jefo Sp',
  'AS-22972-P+/NSP malac px 3,5%',
  'Nyalósó natúr 5 kg',
  'VivaStart',
  'VTP-110-U Tejelő tehén px.4%',
  'Full-fat szója',
];
const packagingOptions = ['Zsákos', 'Ömlesztett', 'BigBag'];

const state = reactive({
  repeaterItems: [
    {
      id: 1,
      product: products[0],
      measure: 1,
      packaging: packagingOptions[0],
    },
  ],
  deliveryDate: new Date(),
  deliveryNote: undefined,
  deliveryName: undefined,
  deliveryCity: undefined,
  deliveryPostcode: undefined,
  deliveryAddress: undefined,
});

state.deliveryName = user.value.name;
state.deliveryCity = user.value.city;
state.deliveryPostcode = user.value.postCode;
state.deliveryAddress = user.value.address;
state.repeaterItems = allEntries.value.map((entry) => ({
  id: generateUniqueId(),
  product: entry.Description,
  measure: entry.Amount,
  packaging: '',
}));

function addItem() {
  state.repeaterItems.push({
    id: generateUniqueId(),
    product: products[0],
    measure: 1,
    packaging: packagingOptions[0],
  });
}

function updateProduct(index, value) {
  state.repeaterItems[index].product = value;
}

function updateMeasure(index, value) {
  state.repeaterItems[index].measure = value;
}

function updatePackaging(index, value) {
  state.repeaterItems[index].packaging = value;
}

function removeItem(id) {
  const index = state.repeaterItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    state.repeaterItems.splice(index, 1);
  }
}

function generateUniqueId() {
  return '_' + Math.random().toString(36).slice(2, 11);
}

async function onSubmit(event) {
  toast.add({
    title:
      'Rendelését sikeresen elküldte! Feldolgozás után email értesítést kap.',
  });
  console.log(event.data);
  // router.push('/partner/0032-agro-m-zrt-');
}
</script>

<template>
  <div>
    <!-- HEADER -->
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
    <!-- NAV -->
    <NavPartner :name="user.name" :bc="user.bc" />
    <!-- NEW ORDER -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Újra rendelés</h2>
      <UAlert
        icon="i-heroicons-information-circle-16-solid"
        color="primary"
        variant="solid"
        title="Minimális rendelési összmennyiség: 1000 kg"
        class="mb-8"
      />
      <UForm :state="state" class="grid grid-cols-6 gap-6" @submit="onSubmit">
        <!-- REPEATER -->
        <div class="col-span-full">
          <div
            v-for="(item, index) in state.repeaterItems"
            :key="item.id"
            class="mb-4"
          >
            <RepeaterItem
              :id="item.id"
              :product="item.product"
              :measure="item.measure"
              :packaging="item.packaging"
              :products="products"
              :packagingOptions="packagingOptions"
              @update:product="updateProduct(index, $event)"
              @update:measure="updateMeasure(index, $event)"
              @update:packaging="updatePackaging(index, $event)"
              @remove="removeItem(item.id)"
            />
          </div>
          <div class="flex gap-4">
            <UButton @click="addItem">Új termék hozzáadása</UButton>
          </div>
        </div>
        <!-- DATEPICKER -->
        <div class="col-span-full">
          <UFormGroup label="Szállítási dátum" name="deliveryDate">
            <agro-date-picker v-model="state.deliveryDate" />
          </UFormGroup>
        </div>
        <div class="col-span-full">
          <UFormGroup label="Szállítási megjegyzés" name="deliveryNote">
            <UInput v-model="state.deliveryNote" />
          </UFormGroup>
        </div>

        <div class="col-span-3">
          <UFormGroup label="Szállítási név" name="deliveryName" required>
            <UInput v-model="state.deliveryName" />
          </UFormGroup>
        </div>

        <div class="col-span-3">
          <UFormGroup label="Szállítási város" name="deliveryCity" required>
            <UInput v-model="state.deliveryCity" />
          </UFormGroup>
        </div>

        <div class="col-span-3">
          <UFormGroup
            label="Szállítási irányítószám"
            name="deliveryPostcode"
            required
          >
            <UInput v-model="state.deliveryPostcode" />
          </UFormGroup>
        </div>

        <div class="col-span-3">
          <UFormGroup label="Szállítási cím" name="deliveryAddress" required>
            <UInput v-model="state.deliveryAddress" />
          </UFormGroup>
        </div>

        <div class="col-span-2">
          <UButton type="submit" size="xl"> Rendelés elküldése </UButton>
        </div>
      </UForm>
    </UContainer>
  </div>
</template>
