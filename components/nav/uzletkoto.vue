<script setup>
defineProps({
  id: [Number, String],
  name: String,
});

import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const isDynamicPartnerRoute = ref(false);

const checkPartnerRoute = () => {
  // Get the current route
  const route = useRoute();

  // Check if the current route is a dynamic partner route
  isDynamicPartnerRoute.value =
    route.path.startsWith('/uzletkoto/partnereim/') &&
    route.params.id !== undefined &&
    route.params.name !== undefined;
};

// Watch for route changes
watch(useRoute, checkPartnerRoute);

// Call the checkPartnerRoute function on component mount
onMounted(checkPartnerRoute);
</script>

<template>
  <UContainer>
    <nav class="grid py-16 place-content-center">
      <!-- <DarkMode /> -->
      <ul class="flex flex-wrap items-center gap-x-4 gap-y-6">
        <li>
          <ULink
            :to="`/uzletkoto`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Irányítópult
          </ULink>
        </li>
        <li>
          <ULink
            :to="`/uzletkoto/partnereim`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Partnereim
          </ULink>
        </li>
        <li v-if="isDynamicPartnerRoute">
          <ULink
            :to="`/uzletkoto/partnereim/${id}-${name}/uj-rendeles`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Új rendelés
          </ULink>
        </li>
        <!-- <li>
          <ULink
            :to="`/uzletkoto/rendeleseim`"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Rendeléseim
          </ULink>
        </li> -->
        <!-- <li>
          <ULink
            to="/uzletkoto/sajat-rendeles"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Saját rendelés
          </ULink>
        </li> -->
        <!-- <li>
          <ULink
            to="https://afshop.previsionlab.hu/iranyitopult/segitsegnyujtas-uzletkoto/"
            active-class="text-white bg-agro-100"
            inactive-class="text-gray-800 bg-yellow-400 hover:bg-yellow-300"
            class="px-4 py-2 text-sm font-bold rounded-full"
          >
            Segítségnyújtás
          </ULink>
        </li> -->
      </ul>
    </nav>
  </UContainer>
</template>

<style></style>
