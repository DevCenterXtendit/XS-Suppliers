<template>
  <q-layout view="hHh lpR lfr">
    <layout-header  @toggle-drawer="toggleDrawer"/>
    <sidebar ref="sidebarComponent"></sidebar>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-transparent text-right text-primary">
      <span class="text-caption q-px-sm text-grey-8 ">Xtendit Suite — Gestión de Proveedores</span>
    </q-footer>

  </q-layout>

</template>

<script setup>
import { ref } from 'vue'
//components layout
import Sidebar from 'src/components/layout/SideBar.vue';
import LayoutHeader from '../components/layout/LayoutHeader.vue'

const sidebarComponent = ref(null);

function toggleDrawer() {
  sidebarComponent.value.toggleDrawer();
}
</script>
