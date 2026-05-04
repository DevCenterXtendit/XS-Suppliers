import { ref } from 'vue';
// import { invoiceService } from 'src/core/services/invoiceService';

const useSupplierInvoices = () => {
  const invoices = ref([]);
  return {
    invoices,
  }
}

export default useSupplierInvoices;
