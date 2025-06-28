<template>
  <dialog-form v-model="openSupplierFieldTypeForm" :width="600">
    <template #header>
      {{ `${supplierFieldType.id > 0 ? "Editar" : "Agregar"} Tipo de Campo` }}
    </template>
    <template #content>
      <q-form id="supplierFieldTypeForm" @submit.prevent="handleSaveSupplierFieldType">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="supplierFieldType.text"
              dense
              label="Texto en el campo"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="drive_file_rename_outline" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="supplierFieldType.name"
              dense
              label="Nombre de tipo de campo"
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
        form="supplierFieldTypeForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue';
import useSupplierFieldType from 'src/core/composables/supplierFieldType/useSupplierFieldType';

const {
  supplierFieldType,
  openSupplierFieldTypeForm,
  handleSaveSupplierFieldType
}
= useSupplierFieldType();

</script>
