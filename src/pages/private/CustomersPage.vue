<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Clientes</div>
    <q-card flat
      class="row q-pa-md q-mt-sm"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addCustomer"
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
      class="col column no-wrap q-mt-md"
    >
      <q-table
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        :rows="customers"
        color="secondary"
        flat
        row-key="id"
        class="col"
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
            <q-btn
              @click="getCustomer(props.row.id)"
              dense
              color="grey-7"
              flat
              icon="edit"
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
    <customer-form
      v-model:open="openCustomerForm"
      v-model:data="customer"
      @onSubmit="handleSaveCustomer"
    />
  </q-page>
</template>

<script setup>
import {ref, onMounted, onUnmounted } from 'vue';

//components
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import customerForm from 'src/components/customer/customerForm.vue';

//composables
import useCustomer from 'src/core/composables/customer/useCustomer';

const { customer,
        customers,
        getCustomers,
        getCustomer,
        addCustomer,
        handleSaveCustomer,
        openCustomerForm
      } = useCustomer();

const filter = ref('');

const columns = [
  { name: 'code', label: 'ID', align: 'left', field: 'code' },
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

const initialPagination = {
  rowsPerPage: 10,
};

onMounted(async() => {
   await getCustomers();
})

onUnmounted(() => {
  customers.value = [];
})
</script>
