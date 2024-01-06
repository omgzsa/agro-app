export default defineNuxtRouteMiddleware(async (to, from) => {
  const { partnerRole, salesRole } = useRuntimeConfig().public;
  const user = useDirectusUser();

  const isLoggedIn = user.value !== null;

  if (user.value?.role === salesRole && isLoggedIn) {
    await navigateTo(`/uzletkoto/SZZ-szendrei-zoltan`);
  }

  if (user.value?.role === partnerRole && isLoggedIn) {
    await navigateTo(`/partner/SJ-suki-jozsefne`);
  }
});
