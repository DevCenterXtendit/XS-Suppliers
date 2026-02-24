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
          @click="addSupplier"
          :disable="currentCustomer == null"
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
              @update:model-value="val => setSupplierStatus(val, props.row)"
              :model-value="props.row.isActive"
              color="secondary"
              size="sm"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              @click="getSupplier(props.row.id)"
              dense
              color="grey-7"
              flat
              icon="edit"
            />
            <q-btn @click="configDetail(props.row)"
              color="grey-7"
              dense
              flat
              icon="settings"
              class="q-ml-sm"
            />
            <q-btn
              dense
              color="grey-7"
              class="q-ml-sm"
              flat
              icon="delete"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
  <supplier-form/>
  <supplierDetailForm/>
</template>

<script setup>
import {ref, onMounted, onUnmounted } from 'vue';

//components
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import supplierForm from 'src/components/supplier/supplierForm.vue';
import supplierDetailForm from 'src/components/supplier/supplierDetailForm.vue';

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
  getCustomers,
  getSuppliers,
  getSupplier,
  addSupplier,
  configDetail,
  setSupplierStatus
} = useSupplier();

const initialPagination = {
  rowsPerPage: 10,
};

let filter = ref('');

const columns = [
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'legalName', label: 'RAZON SOCIAL', align: 'left', field: 'legalName'},
  { name: 'rfc', label: 'RFC', align: 'left', field: 'rfc'},
  { name: 'email', label: 'EMAIL', align: "left", field: 'email' },
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

const onSelectedCustomer = async () => {
  await getSuppliers();
}

onMounted(async () => {
  if (userLogged.companyType == COMPANY_TYPE.XTENDIT){
    await getCustomers();
  }else{
    await getSuppliers();
  }
});

onUnmounted(() => {
  customers.value = [];
  currentCustomer.value = null;
  suppliers.value = [];
});

</script>

