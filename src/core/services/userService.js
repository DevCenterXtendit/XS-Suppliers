import { api } from 'boot/axios';

const baseEndpoint = "/users"

const getAll = async (companyTypeId) => {
  let response = null;

  if(!companyTypeId){
    response = await api.get(baseEndpoint);
  }else{
    response = await api.get(`${baseEndpoint}?companyTypeId=${companyTypeId}`);
  }

  return response;
};

const getById = async (userId) => {
  const response = await api.get(`${baseEndpoint}/${userId}`);
  return response;
};

const add = async (user) => {
  const response = await api.post(baseEndpoint, user);
  return response;
}

const update = async (user) => {
  const response = await api.put(`${baseEndpoint}/${user.id}`, user);
  return response;
}

const setStatus = async (userId, status) => {
  const response = await api.put(`${baseEndpoint}/${userId}/active`, status);
  return response;
}

const remove = async (userId) => {
  const response = await api.delete(`${baseEndpoint}/${userId}`);
  return response;
}

export const userService = {
  getAll,
  getById,
  add,
  update,
  setStatus,
  remove
}
