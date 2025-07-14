import { api } from 'boot/axios';

const baseEndpoint = "/permissions"

const getAll = async () => {
  const response = await api.get(`${baseEndpoint}`);
  return response;
};

export const permissionService = {
  getAll
};
