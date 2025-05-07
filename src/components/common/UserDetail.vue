<template>

  <q-item
    class="q-pa-md">
    <q-item-section avatar>
      <q-avatar
        color="blue-grey-4"
        text-color="white">
        {{ nameInitials }}
      </q-avatar>
    </q-item-section>
    <q-item-section class="q-pa-xs">
      <q-item-label lines="1" class="text-weight-bold" >{{ name }}  {{ lastName }} </q-item-label>
      <q-item-label caption lines="1">{{ userInfo }}</q-item-label>
    </q-item-section>
  </q-item>

</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'test'
  },
  lastName: {
    type: String,
    default: 'test'
  },
  userInfo: {
    type: String,
    default: 'test'
  },
});

const nameInitials = computed(() => {
  return  props.name.substring(0,1) + props.lastName.substring(0,1);
})

</script>
