<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <template #header>
        <UButton @click="auth.userLogout()" variant="ghost"> Logout </UButton>
      </template>
      <NuxtPage :page-key="(route) => route.fullPath" />
      <!-- <template #footer> AND HERE?! </template> -->
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
