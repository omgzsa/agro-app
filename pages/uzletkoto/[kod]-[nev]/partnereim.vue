<script setup>
import partnerek from '@/assets/bk-partnerek.json';
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
    <NavUzletkoto :name="sales.data.nev" :kod="sales.data.uzletkotokod" />

    <!-- partners -->
    <UserPartners title="Partnereim" :partners="partnerek" />
  </div>
</template>
