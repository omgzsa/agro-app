<script setup>
definePageMeta({
  // middleware: ['auth', 'is-partner'],
});

const user = ref({ name: 'Bolla Kálmán', kod: 'BK', bc: 243 });

const orders = [
  {
    szamlaszam: 'AF2300029',
    vevokod: 78,
    termekkod: 'K3462',
    datum: '2023-01-01',
    kelte: '2023-01-10',
    leiras: 'AF-4322-OC/Fit/E/Tox/AP tt 2,5',
    mennyiseg: 2975,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'Á3221',
    datum: '2023-02-06',
    kelte: '2023-02-09',
    leiras: 'Vivafat (Quality fat)',
    mennyiseg: 1200,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K6821',
    datum: '2023-04-07',
    kelte: '2023-04-10',
    leiras: 'AS-2625-P/NSP vemhes koca premix 3%',
    mennyiseg: 2010,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'E0254',
    datum: '2023-01-12',
    kelte: '2023-01-15',
    leiras: 'Arbocell RC Fine',
    mennyiseg: 1020,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K7080',
    datum: '2023-02-08',
    kelte: '2023-02-11',
    leiras: 'AS-2516-P/NSP+ Szoptató koca px 4%',
    mennyiseg: 960,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K7396',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AS-2403-P/NSP Süldő/Hízó premix 2,5%',
    mennyiseg: 975,
    mertekegyseg: 'kg',
  },
  {
    szamlaszam: 'AF2300030',
    vevokod: 81,
    termekkod: 'K8078',
    datum: '2023-01-06',
    kelte: '2023-01-09',
    leiras: 'AS-2627-P+/NSP búgató koca premix 4%',
    mennyiseg: 960,
    mertekegyseg: 'kg',
  },
];
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
    <!-- orders -->
    <UserOrders title="Rendeléseim" :orders="orders" />
  </div>
</template>
