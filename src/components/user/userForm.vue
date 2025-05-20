<template>
  <dialog-form v-model="open" :width="600">
    <template #header>
      {{ `${user.id > 0 ? "Editar" : "Agregar"} Usuario` }}
    </template>
    <template #content>
      <q-form id="customerForm" @submit.prevent="emit('onSubmit')">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="user.name"
              dense
              label="Nombre(s)"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="user.middleName"
              dense
              label="Apellido Paterno"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="user.lastName"
              dense
              label="Apellido Materno"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="user.email"
              dense
              label="Email"
              outlined
            >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
            </q-input>
          </div>

          <div class="col-12 col-md-6">
            <q-select
              v-model="user.companyId"
              :options="companies"
              behavior="menu"
              dense
              label="Empresa"
              emit-value
              map-options
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="business" />
              </template>
            </q-select>
          </div>

          <div class="col-12 col-md-6">
            <q-select
              v-model="user.companyId"
              option-label="name"
              option-value="id"
              dense
              label="Rol"
              emit-value
              map-options
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="group" />
              </template>
            </q-select>
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
import { defineEmits, defineProps, watch } from 'vue';
import DialogForm from 'src/components/common/DialogForm.vue';

//props
defineProps({
  companies: {
    type: Array,
    default: () => []
  }
});

//models
const user = defineModel('data');
const open = defineModel('open');

//emits
const emit = defineEmits(['onSubmit', 'onCompanyTypeChanged'])

watch(() => user.value.companyTypeId, (newVal) => {
  emit('onCompanyTypeChanged', newVal);
});

</script>
