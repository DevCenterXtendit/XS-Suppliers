import { api } from 'boot/axios';

const baseEndpoint = "/addresses"

const getAllByPostalCode = async (postalCode) => {
  const response = await api.get(`${baseEndpoint}/${postalCode}/neighborhoods`);
  return response;
};

export const addressService = {
  getAllByPostalCode
};
