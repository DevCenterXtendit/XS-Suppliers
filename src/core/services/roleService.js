import { api } from 'boot/axios';

const baseEndpoint = "/roles"

const getAllByRoleType = async (roleTypeId) => {
  const params = roleTypeId ? `?roleTypeId=${roleTypeId}` : '';
  return await api.get(`${baseEndpoint}${params}`);
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

const getPermissions = async(id) => {
  const response = await api.get(`${baseEndpoint}/${id}/permissions`);
  return response;
}

const updatePermissions = async (payload) => {
  const response = await api.put(`${baseEndpoint}/${payload.roleId}/permissions`, payload);
  return response;
}

const setStatus = async (id, status) => {
  const response = await api.put(`${baseEndpoint}/${id}/active`, status);
  return response;
}

const remove = async (id) => {
  const response = await api.delete(`${baseEndpoint}/${id}`);
  return response;
}

export const roleService = {
  getAllByRoleType,
  getById,
  add,
  update,
  getPermissions,
  updatePermissions,
  setStatus,
  remove
};
