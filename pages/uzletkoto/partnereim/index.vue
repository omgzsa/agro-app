<script setup>
const directus_user = useDirectusUser();

definePageMeta({
  middleware: ['auth', 'check-role'],
});

const { data: user } = await useFetch(
  `https://admin.agrofeed.eu/users/${directus_user.value.id}?fields=first_name,last_name,uzletkoto.*`
);

const { data: sales } = await useFetch(
  `https://admin.agrofeed.eu/items/uzletkoto/${user.value.data.uzletkoto[0].uzletkoto_uzletkotokod}`
);

// const { data: ugyfel } = await useAsyncData('ugyfel', () => {
//   getItems({
//     collection: 'ugyfel',
//     params: {
//       filter: {
//         _or: [
//           { uzletkotokod1: { _eq: 'SZZ' } },
//           { uzletkotokod2: { _eq: 'SZZ' } },
//         ],
//       },
//     },
//   });
// });

const { data: ugyfel } = await useFetch(
  `https://admin.agrofeed.eu/items/ugyfel?filter[_or][0][uzletkotokod1][_eq]=${sales.value.data.uzletkotokod}&filter[_or][1][uzletkotokod2][_eq]=${sales.value.data.uzletkotokod}`
);
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
    <UserPartners title="Partnereim" :partnereim="ugyfel.data" />
  </div>
</template>
