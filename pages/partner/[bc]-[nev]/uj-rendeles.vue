<script setup>
const user = ref({ name: 'Goldavis Kft.', bc: 78 });

const products = [
  'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
  'Szójadara II.o.46%',
  'AF-4300-Tox/E/AP Tt csibe 4%',
];
const packagingOptions = ['Zsákos', 'Ömlesztett', 'BigBag'];

// const date = ref(new Date());

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

const label = computed(() =>
  state.deliveryDate.toLocaleDateString('hu-hu', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
);

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
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <div>
    <!-- HEADER -->
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
    <!-- NAV -->
    <NavPartner :name="user.name" :bc="user.bc" />
    <!-- NEW ORDER -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Új rendelés</h2>
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
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                icon="i-heroicons-calendar-days-20-solid"
                :label="label"
              />

              <template #panel="{ close }">
                <LazyDatePicker v-model="state.deliveryDate" @close="close" />
              </template>
            </UPopover>
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

        <div class="col-span-1">
          <UButton type="submit"> Rendelés elküldése </UButton>
        </div>
      </UForm>
    </UContainer>
  </div>
</template>
