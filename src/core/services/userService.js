import { api } from 'boot/axios';

const baseEndpoint = "/users"

const getAll = (companyTypeId) => {
  const params = companyTypeId ? `?companyTypeId=${companyTypeId}` : '';
  return api.get(`${baseEndpoint}${params}`);
};

// const getAllActive = (companyTypeId) => {
//   const params = companyTypeId ? `?companyTypeId=${companyTypeId}` : '';
//   return api.get(`${baseEndpoint}/list${params}`);
// };

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
  // getAllActive,
  getById,
  add,
  update,
  setStatus,
  remove
}
