export const usePartnerStore = defineStore('partnerStore', () => {
  // state
  const user = useDirectusUser();
  const base_url = useDirectusUrl();

  // functions/actions

  // computed/getters
  const isLoggedIn = computed(() => !!user.value);
  const fullName = computed(
    () => user.value?.last_name + ' ' + user.value?.first_name
  );

  return { user, isLoggedIn, fullName };
});
