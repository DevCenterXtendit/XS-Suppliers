import { ref } from 'vue';
import { invoiceService } from 'src/core/services/invoiceService';

const invoices = ref([]);
const openTemplateDialog = ref(false);

const useCustomerInvoices = () => {
  const template = ref(null);
  const uploadResult = ref({
    success: false,
    totalRows: 0,
    validRows: 0,
    invalidRows: 0,
    errors: []
  });

  const getInvoices = async () => {
    invoices.value = await invoiceService.getAll();
   }

  const sendTemplate = async () => {
    if (!template.value) return;

    const response = await invoiceService.uploadTemplate(template.value);
    uploadResult.value = response;
    getInvoices();
  }

  return {
    invoices,
    openTemplateDialog,
    template,
    uploadResult,
    getInvoices,
    sendTemplate,
  }
}

export default useCustomerInvoices;
