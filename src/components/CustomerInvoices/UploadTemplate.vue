<template>
  <dialog-form 
      v-model="openTemplateDialog" 
      @closed="handleDialogClosed"
      :width="800"
    >
    <template #header>
       Cargar Facturas - Plantilla
    </template>
    <template #content>
      <div v-if="!uploadResult.totalRows" 
        class="row q-col-gutter-sm items-start">
        <div class="col">
          <q-file
            v-model="template"
            accept=".csv"
            bottom-slots
            counter
            dense
            label="Factura"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload"/>
            </template>
            <template v-slot:append>
              <q-icon name="close" @click.stop.prevent="template = null" class="cursor-pointer" />
            </template>

            <template v-slot:hint>
              Solo archivos csv permitidos. Tamaño máximo: 5MB.
            </template>
          </q-file>
        </div>

        <div class="col-auto">
          <q-btn
            color="primary"
            label="Subir"
            no-caps
            unelevated
            :disable="!template"
            @click="sendTemplate"
          />
        </div>
      </div>

      <div v-else>
        <q-banner
          :class="uploadResult.success ? 'bg-positive' : 'bg-negative'"
          dense
          icon="error"
          rounded
          class="text-white"
        >
          {{ uploadResult.success
            ? `Archivo "${template?.name || 'seleccionado'}" cargado sin errores`
            : `Archivo "${template?.name || 'seleccionado'}" cargado con errores` }}
        </q-banner>

        <div class="row q-col-gutter-sm q-mt-sm">
          <div class="col-12 col-sm-4">
            <q-card flat bordered>
              <q-card-section class="q-pa-sm">
                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-6">Total de filas</div>
                  <div class="text-subtitle1 text-weight-bold">{{ uploadResult.totalRows }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4">
            <q-card flat bordered>
              <q-card-section class="q-pa-sm">
                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-6">Filas válidas</div>
                  <div class="text-subtitle1 text-positive text-weight-bold">{{ uploadResult.validRows }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4">
            <q-card flat bordered>
              <q-card-section class="q-pa-sm">
                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-6">Filas inválidas</div>
                  <div class="text-subtitle1 text-negative text-weight-bold">{{ uploadResult.invalidRows }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <div class="text-subtitle2 text-weight-medium">Errores detectados ({{ uploadResult.errors.length }})</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="error in uploadResult.errors" :key="`${error.rowNumber}-${error.message}`">
              <q-item-section avatar>
                <q-icon name="warning" color="negative" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Fila {{ error.rowNumber }}</q-item-label>
                <q-item-label caption class="text-negative">{{ error.message }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </dialog-form>
</template>

<script setup>
import { ref } from 'vue';
import useCustomerInvoices from 'src/core/composables/customerInvoces/useCustomerInvoices';
import DialogForm from '../common/DialogForm.vue';

const { 
  openTemplateDialog,
  template,
  uploadResult,
  sendTemplate
} = useCustomerInvoices();

const handleDialogClosed = () => {
  template.value = ref(null);
  uploadResult.value = ref(null);
}


</script>