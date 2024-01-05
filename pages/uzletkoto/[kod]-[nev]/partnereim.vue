<script setup>
import partnerek from '@/assets/bk-partnerek.json';
definePageMeta({
  // middleware: ['auth', 'is-partner'],
});

const user = ref({ name: 'Bolla Kálmán', kod: 'BK', bc: 243 });
</script>

<template>
  <div>
    <!-- header -->
    <UserHeader
      title="Webshop irányítópult"
      :name="user.name"
      :is-visible="true"
    />
    <!-- nav -->
    <NavUzletkoto :name="user.name" :kod="user.kod" />

    <!-- partners -->
    <UserPartners title="Partnereim" :partners="partnerek" />
  </div>
</template>
