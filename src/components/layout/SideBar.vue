<template>
 <q-drawer
  v-model="drawer"
  show-if-above
  :width="260"
  :breakpoint="1280"
  class="bg-sidebar column no-wrap"
>
  <!-- Logo fijo en la parte superior -->
  <div class="q-py-md flex flex-center">
    <q-img
      src="../../assets/logo-xtendit-white.png"
      style="max-height: 60px; max-width: 180px"
      contain
    />
  </div>

  <!-- Scroll area para navegación -->
  <q-scroll-area class="col" :horizontal-thumb-style="{ opacity: 0 }">
    <q-list>
      <template v-for="(menuItem, index) in menu" :key="index">
        <q-item
          :to="menuItem.to"
          :dense="$q.platform.is.mobile"
          class="q-my-xs q-mx-sm navigation-menu navigation-menu-hover"
          clickable
          v-ripple
          active-class="active-menu"
          :exact="index === 0"
        >
          <q-item-section avatar>
            <q-icon color="grey-13" :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</q-drawer>
</template>

<script setup>
import { ref } from 'vue'
import menu from '../../core/menu.js';

const drawer = ref(false)

function toggleDrawer () {
  drawer.value = !drawer.value
}

defineExpose({
  toggleDrawer
});
</script>

<style lang="scss">
.navigation-menu {
  min-height: 40px !important;
  border-radius: 8px;
}

.body--light {
  .bg-sidebar {
    background-color: #eee;
  }

  .active-menu {
    background-color: $primary;
    color: #fff;
    border-radius: 8px;
  }

  .navigation-menu-hover {
    &:not(.active-menu):hover{
      background-color: #0404971b;
      border-radius: 8px;
    }
  }
}

.body--dark {
  .bg-sidebar {
    background-color: #212631;
  }
  .active-menu {
    background-color: $d-primary;
    color: #fff;
    border-radius: 8px;
  }

  .navigation-menu-hover {
    &:not(.active-menu):hover{
      background-color: #05daff00;
      color: #fff;
      border-radius: 8px;
    }
  }
}

</style>

