import { api } from 'boot/axios';

const baseEndpoint = "/invoices"

const getAll = () => {
    return api.get(`${baseEndpoint}/customer`);
}

const uploadTemplate = (templateFile) => {
  const formData = new FormData();
  formData.append('invoiceTemplate', templateFile);

  return api.post(`${baseEndpoint}/customer/import`, formData);
}

export const invoiceService = {
  getAll,
  uploadTemplate,
}
