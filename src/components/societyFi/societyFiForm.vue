<template>
  <dialog-form v-model="openSocietyFiForm" :width="600">
    <template #header>
      {{ `${societyFi.id > 0 ? "Editar" : "Agregar"} Sociedad GL` }}
    </template>
    <template #content>
      <q-form id="societyFiForm" @submit.prevent="handleSaveSocietyFi">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="societyFi.code"
              :rules="societyFiRules.code"
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
              v-model="societyFi.name"
              :rules="societyFiRules.name"
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
        form="societyFiForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue';
import useSocietyFi from 'src/core/composables/societyFI/useSocietyFI';
import useSocietyFiValidation from 'src/core/composables/societyFI/useSocietyFiValidation';

const {
  societyFi,
  openSocietyFiForm,
  handleSaveSocietyFi,

} = useSocietyFi();

const { societyFiRules } = useSocietyFiValidation();
</script>
