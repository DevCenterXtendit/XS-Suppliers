import invoiceStatusList from 'src/core/constants/invoice-status-list';

/**
 * Mapa de colores por ID de estatus de factura
 * Colores estandarizados para usar en toda la aplicación
 */
const STATUS_COLORS = {
  1: 'warning',      // Proceso de verificación
  2: 'info',         // Verificada
  3: 'info',         // Programada para pago
  4: 'positive',     // Pagada
  5: 'negative',     // Bloqueada
  6: 'negative',     // Cancelada
  7: 'negative',     // Verificación errónea
  8: 'warning',      // En aclaración
};

/**
 * Objeto mapeado de estatus por ID para búsqueda rápida
 */
const statusById = Object.fromEntries(
  invoiceStatusList.map((status) => [status.id, status])
);

/**
 * Obtiene el color de badge/badge para un estatus de factura
 * @param {number} statusId - ID del estatus de la factura
 * @returns {string} Color de Quasar (warning, info, positive, negative, grey)
 */
export const getInvoiceStatusColor = (statusId) => {
  return STATUS_COLORS[statusId] || 'grey';
};

/**
 * Obtiene el label/nombre del estatus de una factura
 * @param {number} statusId - ID del estatus de la factura
 * @returns {string} Nombre del estatus
 */
export const getInvoiceStatusLabel = (statusId) => {
  return statusById[statusId]?.name || 'Sin estatus';
};

/**
 * Obtiene el código del estatus de una factura
 * @param {number} statusId - ID del estatus de la factura
 * @returns {string} Código del estatus
 */
export const getInvoiceStatusCode = (statusId) => {
  return statusById[statusId]?.code || '';
};

/**
 * Obtiene el objeto completo del estatus
 * @param {number} statusId - ID del estatus de la factura
 * @returns {Object|null} Objeto del estatus o null si no existe
 */
export const getInvoiceStatus = (statusId) => {
  return statusById[statusId] || null;
};

/**
 * Verifica si un estatus es considerado "exitoso" o "completado"
 * @param {number} statusId - ID del estatus de la factura
 * @returns {boolean}
 */
export const isSuccessfulStatus = (statusId) => {
  return statusId === 4; // Pagada
};

/**
 * Verifica si un estatus es considerado "pendiente" o "en proceso"
 * @param {number} statusId - ID del estatus de la factura
 * @returns {boolean}
 */
export const isPendingStatus = (statusId) => {
  return [1, 2, 3, 8].includes(statusId);
};

/**
 * Verifica si un estatus es considerado "negativo" o "problema"
 * @param {number} statusId - ID del estatus de la factura
 * @returns {boolean}
 */
export const isNegativeStatus = (statusId) => {
  return [5, 6, 7].includes(statusId);
};
