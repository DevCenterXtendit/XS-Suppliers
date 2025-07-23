<template>
   <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Sociedades GL</div>
    <q-card
      v-if="userLogged.companyType == COMPANY_TYPE.XTENDIT"
      flat
      class="row q-pa-md q-mt-sm">
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          v-model="currentCustomer"
          @update:model-value="onSelectedCustomer"
          :options="customers"
          dense
          emit-value
          label="Seleccione Cliente"
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
          @click="addSocietyGl"
          :disable="!currentCustomer && userLogged.companyType == COMPANY_TYPE.XTENDIT"
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
      class="col column no-wrap q-px-sm">
      <q-table
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        :rows="societiesGl"
        color="secondary"
        flat
        row-key="id"
        class="col"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              v-model="props.row.isActive"
              color="secondary"
              size="sm"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              @click="getSocietyGl(props.row.id)"
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
  </q-page>
  <societyGl-form/>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import useSocietyGL from 'src/core/composables/societyGL/useSocietyGL';
import useAuth from 'src/core/composables/auth/useAuth';

import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import societyGlForm from 'src/components/societyGl/societyGlForm.vue';
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const {
  customers,
  currentCustomer,
  societiesGl,
  getCustomers,
  getSocietiesGl,
  getSocietyGl,
  addSocietyGl,
} = useSocietyGL();

const {
  userLogged
} = useAuth();

const initialPagination = {
  rowsPerPage: 10,
};

let filter = ref('');

const columns = [
  { name: 'code', label: 'ID', align: 'left', field: 'code' },
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

const onSelectedCustomer = async () => {
  await getSocietiesGl();
}

onMounted(async() => {
  if (userLogged.companyType == COMPANY_TYPE.XTENDIT){
    await getCustomers();
  }else{
    await getSocietiesGl();
  }
})

onMounted(() => {
  customers.value = [];
  currentCustomer.value = null;
  societiesGl.value = [];
})

</script>
