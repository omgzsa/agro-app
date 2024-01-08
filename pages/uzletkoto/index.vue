<script setup>
const directus_user = useDirectusUser();
const base_url = useDirectusUrl();

definePageMeta({
  middleware: ['auth', 'check-role'],
});

const { data: user } = await useFetch(
  `${base_url}/users/${directus_user.value.id}?fields=first_name,last_name,uzletkoto.*`
);

const { data: sales } = await useFetch(
  `${base_url}/items/uzletkoto/${user.value.data.uzletkoto[0].uzletkoto_uzletkotokod}`
);

// console.log(sales.value.data);
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
