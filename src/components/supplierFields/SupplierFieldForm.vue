<template>
  <dialog-form v-model="openSupplierFieldForm" :width="600">
    <template #header>
      {{ `${supplierField.id > 0 ? "Editar" : "Agregar"} Campo Proveedor` }}
    </template>
    <template #content>
      <q-form id="supplierFieldForm" @submit.prevent="handleSaveSupplierField">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-select
              v-model="supplierField.fieldTypeId"
              :options="supplierFieldTypes"
              dense
              emit-value
              label="Tipo de Campo"
              map-options
              outlined
              option-label="name"
              option-value="id"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="supplierField.text"
              dense
              label="Texto del campo"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="drive_file_rename_outline" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="supplierField.name"
              dense
              label="Nombre del campo"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="drive_file_rename_outline" />
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <q-btn unelevated no-caps
        color="primary"
        form="supplierFieldForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue';
import useSupplierField from 'src/core/composables/supplierField/useSupplierField';
import useSupplierFieldType from 'src/core/composables/supplierFieldType/useSupplierFieldType';

const {
  supplierField,
  openSupplierFieldForm,
  handleSaveSupplierField
} = useSupplierField();

const {
  supplierFieldTypes
} = useSupplierFieldType();

</script>
