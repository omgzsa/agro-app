<script setup>
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  // middleware: ['is-partner'],
});

const store = useAuthStore();

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

    <!-- featured -->
    <UserFeatured>
      <UserFeaturedItem
        icon="heroicons:shopping-bag"
        title="Rendelések száma"
        value="&mdash;"
      />
      <UserFeaturedItem
        icon="heroicons:user-group"
        title="Webshopban aktív partnerek"
        value="&mdash;"
      />
      <UserFeaturedItem
        icon="heroicons:light-bulb"
        title="Népszerű termékeim"
        value="&mdash;"
      />
    </UserFeatured>
  </div>
</template>
