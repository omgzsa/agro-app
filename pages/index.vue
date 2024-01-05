<script setup>
import { useAuthStore } from '@/stores/auth';

const store = useAuthStore();
const user = useDirectusUser();

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
</script>

<template>
  <div class="grid h-screen place-content-center">
    <UContainer class="space-y-12">
      <img
        src="assets/images/agrofeed-logo-login.webp"
        class="w-[200px] mx-auto"
        width="200"
        height="57"
      />
      <div v-if="user">hello {{ user.email }}</div>
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
      <UButton @click="store.userLogout">Logout</UButton>
    </UContainer>
  </div>
</template>
