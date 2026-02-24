import { onMounted, onUnmounted } from 'vue';
import { bus } from 'src/core/common/global-event-bus';
import useAuth from '../auth/useAuth';

const useLogoutHandler = () => {
  const { handleLogout } = useAuth();

  const onLogout = () => {
    handleLogout();
  }

  onMounted(() => {
    bus.on('logout', onLogout);
  });
  
  onUnmounted(() => {
    bus.off('logout', onLogout);
  });
}

export default useLogoutHandler;
