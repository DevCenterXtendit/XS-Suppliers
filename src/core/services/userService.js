import { api } from 'boot/axios';

const baseEndpoint = "/users"

const getAll = (companyTypeId) => {
  if(!companyTypeId){
    return api.get(baseEndpoint);
  }else{
    return api.get(`${baseEndpoint}?companyTypeId=${companyTypeId}`);
  }
};

const getById = (userId) => {
  return api.get(`${baseEndpoint}/${userId}`);
};

const add = (user) => {
  return api.post(baseEndpoint, user);
}

const update = (user) => {
  return api.put(`${baseEndpoint}/${user.id}`, user);
}

const setStatus = async (userId, status) => {
  return api.put(`${baseEndpoint}/${userId}/active`, status);
}

const remove = async (userId) => {
  return api.delete(`${baseEndpoint}/${userId}`);
}

export const userService = {
  getAll,
  getById,
  add,
  update,
  setStatus,
  remove
}
