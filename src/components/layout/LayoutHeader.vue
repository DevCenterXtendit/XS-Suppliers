<template>
  <q-header>
    <q-toolbar class="bg-topbar">
      <q-btn dense
        flat
        round
        icon="menu"
        @click="$emit('toggle-drawer')"
      />
      <q-space></q-space>
      <theme-btn class="q-mr-xs"></theme-btn>
      <q-btn
        dense
        flat
        icon="eva-more-vertical-outline"
        round
      >
        <q-menu class="no-shadow"
          style="border:1px solid rgba(0, 0, 0, 0.12); max-width: 202px;">
          <q-list class="no-shadow" style="min-width: 200px;">
            <q-item clickable>
              <q-item-section side>
                <q-avatar rounded icon="eva-log-out-outline" style="font-size: 35px;" />
              </q-item-section>
              <q-item-section
                @click="handleLogout">
                Cerrar Sesión
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
//components
import ThemeBtn from '../../components/common/ThemeBtn.vue';

</script>
