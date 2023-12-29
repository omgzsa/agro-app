<template>
  <div>
    <div v-for="(item, index) in formItems" :key="index">
      <ProductForm
        :product="item.product"
        :amount="item.amount"
        :packaging="item.packaging"
        :products="products"
        :packagingOptions="packagingOptions"
        @updateProduct="updateProduct(index, $event)"
        @updateAmount="updateAmount(index, $event)"
        @updatePackaging="updatePackaging(index, $event)"
      />
      <button @click="removeItem(index)">Remove</button>
    </div>
    <button @click="addItem">Add Product</button>
    <pre>
      {{ formItems }}
    </pre>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
// import ProductForm from '@/components/ProductForm.vue';

const products = ref(['Product 1', 'Product 2', 'Product 3']);
const packagingOptions = ref(['Bag', 'Bulk', 'Big Bag']);

const formItems = ref([
  { product: 'Product 1', amount: 2, packaging: 'Bag' },
  { product: 'Product 2', amount: 1, packaging: 'Bulk' },
]);

const addItem = () => {
  formItems.value.push({ product: '', amount: 0, packaging: '' });
};

const removeItem = (index) => {
  formItems.value.splice(index, 1);
};

const updateProduct = (index, value) => {
  formItems.value[index].product = value;
};

const updateAmount = (index, value) => {
  formItems.value[index].amount = value;
};

const updatePackaging = (index, value) => {
  formItems.value[index].packaging = value;
};
</script>
