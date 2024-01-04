import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  const user = useDirectusUser();
  const router = useRouter();
  // state

  // actions = functions
  async function userLogin(credentials) {
    const { login } = useDirectusAuth();
    try {
      await login(credentials);
      alert('Logged in successfully');
      router.push('/partner/0032-agro-m-zrt-');
    } catch (err) {
      err = createError({
        statusCode: err.statusCode,
        message: 'Hibás felhasználónév vagy jelszó!',
      });
      logError.value = err;
    }
  }

  async function userLogout() {
    const { logout } = useDirectusAuth();
    await logout();
    router.push('/');
  }

  // getters = computed properties
  const isLoggedIn = computed(() => !!user.value);

  return {
    isLoggedIn,
    userLogin,
    userLogout,
  };
});
