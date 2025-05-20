import { api } from 'boot/axios';

const baseEndpoint = "/societiesGl"

const getAll = async () => {
  const response = await api.get(baseEndpoint);
  return response;
};

const getAllByCustomer = async (customerId) => {
  const response = await api.get(`Customers/${customerId}${baseEndpoint}`);
  return response;
};

const getById = async (id) => {
  const response = await api.get(`${baseEndpoint}/${id}`);
  return response;
};

const add = async (societyGl) => {
  const response = await api.post(baseEndpoint, societyGl);
  return response;
}

const update = async (societyGl) => {
  const response = await api.put(`${baseEndpoint}/${societyGl.id}`, societyGl);
  return response;
}

export const societyGlService = {
    add,
    getAll,
    getAllByCustomer,
    getById,
    update,
};
