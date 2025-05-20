<template>
  <q-dialog
    persistent
    :maximized="isMobile"
    :transition-show="isMobile ? 'slide-up' : 'fade'"
    :transition-hide="isMobile ? 'slide-down' : 'fade'"
    v-model="isOpen">
    <q-card flat :style="isMobile ? null : { width: `${width}px`, maxWidth: '80vw' }">
      <q-card-section class="row items-center q-pa-sm">
        <q-space/>
        <div class="text-subtitle1 text-uppercase" caps-only>
          <slot name="header"></slot>
        </div>
        <q-space />
        <q-btn icon="close" flat round
          size="md"
          dense
          v-close-popup />
      </q-card-section>
      <q-card-section :class="isMobile ? 'q-pa-md': 'q-px-md'">
        <slot name="content" ></slot>
      </q-card-section>
      <q-card-actions align="right" class="q-px-md">
        <slot name="actions"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {ref, computed, toRefs } from 'vue';
import {useQuasar} from 'quasar'

//vue js variables
const props = defineProps({
  value: {
    type: Boolean,
    default:false
  },
  width: {
    type: Number,
    default: 500
  },
});

const emit = defineEmits(['input']);
const $q = useQuasar()

//variables
const { value } = toRefs(props);
const isMobile =  ref($q.platform.is.mobile ? true : false)

const isOpen = computed({
  get() {
    return value.value;
  },
  set(newValue) {
    emit('input', newValue )
  }
});

</script>
