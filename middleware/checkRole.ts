export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetchUser, setUser } = useDirectusAuth();
  const user = useDirectusUser();
  const { partnerRole, salesRole } = useRuntimeConfig().public;

  if (!user.value) {
    const user = await fetchUser();
    setUser(user.value);
  }

  const isSalesPage = to.path.startsWith('/uzletkoto');

  // Check user role and disallow access to sales page if not sales
  if (user.value?.role === partnerRole && isSalesPage) {
    return navigateTo(from.path);
  } else return;
});
