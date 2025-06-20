import { api } from 'boot/axios';

const baseEndpoint = "/SupplierFields"

const getAll = async () => {
  const response = await api.get(baseEndpoint);
  return response;
};

export const supplierFieldService = {
    getAll
};
