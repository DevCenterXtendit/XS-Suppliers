<template>
   <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Sociedades FI</div>
    <q-card
      flat
      class="q-pa-md q-mt-sm"
    >
      <div class="row q-col-gutter-sm">
        <div
          v-if="userLogged.companyType == COMPANY_TYPE.XTENDIT"
          class="col-12 col-sm-6 col-md-3">
          <q-select
            v-model="currentCustomer"
            @update:model-value="onSelectedCustomer"
            :options="customers"
            dense
            emit-value
            label="Seleccione Cliente"
            map-options
            option-label="name"
            outlined
          >
          </q-select>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <q-select
            v-model="currentSocietyGl"
            @update:model-value="onSelectedSocietyGl"
            :disable="!currentCustomer && userLogged.companyType == COMPANY_TYPE.XTENDIT"
            :options="societiesGl"
            dense
            emit-value
            label="Seleccione Sociedad GL"
            map-options
            option-label="name"
            outlined
          >
          </q-select>
        </div>
      </div>
    </q-card>
    <q-card flat
      class="row q-pa-md q-my-md"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addSocietyFi"
          :disable="!currentSocietyGl"
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
        :rows="societiesFi"
        color="secondary"
        flat
        row-key="id"
        class="col"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              @update:model-value="val => setSocietyFiStatus(val, props.row)"
              :model-value="props.row.isActive"
              color="secondary"
              size="sm"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              @click="getSocietyFi(props.row.id)"
              dense
              color="grey-7"
              flat
              icon="edit"
            />
            <q-btn
              @click="removeSocietyFi(props.row.id)"
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
    <societyFi-form/>
  </q-page>
</template>

<script setup>
import {ref, onMounted, onUnmounted } from 'vue';
import useSocietyFi from 'src/core/composables/societyFI/useSocietyFI';
import useAuth from 'src/core/composables/auth/useAuth';

import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import societyFiForm from 'src/components/societyFi/societyFiForm.vue';
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const {
  customers,
  societiesGl,
  currentCustomer,
  currentSocietyGl,
  societiesFi,
  getCustomers,
  getSocietiesGl,
  getSocietiesFiBySocietyGl,
  getSocietyFi,
  addSocietyFi,
  setSocietyFiStatus,
  removeSocietyFi

} = useSocietyFi();

const {
  userLogged
} = useAuth();

const initialPagination = {
  rowsPerPage: 10,
};

const filter = ref('');

const columns = [
  { name: 'code', label: 'ID', align: 'left', field: 'code' },
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

const onSelectedCustomer = async () => {
  await getSocietiesGl();
  currentSocietyGl.value = null;
  societiesFi.value = [];
}

const onSelectedSocietyGl = async () => {
  await getSocietiesFiBySocietyGl();
}

onMounted(async() => {
  if(userLogged.companyType == COMPANY_TYPE.XTENDIT){
    await getCustomers();
  }else{
    await getSocietiesGl();
  }
})

onUnmounted(() => {
  customers.value = [];
  societiesGl.value = [];
  currentCustomer.value = null;
  currentSocietyGl.value = null;
  societiesFi.value = [];
})

</script>
