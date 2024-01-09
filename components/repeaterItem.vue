<script setup>
const { id, product, measure, packaging, products, packagingOptions } =
  defineProps([
    'id',
    'product',
    'measure',
    'packaging',
    'products',
    'packagingOptions',
  ]);

// const measureValue = toRef(measure, 'measure');

const emit = defineEmits();

function updateProduct(value) {
  emit('update:product', value);
}

function updateMeasure(value) {
  const validatedValue = Math.max(1, value);
  emit('update:measure', validatedValue);
}

function updatePackaging(value) {
  emit('update:packaging', value);
}

function removeItem() {
  emit('remove', id);
}
</script>

<template>
  <div
    class="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:items-center sm:gap-6"
  >
    <UFormGroup label="Termék">
      <USelectMenu
        searchable
        searchable-placeholder="Termék keresése"
        placeholder="Termék kiválasztása"
        :value="product"
        @update:modelValue="updateProduct"
        :options="products"
        class="max-w-sm sm:w-64 md:w-80 lg:w-96"
        :model-value="product"
      />
    </UFormGroup>
    <UFormGroup label="Mennyiség (kg)">
      <UInput
        :value="measure"
        @update:modelValue="updateMeasure"
        type="number"
        :min="1"
        class="max-w-sm"
      />
      <!-- <UInput
        :value="measureValue"
        @update:modelValue="updateMeasure"
        type="text"
        :min="1"
        inputmode="numeric"
        v-maska
        data-maska="9 99#"
        data-maska-tokens="9:[0-9]:repeated"
        data-maska-reversed
        @maska="(e) => (measureValue = e.detail.unmasked)"
      /> -->
    </UFormGroup>
    <UFormGroup label="Kiszerelés">
      <USelect
        :value="packaging"
        @update:modelValue="updatePackaging"
        :options="packagingOptions"
        class="max-w-sm"
      />
    </UFormGroup>
    <UButton
      @click="removeItem"
      :padded="false"
      color="gray"
      variant="link"
      icon="i-heroicons-x-mark-20-solid"
      class="hidden pt-6 cursor-pointer sm:flex hover:text-red-600"
      title="Termék eltávolítása"
    />
    <UButton
      @click="removeItem"
      label="Termék eltávolítása"
      :padded="false"
      color="gray"
      variant="link"
      class="block cursor-pointer hover:font-bold hover:text-red-500 sm:hidden"
      title="Termék eltávolítása"
    >
      <template #leading>
        <Icon name="heroicons:x-mark-20-solid" size="18" />
      </template>
    </UButton>
  </div>
</template>
