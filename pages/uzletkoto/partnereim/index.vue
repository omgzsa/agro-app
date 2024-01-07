<script setup>
import partnerek from '@/assets/bk-partnerek.json';
const directus_user = useDirectusUser();
const { getItems } = useDirectusItems();

definePageMeta({
  middleware: ['auth', 'check-role'],
});

const { data: user } = await useFetch(
  `https://admin.agrofeed.eu/users/${directus_user.value.id}?fields=first_name,last_name,uzletkoto.*`
);

const { data: sales } = await useFetch(
  `https://admin.agrofeed.eu/items/uzletkoto/${user.value.data.uzletkoto[0].uzletkoto_uzletkotokod}`
);

// filter by üzletkotokod

const { data: ugyfel } = await useFetch(
  `https://admin.agrofeed.eu/items/ugyfel?filter[uzletkotokod1][_eq]=${user.value.data.uzletkoto[0].uzletkoto_uzletkotokod}`
);

const myugyfelz = await getItems({
  collection: 'ugyfel',
  params: {
    filter: {
      _or: [
        { uzletkotokod1: { _eq: 'SZZ' } },
        { uzletkotokod2: { _eq: 'SZZ' } },
      ],
    },
  },
});

console.log(myugyfelz);
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

    <!-- partners -->
    <UserPartners title="Partnereim" :partners="partnerek" />
  </div>
</template>
