import { api } from 'boot/axios';

const baseEndpoint = "/users"

export const getAll = async () => {
  const response = await api.get(baseEndpoint);
  return response;
};

export const getById = async (userId) => {
  const response = await api.get(`${baseEndpoint}/${userId}`);
  return response;
};

export const add = async (user) => {
  const response = await api.post(baseEndpoint, user);
  return response;
}

export const update = async (user) => {
  const response = await api.put(`${baseEndpoint}/${user.id}`, user);
  return response;
}
