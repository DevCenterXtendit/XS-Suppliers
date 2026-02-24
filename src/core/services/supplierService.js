import { api } from 'boot/axios';

const baseEndpoint = "/Suppliers"

const getAll = async (customerId) => {
  if(!customerId){
    return api.get(baseEndpoint)
  }else{
    return api.get(`${baseEndpoint}?customerId=${customerId}`);
  }
};

const getById = async (id) => {
  return await api.get(`${baseEndpoint}/${id}`);
};

const add = async (supplier) => {
  return await api.post(baseEndpoint, supplier);
}

const update = async (supplier) => {
  return await api.put(`${baseEndpoint}/${supplier.id}`, supplier);
}

const getDetailById = async (id) => {
   return await api.get(`${baseEndpoint}/${id}/detail`); 
}

const setFieldsValue = async (id, fields) => {
  return await api.put(`${baseEndpoint}/${id}/detail`, fields);
}

const setStatus = async (id, status) => {
  return api.put(`${baseEndpoint}/${id}/active`, status);
}

export const supplierService = {
    getAll,
    getById,
    add, 
    update,
    getDetailById,
    setFieldsValue,
    setStatus
};
