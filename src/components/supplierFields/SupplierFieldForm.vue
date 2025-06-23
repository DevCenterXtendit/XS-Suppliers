<template>
  <dialog-form v-model="openForm" :width="600">
    <template #header>
      {{ `${supplierField.id > 0 ? "Editar" : "Agregar"} Campo` }}
    </template>
    <template #content>
      <q-form id="supplierFieldForm" @submit.prevent="handleSaveSupplierField">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="supplierField.name"
              dense
              label="Nombre"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
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

const {
  supplierField,
  openForm,
  handleSaveSupplierField
} = useSupplierField();

</script>
