import { reactive } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { authenticate } from 'src/core/services/authService';
import { useRouter } from 'vue-router';

const useAuth = () => {

  const authStore = useAuthStore();
  const router = useRouter();

  const auth = reactive({
    email:'',
    password:''
  });

  const { userLogged, isLoggedIn } = useAuthStore();

  const handleLogin = async () => {
    const userResp = await authenticate(auth);

    let userLogged = {
      name: userResp.name,
      lastNames: userResp.lastNames,
      email: userResp.email,
      companyType: userResp.companyType
    }

    authStore.login(userLogged, userResp.token);
    router.push('/');
  }

  const handleLogout = () => {
    authStore.logout();
    router.push('/login');
  }

  return {
    auth,
    userLogged,
    isLoggedIn,

    handleLogin,
    handleLogout
  }
}

export default useAuth;
