<template>
   <q-page class="q-pa-md">
    <div class="text-h6">SOCIEDADES GL</div>

    <q-card flat class="row q-pa-md q-my-md">
        <div class="col-12 col-md-3">
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
    </q-card>

    <q-card flat
      class="row q-pa-md q-my-sm"
    >
      <div class="col-4 col-sm-6">
        <q-btn
          @click="addSocietyGl"
          :disable="currentCustomerId == null"
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
          :rows="societiesGl"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge class="q-px-sm" rounded
              :color="props.value ? 'positive' : 'negative'"
              :label="props.value ? 'Activo' : 'Inactivo' " />
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
      </q-card-section>
    </q-card>
  </q-page>
  <societyGl-form/>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import useSocietyGL from 'src/core/composables/societyGL/useSocietyGL';
import societyGlForm from 'src/components/societyGl/societyGlForm.vue';

const {
  customers,
  currentCustomerId,
  societiesGl,
  getCustomers,
  onSelectedCustomer,
  getSocietyGl,
  addSocietyGl,
} = useSocietyGL();

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
