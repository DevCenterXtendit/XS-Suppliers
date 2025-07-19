<template>
  <dialog-form v-model="openSocietyFiForm" :width="600">
    <template #header>
      {{ `${societyFi.id > 0 ? "Editar" : "Agregar"} Sociedad FI` }}
    </template>
    <template #content>
      <q-form id="societyFiForm" @submit.prevent="handleSaveSocietyFi">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <div class="text-subtitle2 text-grey-6">Datos principales</div>
          </div>
          <div class="col-12 col-sm-4">
            <q-input
              v-model="societyFi.code"
              :rules="societyFiRules.code"
              dense
              label="ID*"
              maxlength="4"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-8">
            <q-input
              v-model="societyFi.name"
              :rules="societyFiRules.name"
              dense
              label="Nombre*"
              outlined
            >
              <template v-slot:prepend>
                <q-icon
                  name="edit_note"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="societyFi.rfc"
              :rules="societyFiRules.rfc"
              dense
              label="RFC*"
              maxlength="12"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <div class="text-subtitle2 q-mt-sm text-grey-6">Dirección</div>
          </div>
          <div class="col-12">
            <address-form
              v-model:address = societyFi.address
            />
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <q-btn
        color="primary"
        form="societyFiForm"
        label="Guardar"
        no-caps
        type="submit"
        unelevated
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue';
import useSocietyFi from 'src/core/composables/societyFI/useSocietyFI';
import useSocietyFiValidation from 'src/core/composables/societyFI/useSocietyFiValidation';

//components
import AddressForm from '../common/AddressForm.vue';

const {
  societyFi,
  openSocietyFiForm,
  handleSaveSocietyFi,
} = useSocietyFi();

const { societyFiRules } = useSocietyFiValidation();
</script>
