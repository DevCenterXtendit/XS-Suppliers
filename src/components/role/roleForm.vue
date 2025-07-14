<template>
  <dialog-form v-model="openRoleForm" :width="600">
    <template #header>
      {{ `${role.id > 0 ? "Editar" : "Agregar"} Rol` }}
    </template>
    <template #content>
      <q-form id="roleForm" @submit.prevent="handleSaveRole">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="role.name"
              dense
              label="Nombre del rol"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="supervisor_account" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="role.description"
              dense
              label="Descripcion"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="notes" />
              </template>
            </q-input>
          </div>

        </div>
      </q-form>
    </template>
    <template #actions>
      <q-btn unelevated no-caps
        color="primary"
        form="roleForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue'
import useRole from 'src/core/composables/role/useRole';

const {
  role,
  openRoleForm,
  handleSaveRole
} = useRole();

</script>
