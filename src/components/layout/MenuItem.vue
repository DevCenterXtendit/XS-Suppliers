<template>
  <q-expansion-item
    v-if="hasChildren"
    :to="item.to"
    exact
    class="q-px-sm"
    active-class="text-secondary"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon
          :name="item.icon"
          color="grey-13"
        />
      </q-item-section>
      <q-item-section>
        {{ item.label }}
      </q-item-section>
    </template>
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
    active-class="text-secondary"
  >
    <q-item-section avatar>
      <q-icon
        :name="item.icon"
        color="grey-13"
      />
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
