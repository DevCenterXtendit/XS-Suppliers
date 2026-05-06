<template>
  <q-page class="q-pa-md column no-wrap">
    <AppBreadcrumbs />

    <!-- Header con saludo personalizado -->
    <div class="text-h6">
      Hola, {{ fullName }}
    </div>
    <div class="text-subtitle1 text-grey-7 q-mb-md">
      Aquí está el resumen de tu gestión de proveedores del último mes
    </div>

    <!-- Tarjetas de métricas principales -->
    <div class="row q-col-gutter-md q-mb-md">
      <!-- Total Proveedores -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="diversity_3" size="40px" color="blue" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Total Proveedores</div>
              <div class="text-h5 text-weight-bold">{{ stats.totalSuppliers }}</div>
              <div class="text-caption text-positive">{{ stats.activeSuppliers }} activos</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Total Facturas -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="receipt_long" size="40px" color="primary" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Total Facturas</div>
              <div class="text-h5 text-weight-bold">{{ stats.totalInvoices }}</div>
              <div class="text-caption text-grey-6">Último mes</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Facturas Pendientes -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="pending_actions" size="40px" color="orange" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Pendientes</div>
              <div class="text-h5 text-weight-bold text-orange">{{ stats.pendingInvoices }}</div>
              <div class="text-caption text-grey-6">{{ formatCurrency(stats.pendingAmount) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Monto Total a Cobrar -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat>
          <q-card-section class="row items-center no-wrap">
            <q-icon name="attach_money" size="40px" color="green" class="q-mr-md" />
            <div>
              <div class="text-caption text-grey-7">Monto Total</div>
              <div class="text-h5 text-weight-bold text-green">{{ formatCurrency(stats.totalAmount) }}</div>
              <div class="text-caption text-grey-6">Último mes</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Estadísticas detalladas por estatus -->
    <div class="row q-col-gutter-md q-mb-md">
      <!-- Programadas -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-blue-2">
          <q-card-section>
            <div class="row items-center q-mb-xs">
              <q-icon name="schedule" size="20px" color="info" class="q-mr-xs" />
              <div class="text-overline text-grey-8">Programadas: <strong>{{ stats.scheduledInvoices }}</strong></div>
            </div>
            <div class="text-h4 text-info text-weight-bold">
              {{ formatCurrency(stats.scheduledAmount) }}
            </div>
            <div class="text-caption text-grey-8">{{ stats.scheduledPercentage }}% del total</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Cobradas -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-green-2">
          <q-card-section>
            <div class="row items-center q-mb-xs">
              <q-icon name="check_circle" size="20px" color="positive" class="q-mr-xs" />
              <div class="text-overline text-grey-8">Cobradas: <strong>{{ stats.paidInvoices }}</strong></div>
            </div>
            <div class="text-h4 text-positive text-weight-bold">
              {{ formatCurrency(stats.paidAmount) }}
            </div>
            <div class="text-caption text-grey-8">{{ stats.paidPercentage }}% del total</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Canceladas -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-red-2">
          <q-card-section>
            <div class="row items-center q-mb-xs">
              <q-icon name="cancel" size="20px" color="negative" class="q-mr-xs" />
              <div class="text-overline text-grey-8">Canceladas: <strong>{{ stats.cancelledInvoices }}</strong></div>
            </div>
            <div class="text-h4 text-negative text-weight-bold">
              {{ formatCurrency(stats.cancelledAmount) }}
            </div>
            <div class="text-caption text-grey-8">{{ stats.cancelledPercentage }}% del total</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- En Proceso -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="bg-orange-2">
          <q-card-section>
            <div class="row items-center q-mb-xs">
              <q-icon name="sync" size="20px" color="warning" class="q-mr-xs" />
              <div class="text-overline text-grey-8">En Proceso: <strong>{{ stats.inProcessInvoices }}</strong></div>
            </div>
            <div class="text-h4 text-warning text-weight-bold">
              {{ formatCurrency(stats.inProcessAmount) }}
            </div>
            <div class="text-caption text-grey-8">{{ stats.inProcessPercentage }}% del total</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Alertas de facturas próximas a vencer -->
    <q-card
      v-if="upcomingDueInvoices.length > 0"
      flat
      bordered
      class="q-mb-md alert-card"
    >
      <!-- Badge animado en esquina superior derecha -->
      <q-badge
        floating
        color="warning"
        class="pulse-badge"
        :label="upcomingDueInvoices.length"
      />

      <q-card-section>
        <div class="row items-center q-mb-sm">
          <q-icon name="warning" size="28px" color="warning" class="q-mr-sm" />
          <div class="text-h6 text-weight-bold">Facturas Próximas a Vencer</div>
        </div>
        <div class="text-body2 q-mb-md">
          {{ upcomingDueInvoices.length }} factura(s) con pago programado en los próximos 7 días
        </div>
        <q-list separator class="alert-list">
          <q-item v-for="invoice in upcomingDueInvoices" :key="invoice.externalId">
            <q-item-section avatar>
              <q-icon name="receipt" color="warning" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ invoice.supplierName }}</q-item-label>
              <q-item-label caption>Folio: {{ invoice.number }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ formatCurrency(invoice.total) }}</q-item-label>
              <q-item-label caption class="text-warning text-weight-medium">
                {{ getDaysUntilDue(invoice.actualPaymentDate) }} días restantes
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Gráfico de distribución de estatus -->
    <q-card flat class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">Distribución de Facturas por Estatus</div>
        <div class="q-mb-sm">
          <div class="row items-center q-mb-xs">
            <div class="col-3 text-caption">Programadas</div>
            <div class="col-7">
              <q-linear-progress
                :value="statusDistribution.scheduled / 100"
                color="info"
                size="20px"
                class="q-mr-sm"
              />
            </div>
            <div class="col-2 text-right text-caption text-weight-bold">
              {{ statusDistribution.scheduled }}%
            </div>
          </div>
          <div class="row items-center q-mb-xs">
            <div class="col-3 text-caption">Cobradas</div>
            <div class="col-7">
              <q-linear-progress
                :value="statusDistribution.paid / 100"
                color="positive"
                size="20px"
                class="q-mr-sm"
              />
            </div>
            <div class="col-2 text-right text-caption text-weight-bold">
              {{ statusDistribution.paid }}%
            </div>
          </div>
          <div class="row items-center q-mb-xs">
            <div class="col-3 text-caption">En Proceso</div>
            <div class="col-7">
              <q-linear-progress
                :value="statusDistribution.inProcess / 100"
                color="warning"
                size="20px"
                class="q-mr-sm"
              />
            </div>
            <div class="col-2 text-right text-caption text-weight-bold">
              {{ statusDistribution.inProcess }}%
            </div>
          </div>
          <div class="row items-center q-mb-xs">
            <div class="col-3 text-caption">Canceladas</div>
            <div class="col-7">
              <q-linear-progress
                :value="statusDistribution.cancelled / 100"
                color="negative"
                size="20px"
                class="q-mr-sm"
              />
            </div>
            <div class="col-2 text-right text-caption text-weight-bold">
              {{ statusDistribution.cancelled }}%
            </div>
          </div>
          <div class="row items-center">
            <div class="col-3 text-caption">Otras</div>
            <div class="col-7">
              <q-linear-progress
                :value="statusDistribution.others / 100"
                color="grey"
                size="20px"
                class="q-mr-sm"
              />
            </div>
            <div class="col-2 text-right text-caption text-weight-bold">
              {{ statusDistribution.others }}%
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Tabla de facturas recientes -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-8">
        <q-card flat>
          <q-card-section>
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h6">Facturas Recientes</div>
              <q-btn
                label="Ver todas"
                color="primary"
                flat
                dense
                no-caps
                @click="goToAllInvoices"
                icon-right="arrow_forward"
              />
            </div>
            <q-table
              :columns="columns"
              :rows="recentInvoices"
              :pagination="{ rowsPerPage: 5 }"
              hide-pagination
              flat
              row-key="externalId"
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
                <q-td :props="props" class="text-right">
                  <span class="text-weight-medium">{{ formatCurrency(props.row.total) }}</span>
                </q-td>
              </template>

              <template v-slot:body-cell-receivedDate="props">
                <q-td :props="props">
                  {{ formatDate(props.row.receivedDate) }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AppBreadcrumbs from 'src/components/common/AppBreadcrumbs.vue';
import useAuth from 'src/core/composables/auth/useAuth';
import { getInvoiceStatusColor, getInvoiceStatusLabel } from 'src/core/utils/invoice-status-helper';

const router = useRouter();
const { userLogged } = useAuth();

// Datos dummy de proveedores
const suppliers = [
  { id: 1, name: 'Proveedores Industriales SA', rfc: 'PIS010101ABC', email: 'contacto@piindustriales.com', isActive: true },
  { id: 2, name: 'Servicios Corporativos del Norte', rfc: 'SCN020202DEF', email: 'ventas@scnorte.com', isActive: true },
  { id: 3, name: 'Distribuidora Nacional', rfc: 'DNA030303GHI', email: 'info@distnacional.com', isActive: true },
  { id: 4, name: 'Tecnología y Soluciones', rfc: 'TYS040404JKL', email: 'soporte@tecysol.com', isActive: true },
  { id: 5, name: 'Materiales de Construcción', rfc: 'MDC050505MNO', email: 'compras@matconst.com', isActive: true },
  { id: 6, name: 'Suministros Empresariales', rfc: 'SEM060606PQR', email: 'ventas@sumempre.com', isActive: true },
  { id: 7, name: 'Logística Integral', rfc: 'LIN070707STU', email: 'contacto@logintegral.com', isActive: false },
  { id: 8, name: 'Equipos y Herramientas', rfc: 'EYH080808VWX', email: 'info@equipherr.com', isActive: true },
];

// Datos dummy de facturas (últimos 30 días desde 05/05/2026)
const allInvoices = [
  { externalId: 'INV-2026-001', number: 'A-10234', supplierId: 1, supplierName: 'Proveedores Industriales SA', receivedDate: '2026-05-04', actualPaymentDate: '2026-05-08', statusId: 3, total: 45000.00 },
  { externalId: 'INV-2026-002', number: 'B-20145', supplierId: 2, supplierName: 'Servicios Corporativos del Norte', receivedDate: '2026-05-03', actualPaymentDate: '2026-05-10', statusId: 3, total: 78500.50 },
  { externalId: 'INV-2026-003', number: 'C-30456', supplierId: 3, supplierName: 'Distribuidora Nacional', receivedDate: '2026-05-02', actualPaymentDate: '2026-04-28', statusId: 4, total: 120000.00 },
  { externalId: 'INV-2026-004', number: 'D-40789', supplierId: 4, supplierName: 'Tecnología y Soluciones', receivedDate: '2026-05-01', actualPaymentDate: '2026-05-06', statusId: 3, total: 95000.75 },
  { externalId: 'INV-2026-005', number: 'E-50012', supplierId: 5, supplierName: 'Materiales de Construcción', receivedDate: '2026-04-30', actualPaymentDate: '2026-04-25', statusId: 4, total: 67800.00 },
  { externalId: 'INV-2026-006', number: 'F-60345', supplierId: 6, supplierName: 'Suministros Empresariales', receivedDate: '2026-04-29', actualPaymentDate: '2026-05-09', statusId: 3, total: 34500.00 },
  { externalId: 'INV-2026-007', number: 'G-70678', supplierId: 8, supplierName: 'Equipos y Herramientas', receivedDate: '2026-04-28', actualPaymentDate: '2026-04-20', statusId: 4, total: 89000.00 },
  { externalId: 'INV-2026-008', number: 'H-80901', supplierId: 1, supplierName: 'Proveedores Industriales SA', receivedDate: '2026-04-27', actualPaymentDate: '2026-05-11', statusId: 3, total: 52000.00 },
  { externalId: 'INV-2026-009', number: 'I-91234', supplierId: 2, supplierName: 'Servicios Corporativos del Norte', receivedDate: '2026-04-26', actualPaymentDate: '2026-05-20', statusId: 1, total: 41000.00 },
  { externalId: 'INV-2026-010', number: 'J-10567', supplierId: 3, supplierName: 'Distribuidora Nacional', receivedDate: '2026-04-25', actualPaymentDate: '2026-04-18', statusId: 4, total: 105000.00 },
  { externalId: 'INV-2026-011', number: 'K-11890', supplierId: 4, supplierName: 'Tecnología y Soluciones', receivedDate: '2026-04-24', actualPaymentDate: '2026-05-15', statusId: 2, total: 73000.00 },
  { externalId: 'INV-2026-012', number: 'L-12123', supplierId: 5, supplierName: 'Materiales de Construcción', receivedDate: '2026-04-22', actualPaymentDate: '2026-04-15', statusId: 6, total: 28000.00 },
  { externalId: 'INV-2026-013', number: 'M-13456', supplierId: 6, supplierName: 'Suministros Empresariales', receivedDate: '2026-04-20', actualPaymentDate: '2026-05-25', statusId: 1, total: 56000.00 },
  { externalId: 'INV-2026-014', number: 'N-14789', supplierId: 8, supplierName: 'Equipos y Herramientas', receivedDate: '2026-04-18', actualPaymentDate: '2026-04-10', statusId: 4, total: 92000.00 },
  { externalId: 'INV-2026-015', number: 'O-15012', supplierId: 1, supplierName: 'Proveedores Industriales SA', receivedDate: '2026-04-15', actualPaymentDate: '2026-05-30', statusId: 2, total: 61000.00 },
  { externalId: 'INV-2026-016', number: 'P-16345', supplierId: 2, supplierName: 'Servicios Corporativos del Norte', receivedDate: '2026-04-12', actualPaymentDate: '2026-04-05', statusId: 4, total: 87000.00 },
  { externalId: 'INV-2026-017', number: 'Q-17678', supplierId: 3, supplierName: 'Distribuidora Nacional', receivedDate: '2026-04-10', actualPaymentDate: '2026-04-28', statusId: 8, total: 44000.00 },
  { externalId: 'INV-2026-018', number: 'R-18901', supplierId: 4, supplierName: 'Tecnología y Soluciones', receivedDate: '2026-04-08', actualPaymentDate: '2026-03-30', statusId: 6, total: 38000.00 },
];

// Computed: Facturas del último mes
const lastMonthInvoices = computed(() => {
  const today = new Date('2026-05-05');
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return allInvoices.filter(invoice => {
    const receivedDate = new Date(invoice.receivedDate);
    return receivedDate >= thirtyDaysAgo && receivedDate <= today;
  });
});

// Computed: Estadísticas generales
const stats = computed(() => {
  const invoices = lastMonthInvoices.value;
  const total = invoices.length;

  const activeSupps = suppliers.filter(s => s.isActive).length;
  const totalSupps = suppliers.length;

  const scheduledInvs = invoices.filter(inv => inv.statusId === 3);
  const paidInvs = invoices.filter(inv => inv.statusId === 4);
  const cancelledInvs = invoices.filter(inv => inv.statusId === 6);
  const inProcessInvs = invoices.filter(inv => [1, 2, 8].includes(inv.statusId));
  const pendingInvs = invoices.filter(inv => [1, 2, 3, 8].includes(inv.statusId));

  return {
    totalSuppliers: totalSupps,
    activeSuppliers: activeSupps,
    totalInvoices: total,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),

    scheduledInvoices: scheduledInvs.length,
    scheduledAmount: scheduledInvs.reduce((sum, inv) => sum + inv.total, 0),
    scheduledPercentage: total > 0 ? ((scheduledInvs.length / total) * 100).toFixed(1) : 0,

    paidInvoices: paidInvs.length,
    paidAmount: paidInvs.reduce((sum, inv) => sum + inv.total, 0),
    paidPercentage: total > 0 ? ((paidInvs.length / total) * 100).toFixed(1) : 0,

    cancelledInvoices: cancelledInvs.length,
    cancelledAmount: cancelledInvs.reduce((sum, inv) => sum + inv.total, 0),
    cancelledPercentage: total > 0 ? ((cancelledInvs.length / total) * 100).toFixed(1) : 0,

    inProcessInvoices: inProcessInvs.length,
    inProcessAmount: inProcessInvs.reduce((sum, inv) => sum + inv.total, 0),
    inProcessPercentage: total > 0 ? ((inProcessInvs.length / total) * 100).toFixed(1) : 0,

    pendingInvoices: pendingInvs.length,
    pendingAmount: pendingInvs.reduce((sum, inv) => sum + inv.total, 0),
  };
});

