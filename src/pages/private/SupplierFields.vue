<template>
  <q-page class="q-pa-md">
    <AppBreadcrumbs />
    <div class="text-h6">Configuración de campos</div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey q-my-sm"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="supplierFields" label="Campos" />
      <q-tab name="supplierFieldType" label="Tipo de Campo" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <q-tab-panel name="supplierFields" class="q-px-none">
        <q-card flat
          class="row q-pa-md"
        >
          <div class="col-4 col-sm-6">
            <q-btn
              @click="addSupplierField"
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
      </q-tab-panel>
      <q-tab-panel name="supplierFieldType" class="q-px-none">
        <q-card flat
          class="row q-pa-md"
        >
          <div class="col-4 col-sm-6">
            <q-btn
              @click="addSupplierField"
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
      </q-tab-panel>
    </q-tab-panels>


  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useSupplierField from 'src/core/composables/supplierField/useSupplierField';

import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
const {
  supplierFields,
  // getSupplierFields,
  addSupplierField,
} = useSupplierField();

const columns = [
  { name: 'name', label: 'CAMPO', align: 'left', field: 'name' },
  { name: 'fieldType', label: 'CLASIFICACION', align: 'left', field: 'fieldType'},
  { name: 'isVisible', label: 'VISUALIZAR', align: "center", field: 'isVisible' },
  { name: 'isRequired', label: 'OBLIGATORIO', align: "center", field: 'isRequired' },
]

const tab = ref('supplierFields')

onMounted(async() => {
  // await getSupplierFields();
})

</script>
