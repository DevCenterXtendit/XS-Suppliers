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

  const { userLogged,
          permissions,
          isLoggedIn,
          filteredMenu
        } = authStore;

  const handleLogin = async () => {
    const userResp = await authenticate(auth);

    let userLogged = {
      name: userResp.name,
      lastNames: userResp.lastNames,
      email: userResp.email,
      companyType: userResp.companyType
    }

    authStore.login(userLogged, userResp.token, userResp.userPermissions);
    router.push('/');
  }

  const handleLogout = () => {
    authStore.logout();
    router.push('/login');
  }

  const getPermissionsByModules = (moduleNames = []) => {
    if (!Array.isArray(moduleNames) || moduleNames.length === 0) {
      return permissions;
    }
    return permissions.filter(permission =>
      moduleNames.includes(permission.moduleName)
    );
  }

  return {
    auth,
    userLogged,
    isLoggedIn,
    filteredMenu,

    handleLogin,
    handleLogout,
    getPermissionsByModules
  }
}

export default useAuth;
