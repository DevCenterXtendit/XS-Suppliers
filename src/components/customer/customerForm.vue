<template>
  <dialog-form v-model="openCustomerForm" :width="600">
    <template #header>
      {{ `${customer.id > 0 ? "Editar" : "Agregar"} Cliente` }}
    </template>
    <template #content>
      <q-form id="customerForm" @submit.prevent="handleSaveCustomer">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="customer.code"
              :rules="customerRules.code"
              dense
              label="ID"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="customer.name"
              :rules="customerRules.name"
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
        form="customerForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue'
import useCustomer from 'src/core/composables/customer/useCustomer';
import useCustomerValidation from 'src/core/composables/customer/useCustomerValidation';

const {
  customer,
  openCustomerForm,
  handleSaveCustomer
} = useCustomer();
const { customerRules } = useCustomerValidation();

</script>
