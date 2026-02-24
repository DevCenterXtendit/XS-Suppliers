import { api } from 'boot/axios';

const baseEndpoint = "/invoices"

const uploadTemplate = (templateFile) => {
  const formData = new FormData();
  formData.append('invoiceTemplate', templateFile);

  return api.post(`${baseEndpoint}/import`, formData); 
}

export const invoiceService = {
  uploadTemplate
}