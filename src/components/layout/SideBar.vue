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
  <user-detail
    :name="userLogged.name"
    :lastName="userLogged.lastNames"
    :userInfo="userLogged.email"
  />

  <!-- Scroll area para navegación -->
  <q-scroll-area
    class="col"
    :horizontal-thumb-style="{ opacity: 0 }">
    <q-list>
      <MenuItem
        v-for="entry in filteredMenu"
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
import useAuth from "src/core/composables/auth/useAuth";

import UserDetail from '../common/UserDetail.vue';

const {
  userLogged,
  filteredMenu
} = useAuth()

const drawer = ref(false)

function toggleDrawer () {
  drawer.value = !drawer.value
}

// function filterMenuByPermissions(menuList, permissions) {
//   const allowedModules = new Set(
//     permissions
//       .filter(p => p.name === 'View')
//       .map(p => p.moduleName.toLowerCase())
//   );

//   const filterRecursive = (items) => {
//     return items
//       .map(item => {
//         // Si el menú es público, déjalo
//         if (item.public || item.name === 'dashboard') {
//           return item;
//         }
//         if (item.children) {
//           const filteredChildren = filterRecursive(item.children);
//           if (filteredChildren.length > 0) {
//             return { ...item, children: filteredChildren };
//           }
//         }
//         if (item.name && allowedModules.has(item.name.toLowerCase())) {
//           return item;
//         }
//         return null;
//       })
//       .filter(Boolean);
//   };

//   return filterRecursive(menuList);
// }

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