// Computed: Facturas recientes (últimas 5)
const recentInvoices = computed(() => {
  return [...lastMonthInvoices.value]
    .sort((a, b) => new Date(b.receivedDate) - new Date(a.receivedDate))
    .slice(0, 5);
});

// Computed: Facturas próximas a vencer (próximos 7 días)
const upcomingDueInvoices = computed(() => {
  const today = new Date('2026-05-05');
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  return lastMonthInvoices.value.filter(invoice => {
    const paymentDate = new Date(invoice.actualPaymentDate);
    return paymentDate >= today && paymentDate <= sevenDaysFromNow && [3].includes(invoice.statusId);
  }).sort((a, b) => new Date(a.actualPaymentDate) - new Date(b.actualPaymentDate));
});

// Computed: Distribución de estatus para gráfico
const statusDistribution = computed(() => {
  const total = lastMonthInvoices.value.length;
  if (total === 0) return { scheduled: 0, paid: 0, cancelled: 0, inProcess: 0, others: 0 };

  const scheduled = ((stats.value.scheduledInvoices / total) * 100).toFixed(1);
  const paid = ((stats.value.paidInvoices / total) * 100).toFixed(1);
  const cancelled = ((stats.value.cancelledInvoices / total) * 100).toFixed(1);
  const inProcess = ((stats.value.inProcessInvoices / total) * 100).toFixed(1);
  const others = (100 - parseFloat(scheduled) - parseFloat(paid) - parseFloat(cancelled) - parseFloat(inProcess)).toFixed(1);

  return {
    scheduled: parseFloat(scheduled),
    paid: parseFloat(paid),
    cancelled: parseFloat(cancelled),
    inProcess: parseFloat(inProcess),
    others: parseFloat(others) > 0 ? parseFloat(others) : 0,
  };
});

