import { api } from 'boot/axios';

const baseEndpoint = "/societiesGl"

const getAll = async (customerId) => {
  const params = customerId ? `?customerId=${customerId}` : '';
  return await api.get(`${baseEndpoint}${params}`);
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
    getById,
    update,
};
