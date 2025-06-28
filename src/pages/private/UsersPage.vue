<template>
  <q-page class="q-pa-md">
    <AppBreadcrumbs />
    <div class="text-h6">Usuarios</div>
    <q-card flat class="row q-pa-md q-my-md">
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
            v-model="companyType"
            @update:model-value="getCompanies"
            :options="companyTypes"
            dense
            label="Seleccione tipo de usuario"
            map-options
            outlined
            option-label="name"
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
          :disable="companyType==null"
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
      <q-card-section>
        <q-table
          :columns="columns"
          :filter="filter"
          :rows="users"
          flat
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
import companyTypes from 'src/core/constants/company-type-list';
//components
import userForm from 'src/components/user/userForm.vue';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
//composables
import useUser from 'src/core/composables/user/useUser';

const {
  companyType,
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

