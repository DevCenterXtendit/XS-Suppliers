<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    $q.dark.set(true)
  } else if (savedTheme === 'light') {
    $q.dark.set(false)
  }
})
</script>
