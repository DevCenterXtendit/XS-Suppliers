<template>
  <dialog-form v-model="openSocietyGlForm" :width="600">
    <template #header>
      {{ `${societyGl.id > 0 ? "Editar" : "Agregar"} Sociedad GL` }}
    </template>
    <template #content>
      <q-form id="societyGlForm" @submit.prevent="handleSaveSocietyGl">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="societyGl.code"
              :rules="societyGlRules.code"
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
              v-model="societyGl.name"
              :rules="societyGlRules.name"
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
        form="societyGlForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue'
import useSocietyGL from 'src/core/composables/societyGL/useSocietyGL';
import useSocietyGLValidation from 'src/core/composables/societyGL/useSocietyGlValidation';

const {
  societyGl,
  openSocietyGlForm,
  handleSaveSocietyGl,

} = useSocietyGL();

const { societyGlRules } = useSocietyGLValidation();
</script>
