import { onMounted, onUnmounted } from 'vue';
import { Notify } from 'quasar';
import { bus } from 'src/core/common/global-event-bus';

const useNotification = () => {
  const showNotification = ({ message, color, icon }) => {
    Notify.create({ message, color, icon });
  }

  onMounted(() => {
    bus.on('notify', showNotification);
  });
  onUnmounted(() => {
    bus.off('notify', showNotification);
  });
}

export default useNotification;
