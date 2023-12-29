<!-- ProductForm.vue -->
<template>
  <div>
    <label>Product:</label>
    <select v-model="localProduct" @change="updateProduct">
      <option v-for="product in products" :key="product" :value="product">
        {{ product }}
      </option>
    </select>

    <label>Amount:</label>
    <input type="number" v-model="localAmount" @input="updateAmount" />

    <label>Packaging:</label>
    <select v-model="localPackaging" @change="updatePackaging">
      <option
        v-for="packaging in packagingOptions"
        :key="packaging"
        :value="packaging"
      >
        {{ packaging }}
      </option>
    </select>

    <hr />
  </div>
</template>

<script setup>
// import { ref, defineProps, defineEmits } from 'vue';

const { product, amount, packaging } = defineProps([
  'product',
  'amount',
  'packaging',
]);
const emitUpdate = defineEmits([
  'updateProduct',
  'updateAmount',
  'updatePackaging',
]);

const localProduct = ref(product);
const localAmount = ref(amount);
const localPackaging = ref(packaging);

const updateProduct = () => {
  emitUpdate('updateProduct', localProduct.value);
};

const updateAmount = () => {
  const newAmount = Math.max(0, parseInt(localAmount.value) || 0);
  localAmount.value = newAmount.toString();
  emitUpdate('updateAmount', newAmount);
};

const updatePackaging = () => {
  emitUpdate('updatePackaging', localPackaging.value);
};
</script>
