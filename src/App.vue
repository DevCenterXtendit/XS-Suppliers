<template>
  <router-view />
</template>

<script setup>
import useNotification from './core/composables/common/useNotification';

useNotification();

</script>
