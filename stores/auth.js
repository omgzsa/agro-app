import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter();
  const { login, logout } = useDirectusAuth();

  // state
  const logError = ref(null);

  // actions = functions
  async function userLogin(credentials) {
    try {
      await login(credentials);
      console.log('Logged in successfully');
      // router.push('/partner/0032-agro-m-zrt-');
    } catch (err) {
      err = createError({
        statusCode: err.statusCode,
        message: 'Hibás felhasználónév vagy jelszó!',
      });
      logError.value = err;
    }
  }

  async function userLogout() {
    await logout();
    console.log('Logged out');
    router.push('/');
  }

  // getters = computed properties

  return {
    logError,
    userLogin,
    userLogout,
  };
});
