<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import useDarkTheme from './core/composables/common/useDarkTheme';
import useNotification from './core/composables/common/useNotification';

const {
  loadUserTheme
} = useDarkTheme()

useNotification();

onMounted(() => {
  loadUserTheme();
});

</script>
