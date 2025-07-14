<template>
 <q-drawer
  v-model="drawer"
  show-if-above
  :width="260"
  :breakpoint="1280"
  bordered
  class="bg-sidebar column no-wrap"
>
  <!--User deta-->
  <user-detail style="height: 80px;"
    :name="userLogged.name"
    :lastName="userLogged.lastNames"
    :userInfo="userLogged.email"
  />

  <!-- Scroll area para navegación -->
  <q-scroll-area
    class="col q-mt-sm"
    :horizontal-thumb-style="{ opacity: 0 }">
    <q-list>
      <MenuItem
        v-for="entry in menu"
        :key="entry.name"
        :item="entry"
      />
    </q-list>

  </q-scroll-area>
</q-drawer>
</template>

<script setup>
import { ref } from 'vue';
import MenuItem from './MenuItem.vue';
import menu from '../../core/menu.js';
import useAuth from "src/core/composables/auth/useAuth";

import UserDetail from '../common/UserDetail.vue';

const {
  userLogged
} = useAuth()

const drawer = ref(false)

function toggleDrawer () {
  drawer.value = !drawer.value
}

defineExpose({
  toggleDrawer
});
</script>

<style lang="scss">
.body--light {
  .bg-sidebar {
    background-color: #212631;
     color: #fff;
  }

  .active-menu {
    background-color: $primary;
    color: #fff;
  }
}

.body--dark {
  .bg-sidebar {
    background-color: #212631;
  }
  .active-menu {
    background-color: $d-primary;
    color: #fff;
  }
}

</style>

