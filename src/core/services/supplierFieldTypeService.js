import { api } from 'boot/axios';

const baseEndpoint = "/SupplierFieldType"

const getAll = async () => {
  const response = await api.get(baseEndpoint);
  return response;
};

const getById = async (id) => {
  const response = await api.get(`${baseEndpoint}/${id}`);
  return response;
};

const add = async (payload) => {
  const response = await api.post(baseEndpoint, payload);
  return response;
}

const update = async (payload) => {
  const response = await api.put(`${baseEndpoint}/${payload.id}`, payload);
  return response;
}

export const supplierFieldTypeService = {
    add,
    getAll,
    getById,
    update,
};
