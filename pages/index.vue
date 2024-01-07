<script setup>
import { useAuthStore } from '@/stores/auth';
const { partnerRole, salesRole } = useRuntimeConfig().public;
const router = useRouter();

definePageMeta({
  // middleware: 'to-index',
});

const store = useAuthStore();
const directus_user = useDirectusUser();

const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  return errors;
};

async function onSubmit(event) {
  // Do something with data
  console.log(event.data);
  store.userLogin(event.data);
}

watch(
  () => directus_user.value,
  (user) => {
    if (user) {
      if (user.role === partnerRole) {
        router.push({
          path: `/partner`,
          replace: true,
        });
      } else if (user.role === salesRole) {
        router.push({
          path: `/uzletkoto`,
          replace: true,
        });
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="grid h-screen place-content-center">
    <UContainer class="space-y-12" v-if="!directus_user">
      <img
        src="assets/images/agrofeed-logo-login.webp"
        class="w-[200px] mx-auto"
        width="200"
        height="57"
      />
      <div class="max-w-lg">
        <UForm
          :validate="validate"
          :state="state"
          @submit="onSubmit"
          class="space-y-6"
        >
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Jelszó" name="password" required>
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <p>
            Aktív Agrofeed partner szerződéssel rendelkezők jelentkezhetnek be a
            szerződésben megadott email címükkel. Ha nem tud bejelentkezni
            keresse ügyfélszolgálatunkat.
          </p>

          <UButton title="Bejelentkezés" type="submit" size="xl">
            Bejelentkezés
          </UButton>
        </UForm>
      </div>
    </UContainer>
    <UContainer class="space-y-8 text-center" v-else>
      <img
        src="assets/images/agrofeed-logo-login.webp"
        class="w-[200px] mx-auto"
        width="200"
        height="57"
      />
      <div v-if="directus_user" class="space-y-6">
        <Icon name="svg-spinners:6-dots-rotate" class="w-8 h-8 mx-auto" />
        <p>
          Üdvözöljük, {{ directus_user.first_name }}
          {{ directus_user.last_name }}
        </p>
      </div>
    </UContainer>
  </div>
</template>
