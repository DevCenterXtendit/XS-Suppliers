<template>
  <q-page class="q-pa-md">
    <AppBreadcrumbs />
    <div class="text-h6">Campos proveedor</div>
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
              :columns="columns"
              :filter="filter"
              :rows="supplierFields"
              flat
              row-key="id"
            >
              <template v-slot:body-cell-fieldType="props">
               <q-td :props="props">
                 {{getFieldTypeById(props.row.id)}}
               </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    @click="getSupplierField(props.row.id)"
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
      <!-- tipo de campos -->
      <q-tab-panel name="supplierFieldType" class="q-px-none">
        <q-card flat
          class="row q-pa-md"
        >
          <div class="col-4 col-sm-6">
            <q-btn
              @click="addSupplierFieldType"
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
              v-model="filetrType"
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
              :columns="columnsType"
              :filter="filetrType"
              :rows="supplierFieldTypes"
              flat
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
                    @click="getSupplierFieldType(props.row.id)"
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
  <SupplierFieldTypeForm />
  <SupplierFieldForm/>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

//composables
import useSupplierField from 'src/core/composables/supplierField/useSupplierField';
import useSupplierFieldType from 'src/core/composables/supplierFieldType/useSupplierFieldType';

//components
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import SupplierFieldTypeForm from 'src/components/supplierFieldType/SupplierFieldTypeForm.vue';
import SupplierFieldForm from 'src/components/supplierFields/SupplierFieldForm.vue';

const {
  supplierFields,
  getSupplierFields,
  addSupplierField,
  getSupplierField
} = useSupplierField();

const {
  supplierFieldTypes,
  getSupplierFieldTypes,
  addSupplierFieldType,
  getSupplierFieldType
} = useSupplierFieldType();

const tab = ref('supplierFields')

const columns = [
  { name: 'text', label: 'CAMPO', align: 'left', field: 'text' },
  { name: 'fieldType', label: 'CLASIFICACION', align: 'left', field: 'fieldTypeId'},
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

const columnsType = [
  { name: 'text', label: 'TIPO DE CAMPO', align: 'left', field: 'text'},
  { name: 'actions', label: 'ACCIONES', align: 'center' , field: 'actions'},
]

let filter = ref('');
let filetrType = ref('');

const getFieldTypeById = computed(() => {
  return (id) => {
    const field = supplierFieldTypes.value.find(f => f.id === id)
    return field ? field.text : ''
  }
})

onMounted(async() => {
  await getSupplierFields();
  await getSupplierFieldTypes();
})
</script>
