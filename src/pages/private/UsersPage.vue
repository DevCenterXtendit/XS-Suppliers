<template>
  <q-page class="q-pa-md">
    <div>Usuarios</div>
    <div>routa/routa/routa</div>
    <q-card flat
      class="row q-pa-md"
      :class="$isMobile ? 'q-mb-md' : 'q-my-md'"
    >
      <div class="col-8 col-sm-6">
        <q-input
          dense
          clearable
          outlined
          rounded
          color="secondary"
          placeholder="Buscar"
          v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-4 col-sm-6 flex justify-end">
        <q-btn
          no-caps
          unelevated
          color="primary"
          label="Nuevo"
        />
      </div>
    </q-card>

    <q-card
      flat
      class="q-mt-md">
      <q-card-section class="">
        <q-table
          bordered
          flat
          :filter="filter"
          :rows="users"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge class="q-px-sm" rounded
              :color="props.value ? 'positive' : 'negative'"
              :label="props.value ? 'Activo' : 'Inactivo' " />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense
              flat
              color="grey-7"
              icon="edit"
              @click="getUser(props.row.id)"
            />
            <q-btn dense
              flat
              color="grey-7"
              class="q-ml-sm"
              icon="delete"
            />
          </q-td>
        </template>
        </q-table>
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script setup>
import {ref, onMounted } from 'vue';

//components

//composables
import useUser from 'src/core/composables/user/useUser';

const { users, getUsers, getUser, addUser } = useUser();

let filter = ref('');

const columns = [
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'lastNames', label: 'APELLIDOS', align: 'left', field: 'lastNames'},
  { name: 'email', label: 'EMAIL', align: "left", field: 'email' },
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

onMounted(() => {
   getUsers();
})


</script>

