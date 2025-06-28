<template>
  <q-page class="q-pa-md">
    <AppBreadcrumbs />
    <div class="text-h6">Segmentos</div>
    <q-card flat class="q-pa-md q-my-md">
      <div class="row q-gutter-md">
         <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="currentCustomerId"
            @update:model-value="onSelectedCustomer"
            :options="customers"
            dense
            emit-value
            label="Seleccione Cliente"
            map-options
            outlined
            option-label="name"
            option-value="id"
          >
          </q-select>
        </div>
        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="currentSocietyGlId"
            @update:model-value="onSelectedSocietyGl"
            :disable="!currentCustomerId"
            :options="societiesGl"
            dense
            emit-value
            label="Seleccione Sociedad GL"
            map-options
            outlined
            option-label="name"
            option-value="id"
          >
          </q-select>
        </div>
        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="currentSocietyFiId"
            @update:model-value="onSelectedSocietyFi"
            :disable="!currentSocietyGlId"
            :options="societiesFi"
            dense
            emit-value
            label="Seleccione Sociedad FI"
            map-options
            outlined
            option-label="name"
            option-value="id"
          >
          </q-select>
        </div>
      </div>
    </q-card>
    <q-card flat
      class="row q-pa-md q-my-sm"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addBranch"
          :disable="!currentSocietyFiId"
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
          :rows="branches"
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
      </q-card-section>
    </q-card>
  </q-page>
  <branchForm/>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import useBranch from 'src/core/composables/branch/useBranch';

import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import branchForm from 'src/components/branch/branchForm.vue';

const{
  customers,
  currentCustomerId,
  societiesGl,
  currentSocietyGlId,
  societiesFi,
  currentSocietyFiId,
  branches,
  getCustomers,
  onSelectedCustomer,
  onSelectedSocietyGl,
  onSelectedSocietyFi,
  getBranch,
  addBranch,
} = useBranch();

let filter = ref('');

const columns = [
  { name: 'code', label: 'ID', align: 'left', field: 'code' },
  { name: 'name', label: 'NOMBRE', align: 'left', field: 'name'},
  { name: 'status', label: 'ESTATUS', align: "center", field: 'isActive' },
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

onMounted(async() => {
  await getCustomers();
})
</script>

