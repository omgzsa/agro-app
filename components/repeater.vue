<script setup>
const products = [
  'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
  'Szójadara II.o.46%',
  'AF-4300-Tox/E/AP Tt csibe 4%',
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
});

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
    <UForm :state="state" @submit="onSubmit" class="py-4">
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
        <UButton type="submit">Rendelés elküldése</UButton>
      </div>
    </UForm>
  </div>
</template>
