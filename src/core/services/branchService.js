import { api } from 'boot/axios';

const baseEndpoint = "/branches"

const getAll = async () => {
  const response = await api.get(baseEndpoint);
  return response;
};

const getAllBySocietyFi = async (societyFiId) => {
  const response = await api.get(`societiesFi/${societyFiId}${baseEndpoint}`);
  return response;
}

const getById = async (id) => {
  const response = await api.get(`${baseEndpoint}/${id}`);
  return response;
};

const add = async (customer) => {
  const response = await api.post(baseEndpoint, customer);
  return response;
}

const update = async (customer) => {
  const response = await api.put(`${baseEndpoint}/${customer.id}`, customer);
  return response;
}

export const branchService = {
    getAll,
    getById,
    getAllBySocietyFi,
    add,
    update,
};
