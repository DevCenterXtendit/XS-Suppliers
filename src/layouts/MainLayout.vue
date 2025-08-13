<template>
  <q-layout view="lHh Lpr lff">
    <layout-header  @toggle-drawer="toggleDrawer"/>
    <sidebar ref="sidebarComponent"></sidebar>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      class="bg-transparent text-right">
      <span class="text-caption q-px-sm text-grey-8 ">{{ new Date().getFullYear() }} Xtendit Suite — Gestión de Proveedores</span>
    </q-footer>

  </q-layout>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from 'src/components/layout/SideBar.vue';
import LayoutHeader from '../components/layout/LayoutHeader.vue'
import useAuth from 'src/core/composables/auth/useAuth';
import { bus } from 'src/core/common/global-event-bus';

const { handleLogout } = useAuth()

const sidebarComponent = ref(null);

function toggleDrawer() {
  sidebarComponent.value.toggleDrawer();
}

const onLogout = () => {
  handleLogout();
}

onMounted(() => {
  bus.on('logout', onLogout);
})
onUnmounted(() => {
  bus.off('logout', onLogout)
})

</script>
