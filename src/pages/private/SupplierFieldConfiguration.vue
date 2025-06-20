<template>
  <q-page class="q-pa-md">
      <AppBreadcrumbs />
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
      <!-- <div class="col-12 col-md-3">
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
      </div> -->
  </q-card>
  <q-card
    flat
    class="q-mt-md">
    <q-card-section class="">
      <q-table
        flat
        :rows="supplierFields"
        :columns="columns"
        row-key="id"
      >
      <template v-slot:body-cell-isVisible="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.isVisible"
            size="sm"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-isRequired="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.isRequired"
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useSupplierField from 'src/core/composables/supplierField/useSupplierFiled';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';

const {
  customers,
  currentCustomerId,
  supplierFields,
  getCustomers,
  onSelectedCustomer,
} = useSupplierField();

const columns = [
  { name: 'name', label: 'CAMPO', align: 'left', field: 'name' },
  { name: 'fieldType', label: 'CLASIFICACION', align: 'left', field: 'fieldType'},
  { name: 'isVisible', label: 'VISUALIZAR', align: "center", field: 'isVisible' },
  { name: 'isRequired', label: 'OBLIGATORIO', align: "center", field: 'isRequired' },
]

onMounted(async() => {
  await getCustomers();
})

</script>
