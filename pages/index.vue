<script setup>
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
}
</script>

<template>
  <div class="grid place-content-center h-screen">
    <div class="space-y-12">
      <img
        src="assets/images/agrofeed-logo-login.webp"
        class="w-[200px] mx-auto"
        width="200"
        height="57"
      />
      <div class="w-[500px]">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-6"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Jelszó" name="password" required>
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <p>
            Aktív Agrofeed partner szerződéssel rendelkezők jelentkezhetnek be,
            a szerződésben megadott email címükkel. Ha nem tud bejelentkezni
            kattintson ide a segítségért.
          </p>

          <UButton type="submit"> Bejelentkezés </UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>
