<script setup>
const user = ref({ name: 'Goldavis Kft.', bc: 78 });

const date = ref(new Date());

const label = computed(() =>
  date.value.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
);

const state = reactive({
  deliveryNote: undefined,
  deliveryName: undefined,
  deliveryCity: undefined,
  deliveryPostcode: undefined,
  deliveryAddress: undefined,
});

async function onSubmit(event) {
  // Do something with data
  console.log(event.data);
}
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
    <!-- new order -->
    <UContainer class="pb-16">
      <h2 class="mb-8">Új rendelés</h2>
      <UForm :state="state" class="grid grid-cols-6 gap-6" @submit="onSubmit">
        <div class="font-bold">// REPEATER here...</div>
        <!-- datepicker -->
        <div class="col-span-full">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />

            <template #panel="{ close }">
              <LazyDatePicker v-model="date" @close="close" />
            </template>
          </UPopover>
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
