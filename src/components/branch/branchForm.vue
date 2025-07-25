<template>
  <dialog-form v-model="openForm" :width="600">
    <template #header>
      {{ `${branch.id > 0 ? "Editar" : "Agregar"} Segmento` }}
    </template>
    <template #content>
      <q-form id="branchForm" @submit.prevent="handleSave">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <q-input
              v-model="branch.code"
              :rules="branchRules.code"
              dense
              label="ID"
              maxlength="4"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              v-model="branch.name"
              :rules="branchRules.name"
              dense
              label="Nombre"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="edit_note" />
              </template>
            </q-input>
          </div>

        </div>
      </q-form>
    </template>
    <template #actions>
      <q-btn unelevated no-caps
        color="primary"
        form="branchForm"
        label="Guardar"
        type="submit"
      />
    </template>
  </dialog-form>
</template>

<script setup>
import DialogForm from 'src/components/common/DialogForm.vue';
import useBranch from 'src/core/composables/branch/useBranch';
import useBranchValidation from 'src/core/composables/branch/useBranchValidation';

const {
  branch,
  openForm,
  handleSave,

} = useBranch();

const { branchRules } = useBranchValidation();
</script>
