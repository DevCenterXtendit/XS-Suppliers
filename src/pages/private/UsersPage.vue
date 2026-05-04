<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Usuarios</div>
    <q-card
      v-if="userLogged.companyType == COMPANY_TYPE.XTENDIT"
      flat
      class="q-pa-md q-mt-sm"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6 col-md-4">
          <q-select
              v-model="companyType"
              @update:model-value="onSelectedCompanyType"
              :options="companyTypes"
              dense
              label="Seleccione tipo de usuario"
              map-options
              outlined
              option-label="name"
            >
          </q-select>
        </div>
        <!-- <div class="col-12 col-sm-6 col-md-4">
          <q-select
            v-model="customerToAssign"
            v-if="companyType?.name == COMPANY_TYPE.SUPPLIER"
            @update:model-value="onSelectedCustomerToAssign"
            :options="customers"
            dense
            emit-value
            label="Seleccione cliente a asignar al proveedor"
            map-options
            outlined
            option-label="name"
          >
          </q-select>
        </div> -->
      </div>
    </q-card>
    <q-card flat
      class="row q-pa-md q-my-md"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addUser"
          :disable="companyType==null && userLogged.companyType == COMPANY_TYPE.XTENDIT"
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
      class="col column no-wrap q-px-sm"
    >
      <q-table
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        :rows="users"
        color="secondary"
        flat
        row-key="id"
        class="col"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              @update:model-value="val => setUserStatus(val, props.row)"
              :model-value="props.row.isActive"
              color="secondary"
              size="sm"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn  @click="getUser(props.row.id)"
              color="grey-7"
              dense
              flat
              icon="edit"
            />
            <q-btn @click="removeUser(props.row)"
              color="grey-7"
              dense
              flat
              icon="delete"
              class="q-ml-sm"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
  <user-form/>
</template>

<script setup>
import {ref, onMounted, onUnmounted } from 'vue';
import companyTypes from 'src/core/constants/company-type-list';
//components
import userForm from 'src/components/user/userForm.vue';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
//composables
import useUser from 'src/core/composables/user/useUser';
import useAuth from 'src/core/composables/auth/useAuth';
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const {
  companyType,
  users,
  customers,
  suppliers,
  roles,
  getUsers,
  getUser,
  addUser,
  setUserStatus,
  removeUser
} = useUser();

const {
  userLogged
} = useAuth();

const initialPagination = {
  rowsPerPage: 10,
};

let filter = ref('');

const columns = [
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'lastNames', label: 'APELLIDOS', align: 'left', field: 'lastNames'},
  { name: 'email', label: 'EMAIL', align: "left", field: 'email' },
  { name: 'status', label: 'ACTIVO', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

const onSelectedCompanyType = async () => {
  await Promise.all([
    getUsers(),
  ]);;
}

onMounted(async () => {
  if (userLogged.companyType !== COMPANY_TYPE.XTENDIT){
    await Promise.all([
      getUsers(),
    ])
  }
});

onUnmounted(() => {
  companyType.value = null;
  users.value = [];
  customers.value = [];
  suppliers.value = [];
  roles.value = [];
});

</script>

