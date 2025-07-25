<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import useDarkTheme from './core/composables/common/useDarkTheme';

const {
  loadUserTheme
} = useDarkTheme()

onMounted(() => {
  loadUserTheme();
});

</script>
