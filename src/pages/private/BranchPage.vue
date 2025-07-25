<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="text-h6">Segmentos</div>
    <q-card
      flat
      class="q-pa-md q-mt-sm"
    >
      <div class="row q-col-gutter-sm">
         <div v-if="userLogged.companyType == COMPANY_TYPE.XTENDIT"
          class="col-12 col-sm-4 col-md-3">
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
        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="currentSocietyGl"
            @update:model-value="onSelectedSocietyGl"
            :disable="!currentCustomer && userLogged.companyType == COMPANY_TYPE.XTENDIT"
            :options="societiesGl"
            dense
            emit-value
            label="Seleccione Sociedad GL"
            map-options
            outlined
            option-label="name"
          >
          </q-select>
        </div>
        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="currentSocietyFi"
            @update:model-value="onSelectedSocietyFi"
            :disable="!currentSocietyGl"
            :options="societiesFi"
            dense
            emit-value
            label="Seleccione Sociedad FI"
            map-options
            outlined
            option-label="name"
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
          @click="addBranch"
          :disable="!currentSocietyFi"
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
        :rows="branches"
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
              @click="getBranch(props.row.id)"
              dense
              color="grey-7"
              flat
              icon="edit"
            />
            <q-btn
              @click="removeSpecialtyFi(props.row.id)"
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
  <branchForm/>
</template>

<script setup>
import { ref, onMounted, onUnmounted} from 'vue';
import useBranch from 'src/core/composables/branch/useBranch';
import useAuth from 'src/core/composables/auth/useAuth';

import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import branchForm from 'src/components/branch/branchForm.vue';
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const{
  customers,
  currentCustomer,
  societiesGl,
  currentSocietyGl,
  societiesFi,
  currentSocietyFi,
  branches,
  getCustomers,
  getSocietiesGl,
  getSocietiesFi,
  getBranches,
  getBranch,
  addBranch,
} = useBranch();

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
  currentSocietyGl.value = null;
  currentSocietyFi.value = null;
  branches.value = [];
  getSocietiesGl();
}

const onSelectedSocietyGl = async () => {
  currentSocietyFi.value = null;
  branches.value = [];
  getSocietiesFi();
}

const onSelectedSocietyFi = async () => {
  getBranches();
}

onMounted(async () => {
  if(userLogged.companyType == COMPANY_TYPE.XTENDIT){
    await getCustomers();
  }else{
    await getSocietiesGl();
  }
})

onUnmounted(() => {
  customers.value = [];
  currentCustomer.value = null;
  societiesGl.value = [];
  currentSocietyGl.value = null;
  societiesFi.value = [];
  currentSocietyFi.value = null;
  branches.value = [];
})
</script>

