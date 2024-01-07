export default defineNuxtRouteMiddleware(async (to, from) => {
  const { partnerRole, salesRole } = useRuntimeConfig().public;
  const user = useDirectusUser();
  const isLoggedIn = user.value !== null;

  // Check user role and disallow access to sales page if not sales
  if (user.value?.role === partnerRole && isLoggedIn) {
    return navigateTo('/partner');
  }

  if (user.value?.role === salesRole && isLoggedIn) {
    return navigateTo('/uzletkoto');
  }
});