// Computed: Nombre completo del usuario
const fullName = computed(() => {
  const name = userLogged?.name?.split(' ')[0] || '';
  const lastName = userLogged?.lastNames?.split(' ')[0] || '';
  return name && lastName ? `${name} ${lastName}` : 'Usuario';
});

// Columnas de la tabla
const columns = [
  { name: 'number', label: 'FOLIO', align: 'left', field: 'number', sortable: true },
  { name: 'supplierName', label: 'PROVEEDOR', align: 'left', field: 'supplierName', sortable: true },
  { name: 'receivedDate', label: 'FECHA', align: 'center', field: 'receivedDate', sortable: true },
  { name: 'status', label: 'ESTATUS', align: 'center', field: 'statusId', sortable: true },
  { name: 'total', label: 'MONTO', align: 'right', field: 'total', sortable: true },
];

// Helpers de formateo
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

// Usar helpers estándar de estatus importados
const getStatusColor = getInvoiceStatusColor;
const getStatusLabel = getInvoiceStatusLabel;

const getDaysUntilDue = (paymentDate) => {
  const today = new Date('2026-05-05');
  const due = new Date(paymentDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};


const goToAllInvoices = () => {
  router.push('/supplier-management/supplier-invoices');
};
</script>

<style scoped>

/* Badge pulsante animado */
.pulse-badge {
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(242, 192, 55, 0.6);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(242, 192, 55, 0.6);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(242, 192, 55, 0.8);
  }
}
</style>
