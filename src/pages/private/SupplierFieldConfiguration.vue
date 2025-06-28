<template>
  <q-page class="q-pa-md">
    <AppBreadcrumbs />
    <div class="text-h6">Configuración de campos</div>

    <q-card flat class="row q-pa-md q-my-md">
      <div class="col-12 col-sm-6 col-md-4">
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
    <q-card
      flat
      class="q-mt-md">
      <q-card-section>
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
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import useSupplierFieldConfiguration from 'src/core/composables/supplierFieldConfiguration/useSupplierFieldConfiguration';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';

const {
  customers,
  currentCustomerId,
  supplierFields,
  getCustomers,
  getSupplierFields,
  onSelectedCustomer,
} = useSupplierFieldConfiguration();

const columns = [
  { name: 'text', label: 'CAMPO', align: 'left', field: 'text' },
  { name: 'fieldType', label: 'CLASIFICACION', align: 'left', field: 'fieldType'},
  { name: 'isVisible', label: 'VISUALIZAR', align: "center", field: 'isVisible' },
  { name: 'isRequired', label: 'OBLIGATORIO', align: "center", field: 'isRequired' },
]

onMounted(async() => {
  await getCustomers();
  await getSupplierFields();
})

</script>
