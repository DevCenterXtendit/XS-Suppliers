<template>
  <q-btn
    @click="setTheme"
    :icon="icon"
    :size=size
    dense
    flat
    round
   >
  </q-btn>
</template>

<script setup>
import {useQuasar} from 'quasar'
import {computed} from 'vue'

defineProps({
  size: {
    type: String,
    default: 'md'
  }
});

const $q = useQuasar();

function setTheme() {
 $q.dark.toggle();
 localStorage.setItem('theme', $q.dark.isActive ? 'dark' : 'light');
}

const icon = computed(() => {
 return $q.dark.mode ? 'wb_sunny' : 'nights_stay'
})

</script>
