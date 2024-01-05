import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => {
  // state
  const user = useDirectusUser();

  // functions/actions

  // computed/getters
  const isLoggedIn = computed(() => !!user.value);
  const fullName = computed(
    () => user.value?.last_name + ' ' + user.value?.first_name
  );

  return { user, isLoggedIn, fullName };
});
