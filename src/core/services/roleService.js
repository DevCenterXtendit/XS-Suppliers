import { api } from 'boot/axios';

const baseEndpoint = "/roles"

const getAllByRoleType = async (roleTypeId) => {
  const response = await api.get(`${baseEndpoint}?roleTypeId=${roleTypeId}`);
  return response;
};

const getById = async (id) => {
  const response = await api.get(`${baseEndpoint}/${id}`);
  return response;
};

const add = async (payload) => {
  const response = await api.post(baseEndpoint, payload);
  return response;
}

const update = async (payload) => {
  const response = await api.put(`${baseEndpoint}/${payload.id}`, payload);
  return response;
}

// const eliminate = async() => {

// }

const getPermissions = async(id) => {
  const response = await api.get(`${baseEndpoint}/${id}/permissions`);
  return response;
}

const updatePermissions = async (payload) => {
  const response = await api.put(`${baseEndpoint}/${payload.roleId}/permissions`, payload);
  return response;
}

export const roleService = {
  getAllByRoleType,
  getById,
  add,
  update,
  getPermissions,
  updatePermissions
};
