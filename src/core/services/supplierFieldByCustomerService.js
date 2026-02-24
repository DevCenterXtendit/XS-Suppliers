import { api } from 'boot/axios';

const baseEndpoint = "/SupplierFieldByCustomer"

const getAll = async (customerId) => {
  if(!customerId){
    return api.get(baseEndpoint);
  }else{
    return api.get(`${baseEndpoint}?customerId=${customerId}`);
  }
};

const add = async (payload) => {
  return await api.post(baseEndpoint, payload);
}

export const supplierFieldByCustomerService = {
    getAll,
    add
};
