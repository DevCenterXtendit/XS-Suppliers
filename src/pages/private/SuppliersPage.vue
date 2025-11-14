<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Proveedores</div>
    <q-card
      v-if="userLogged.companyType == COMPANY_TYPE.XTENDIT"
      flat
      class="row q-pa-md q-mt-sm"
    >
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
            v-model="currentCustomer"
            @update:model-value="onSelectedCustomer"
            :options="customers"
            dense
            label="Seleccione cliente"
            map-options
            outlined
            option-label="name"
          >
        </q-select>
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
        :rows="suppliers"
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
      </q-table>
    </q-card>
  </q-page>
  <user-form/>
</template>

<script setup>
import {ref, onMounted, onUnmounted } from 'vue';
import companyTypes from 'src/core/constants/company-type-list';

//components
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';

//composables
import useSupplier from 'src/core/composables/supplier/useSupplier';
import useAuth from 'src/core/composables/auth/useAuth';
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const {
  userLogged
} = useAuth();

const {
  customers,
  currentCustomer,
  suppliers,
  getCustomers
} = useSupplier();

const initialPagination = {
  rowsPerPage: 10,
};

let filter = ref('');

const columns = [
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'lastNames', label: 'APELLIDOS', align: 'left', field: 'lastNames'},
  { name: 'email', label: 'EMAIL', align: "left", field: 'email' },
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]



const onSelectedCustomer = async () => {
  console.log('SELECCIONAN AL CLIENTE');
}

onMounted(async () => {
  await getCustomers();
  console.log('se montal el componente')
});

onUnmounted(() => {
  console.log('se desmonta')
});

</script>

