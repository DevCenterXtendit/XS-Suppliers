<template>
  <dialog-form v-model="openSupplierForm" :width="700">
    <template #header>
      {{ `${supplier.id > 0 ? "Editar" : "Agregar"} Proveedor` }}
    </template>
    <template #content>
      <q-form id="supplierForm" @submit.prevent="handleSave">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <div class="text-subtitle2 text-grey-6">Datos principales</div>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
            <q-select
              v-model="supplier.supplierTypeId"
              @update:model-value="onSupplierTypeChange"
              :disable="supplier.id > 0"
              :options="supplierTypeList"
              :rules="supplierRules.supplierTypeId"
              dense
              emit-value
              label="Seleccione tipo de proveedor"
              map-options
              outlined
              option-label="name"
              option-value="id"
            >
            </q-select>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
           <q-input
              label="DIOT"
              outlined
              dense
              v-model="diot"
              disable
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="supplier.name"
              :rules="supplierRules.name"
              dense
              label="Nombre"
              outlined
            >
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-6">
            <q-input
              v-model="supplier.legalName"
              :rules="supplierRules.legalName"
              dense
              label="Razón social"
              outlined
            >
            </q-input>
          </div>
          <div
            class="col-12 col-sm-6 col-md-6">
            <q-input
              v-model="supplier.rfc"
              :rules="supplierRules.rfc"
              :disable="supplier.supplierTypeId != 1"
              dense
              label="RFC"
              outlined
            >
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="supplier.email"
              :rules="supplierRules.email"
              dense
              label="Email"
              outlined
            >
            </q-input>
          </div>
          <div class="col-12">
            <div class="text-subtitle2 q-mt-sm text-grey-6">Dirección</div>
          </div>
          <div class="col-12">
            <address-form
              v-if="supplier.supplierTypeId==1"
              v-model:address="supplier.address"
            />
            <div v-else class="col-12 col-md-12">
              <q-input
                v-model="supplier.country"
                dense
                label="País"
                outlined
              >
              </q-input>
            </div>
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <q-btn unelevated no-caps
        color="primary"
        form="supplierForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import { computed } from 'vue';
import DialogForm from 'src/components/common/DialogForm.vue';
import useSupplier from 'src/core/composables/supplier/useSupplier';
import supplierTypeList from 'src/core/constants/supplier-type-list';

//composables
import useSupplierValidation from 'src/core/composables/supplier/useSupplierValidation';

import AddressForm from '../common/AddressForm.vue';

const {
  supplier,
  openSupplierForm,
  handleSave,
} = useSupplier();

const { supplierRules } = useSupplierValidation();

const diot = computed(() => {
  const providerType = supplierTypeList.find(f => f.id === supplier.value.supplierTypeId)
  return providerType ? providerType.diot : ''
})

//TODO:Ajustar para no usar ids y utilizar constantes
const onSupplierTypeChange = (id) => {
  if (id > 1){
    supplier.value.country = '';
    supplier.value.address = null;
  }
  else{
    supplier.value.country = null;
    supplier.value.address = {
      street: '',
      exteriorNumber: '',
      interiorNumber: null,
      neighborhoodId : null,
    }
  }
}


</script>
