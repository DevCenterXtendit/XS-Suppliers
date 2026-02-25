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

  const sendTemplate = async () => {
    if (!template.value) return;

    const response = await invoiceService.uploadTemplate(template.value);
    uploadResult.value = response;
  }

  return {
    invoices,
    openTemplateDialog,
    template,
    uploadResult,
    sendTemplate,
  }
}

export default useCustomerInvoices;
