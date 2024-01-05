<script setup>
import { useUserStore } from '@/stores/user';
const { getUserById } = useDirectusUsers();

definePageMeta({
  middleware: ['auth', 'check-role'],
});

const store = useUserStore();

const user = ref({ name: 'Bolla Kálmán', kod: 'BK', bc: 243 });

const { data } = await useAsyncData('barmi', () =>
  getUserById({
    id: store.user.id,
    params: {
      fields: ['uzletkoto.*'],
    },
  })
);
/*
TODOS:
- get correct user data with relations
- implement user data to page
- share data to components
*/

console.log(data.value);
</script>

<template>
  <div>
    <!-- header -->
    <UserHeader
      title="Webshop irányítópult"
      :name="store.fullName"
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
