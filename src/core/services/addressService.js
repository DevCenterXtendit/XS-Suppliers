import { api } from 'boot/axios';

const baseEndpoint = "/addresses"

const getAllByPostalCode = async (postalCode) => {
  return api.get(`${baseEndpoint}/${postalCode}/neighborhoods`);
};

export const addressService = {
  getAllByPostalCode
};
