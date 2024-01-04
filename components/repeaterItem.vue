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

const measureValue = toRef(measure, 'measure');

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
  <div class="flex flex-row items-center gap-6">
    <UFormGroup label="Termék">
      <USelectMenu
        searchable
        searchable-placeholder="Termék keresése"
        placeholder="Termék kiválasztása"
        :value="product"
        @update:modelValue="updateProduct"
        :options="products"
        class="w-96"
        :model-value="product"
      />
    </UFormGroup>
    <UFormGroup label="Mennyiség (kg)">
      <!-- <UInput
        :value="measure"
        @update:modelValue="updateMeasure"
        type="number"
        :min="1"
      /> -->
      <UInput
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
      />
    </UFormGroup>
    <UFormGroup label="Kiszerelés">
      <USelect
        :value="packaging"
        @update:modelValue="updatePackaging"
        :options="packagingOptions"
      />
    </UFormGroup>
    <Icon
      @click="removeItem"
      name="heroicons:minus-circle-16-solid"
      class="mt-6 cursor-pointer"
    />
  </div>
</template>
