import { api } from 'boot/axios';

const baseEndpoint = "/roles"

const getAllByRoleType = async (roleTypeId) => {
  const response = await api.get(`rolesType/${roleTypeId}${baseEndpoint}`);
  return response;
};

export const roleService = {
  getAllByRoleType
};
