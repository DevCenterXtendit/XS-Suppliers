<template>
  <q-page class="q-pa-md">
    <div class="text-h6">Usuarios</div>

    <q-card flat class="row q-pa-md q-my-md">
        <div class="col-12 col-md-3">
         <q-select
            v-model="userType"
            @update:model-value="getCompanies"
            :options="userTypes"
            dense
            emit-value
            label="Seleccione tipo de usuario"
            map-options
            outlined
            option-label="name"
            option-value="id"
          >
        </q-select>
        </div>
    </q-card>
    <q-card flat
      class="row q-pa-md q-my-sm"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addUser"
          color="primary"
          icon="add_circle_outline"
          label="Añadir"
          no-caps
          unelevated
        />
      </div>
      <div class="col-8 col-sm-6">
        <q-input
          dense
          clearable
          outlined
          placeholder="Buscar"
          v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-card>

    <q-card
      flat
      class="q-mt-md">
      <q-card-section class="">
        <q-table
          flat
          :filter="filter"
          :rows="users"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              v-model="props.row.isActive"
              size="sm"
            />
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
  <user-form/>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import userTypes from 'src/core/constants/userTypes';
//components
import userForm from 'src/components/user/userForm.vue';
//composables
import useUser from 'src/core/composables/user/useUser';

const {
  userType,
  users,
  getUsers,
  getUser,
  getCompanies,
  addUser
} = useUser();

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

