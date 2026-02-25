<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Facturas</div>
      <q-btn
        @click="openTemplateDialog = !openTemplateDialog"
        color="primary"
        icon="upload"
        label="Actualizar facturas"
        no-caps
        unelevated
      />
      <input
        ref="fileInput"
        type="file"
        accept=".csv"
        @change="handleFileUpload"
        style="display: none;"
      />
    </div>

    <!-- Cards de estadísticas -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-blue-2">
          <q-card-section>
            <div class="text-overline text-grey-8">Total: <strong>{{ stats.total }}</strong></div>
            <div class="text-h4 text-blue text-weight-bold">
              {{ formatCurrency(stats.totalMonto) }}
            </div>
            <div class="text-caption text-grey-8">Suma de importes</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-green-2">
          <q-card-section>
            <div class="text-overline text-grey-8">Pagadas: <strong>{{ stats.pagadas }}</strong></div>
            <div class="text-h4 text-positive text-weight-bold">
              {{ formatCurrency(stats.pagadasMonto) }}
            </div>
            <div class="text-caption text-grey-8">Suma de importes</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-orange-2">
          <q-card-section>
            <div class="text-overline text-grey-8">Por pagar: <strong>{{ stats.porPagar }}</strong></div>
            <div class="text-h4 text-warning text-weight-bold">
              {{ formatCurrency(stats.porPagarMonto) }}
            </div>
            <div class="text-caption text-grey-8">Suma de importes</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-red-2">
          <q-card-section>
            <div class="text-overline text-grey-8">Canceladas: <strong>{{ stats.canceladas }}</strong></div>
            <div class="text-h4 text-negative text-weight-bold">
              {{ formatCurrency(stats.canceladasMonto) }}
            </div>
            <div class="text-caption text-grey-8">Suma de importes</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Filtros y acciones -->
    <q-card flat class="row q-pa-md q-my-md">
      <div class="col-12 col-sm-6 col-md-4 q-pr-sm">
        <q-select
          v-model="filterStatus"
          :options="statusOptions"
          dense
          label="Filtrar por estatus"
          outlined
          clearable
        />
      </div>
      <div class="col-12 col-sm-6 col-md-8">
        <q-input
          dense
          clearable
          outlined
          placeholder="Buscar"
          v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-card>
    <!-- Tabla de facturas -->
    <q-card
      flat
      class="col column no-wrap q-px-sm"
    >
      <q-table
        :columns="columns"
        :filter="filter"
        :pagination="initialPagination"
        :rows="filteredInvoices"
        color="secondary"
        flat
        row-key="id"
        class="col"
      >
        <template v-slot:body-cell-estatus="props">
          <q-td :props="props">
            <q-badge
              :color="getStatusColor(props.row.estatus)"
              :label="props.row.estatus"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-monto="props">
          <q-td :props="props">
            {{ formatCurrency(props.row.monto) }}
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
  <upload-template />
</template>

<script setup>
import { ref, computed } from 'vue';
//composables
import useCustomerInvoices from 'src/core/composables/customerInvoces/useCustomerInvoices';

//components
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import UploadTemplate from 'src/components/CustomerInvoices/UploadTemplate.vue';

const {
  invoices,
  openTemplateDialog
} = useCustomerInvoices();

const initialPagination = {
  rowsPerPage: 10,
};

const filter = ref('');
const filterStatus = ref(null);

const columns = [
  { name: 'folio', label: 'FOLIO', align: 'left', field: 'folio', sortable: true },
  { name: 'proveedor', label: 'PROVEEDOR', align: 'left', field: 'proveedor', sortable: true },
  { name: 'fecha', label: 'FECHA', align: 'left', field: 'fecha', sortable: true },
  { name: 'monto', label: 'MONTO', align: 'right', field: 'monto', sortable: true },
  { name: 'estatus', label: 'ESTATUS', align: 'center', field: 'estatus', sortable: true },
];

const statusOptions = ['Pagada', 'Por pagar', 'Cancelada'];

// Computed para estadísticas
const stats = computed(() => {
  const pagadasInvoices = invoices.value.filter(inv => inv.estatus === 'Pagada');
  const porPagarInvoices = invoices.value.filter(inv => inv.estatus === 'Por pagar');
  const canceladasInvoices = invoices.value.filter(inv => inv.estatus === 'Cancelada');

  return {
    total: invoices.value.length,
    totalMonto: invoices.value.reduce((sum, inv) => sum + inv.monto, 0),
    pagadas: pagadasInvoices.length,
    pagadasMonto: pagadasInvoices.reduce((sum, inv) => sum + inv.monto, 0),
    porPagar: porPagarInvoices.length,
    porPagarMonto: porPagarInvoices.reduce((sum, inv) => sum + inv.monto, 0),
    canceladas: canceladasInvoices.length,
    canceladasMonto: canceladasInvoices.reduce((sum, inv) => sum + inv.monto, 0),
  };
});

// Computed para filtrar facturas por estatus
const filteredInvoices = computed(() => {
  if (!filterStatus.value) return invoices.value;
  return invoices.value.filter(inv => inv.estatus === filterStatus.value);
});

// Métodos auxiliares
const getStatusColor = (status) => {
  const colors = {
    'Pagada': 'positive',
    'Por pagar': 'warning',
    'Cancelada': 'negative'
  };
  return colors[status] || 'grey';
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};
</script>

<style scoped>
.q-card {
  border-radius: 8px;
}
</style>
