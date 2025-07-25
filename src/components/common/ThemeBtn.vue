<template>
  <q-btn
    @click="toggleTheme"
    :icon="icon"
    :size=size
    dense
    flat
    round
   >
  </q-btn>
</template>

<script setup>
import {computed} from 'vue'
import useDarkTheme from 'src/core/composables/common/useDarkTheme';

defineProps({
  size: {
    type: String,
    default: 'md'
  }
});

const {
  isDarkActive,
  toggleTheme
} = useDarkTheme()

const icon = computed(() => {
 return isDarkActive.value ? 'wb_sunny' : 'nights_stay'
})

</script>
