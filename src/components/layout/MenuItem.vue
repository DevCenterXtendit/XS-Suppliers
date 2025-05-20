<template>
  <q-expansion-item
    v-if="hasChildren"
    :icon="item.icon"
    :label="item.label"
    :to="item.to"
    exact
    class="q-px-sm"
  >
    <template #expand-icon>
      <q-icon name="expand_more" />
    </template>

    <MenuItem
      v-for="child in item.children"
      :key="child.name"
      :item="child"
      class="q-ml-sm"
    />
  </q-expansion-item>

  <q-item
    v-else
    clickable
    v-ripple
    :to="item.to"
    exact
    class="q-px-lg"
  >
    <q-item-section avatar>
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section>
      {{ item.label }}
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const hasChildren = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0)
</script>

<style scoped>
.q-item {
  border-radius: 8px;
}
</style>
