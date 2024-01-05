<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <!-- <template #header> IS SOMEBODY THERE? </template> -->
      <NuxtPage :page-key="(route) => route.fullPath" />
      <!-- <template #footer> AND HERE?! </template> -->
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
