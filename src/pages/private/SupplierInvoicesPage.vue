<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-h6">Mis Facturas</div>
    </div>

    <!-- Cards de estadísticas -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="receipt_long" size="40px" color="blue" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Total Facturas</div>
              <div class="text-h5 text-weight-bold">{{ stats.total }}</div>
              <div class="text-caption text-grey-6">{{ formatCurrency(stats.totalAmount) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="check_circle" size="40px" color="positive" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Cobradas</div>
              <div class="text-h5 text-weight-bold text-positive">{{ stats.paid }}</div>
              <div class="text-caption text-grey-6">{{ formatCurrency(stats.paidAmount) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="schedule" size="40px" color="orange" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Programadas</div>
              <div class="text-h5 text-weight-bold text-orange">{{ stats.scheduled }}</div>
              <div class="text-caption text-grey-6">{{ formatCurrency(stats.scheduledAmount) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="cancel" size="40px" color="negative" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Canceladas</div>
              <div class="text-h5 text-weight-bold text-negative">{{ stats.cancelled }}</div>
              <div class="text-caption text-grey-6">{{ formatCurrency(stats.cancelledAmount) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Filtros y acciones -->
    <q-card 
      flat 
      class="q-pa-md q-my-md"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6 col-md-4 q-pr-sm">
          <q-select
            v-model="filterStatus"
            @update:model-value="onSelectedStatus"
            :options="invoiceStatusList"
            dense
            clearable
            label="Filtrar por estatus"
            map-options
            outlined
            option-label="name"
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
        row-key="externalId"
        class="col"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="getStatusColor(props.row.statusId)"
              :label="getStatusLabel(props.row.statusId)"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-total="props">
          <q-td :props="props">
            {{ formatCurrency(props.row.total) }}
          </q-td>
        </template>

        <template v-slot:body-cell-receivedDate="props">
          <q-td :props="props">
            {{ formatDate(props.row.receivedDate) }}
          </q-td>
        </template>

        <template v-slot:body-cell-actualPaymentDate="props">
          <q-td :props="props">
            {{ formatDate(props.row.actualPaymentDate) }}
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import useCustomerInvoices from 'src/core/composables/customerInvoces/useCustomerInvoices';
import invoiceStatusList from 'src/core/constants/invoice-status-list';
import { getInvoiceStatusColor, getInvoiceStatusLabel } from 'src/core/utils/invoice-status-helper';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';

const { invoices, getInvoices } = useCustomerInvoices();

const initialPagination = {
  rowsPerPage: 10,
};

const filter = ref('');
const filterStatus = ref(null);

const columns = [
  { name: 'externalId', label: 'ID', align: 'left', field: 'externalId', sortable: true },
  { name: 'number', label: 'FOLIO', align: 'left', field: 'number', sortable: true },
  { name: 'receivedDate', label: 'FECHA DE RECEPCIÓN', align: 'center', field: 'receivedDate', sortable: true },
  { name: 'actualPaymentDate', label: 'FECHA DE PAGO', align: 'center', field: 'actualPaymentDate', sortable: true },
  { name: 'status', label: 'ESTATUS', align: 'center', field: 'statusId', sortable: true },
  { name: 'total', label: 'MONTO', align: 'right', field: 'total', sortable: true },
];

const onSelectedStatus = (selectedStatus) => {
  filterStatus.value = selectedStatus;
};

// Usar helpers estándar de estatus
const getStatusColor = getInvoiceStatusColor;
const getStatusLabel = getInvoiceStatusLabel;

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};

const formatDate = (dateValue) => {
  if (!dateValue) return '';

  if (typeof dateValue === 'string') {
    const isoDateMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoDateMatch) {
      return `${isoDateMatch[3]}/${isoDateMatch[2]}/${isoDateMatch[1]}`;
    }
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return dateValue;

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};

// Computed para estadísticas
const stats = computed(() => {
  const paidInvoices = invoices.value.filter((inv) => inv.statusId === 4);
  const scheduledInvoices = invoices.value.filter((inv) => inv.statusId === 3);
  const cancelledInvoices = invoices.value.filter((inv) => inv.statusId === 6);

  return {
    total: invoices.value.length,
    totalAmount: invoices.value.reduce((sum, inv) => sum + inv.total, 0),
    paid: paidInvoices.length,
    paidAmount: paidInvoices.reduce((sum, inv) => sum + inv.total, 0),
    scheduled: scheduledInvoices.length,
    scheduledAmount: scheduledInvoices.reduce((sum, inv) => sum + inv.total, 0),
    cancelled: cancelledInvoices.length,
    cancelledAmount: cancelledInvoices.reduce((sum, inv) => sum + inv.total, 0),
  };
});

// Computed para filtrar facturas por estatus
const filteredInvoices = computed(() => {
  if (!filterStatus.value) return invoices.value;

  const selectedStatusId = Number(filterStatus.value?.id ?? filterStatus.value);
  if (Number.isNaN(selectedStatusId)) return invoices.value;

  return invoices.value.filter((inv) => inv.statusId === selectedStatusId);
});

onMounted(async () => {
  await getInvoices();
});
</script>
