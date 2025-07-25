// src/core/composables/useDarkTheme.js
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { storageService } from 'src/core/services/storageService';
import { KEYS } from 'src/core/constants/storageKeys';

const useDarkTheme = () => {
  const $q = useQuasar();

  const isDarkActive = computed(() => $q.dark.isActive);

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const loadUserTheme = () => {
    let savedTheme = storageService.getItem(KEYS.theme, false);

    if (!savedTheme) {
      savedTheme = getSystemTheme();
      storageService.setItem(KEYS.theme, savedTheme, false);
    }

    $q.dark.set(savedTheme === 'dark');
  };

  const toggleTheme = () => {
    const newTheme = isDarkActive.value ? 'light' : 'dark';
    $q.dark.set(newTheme === 'dark');
    storageService.setItem(KEYS.theme, newTheme, false);
  };

  return {
    isDarkActive,
    loadUserTheme,
    toggleTheme,
  };
};

export default useDarkTheme;
