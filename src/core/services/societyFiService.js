import { api } from 'boot/axios';

const baseEndpoint = "/societiesFi"

const getAll = async () => {
  const response = await api.get(baseEndpoint);
  return response;
};

const getAllBySocietyGl = async (societyGlId) => {
  const response = await api.get(`SocietiesGl/${societyGlId}${baseEndpoint}`);
  return response;
};

const getById = async (id) => {
  const response = await api.get(`${baseEndpoint}/${id}`);
  return response;
};

const add = async (societyFi) => {
  const response = await api.post(baseEndpoint, societyFi);
  return response;
}

const update = async (societyFi) => {
  const response = await api.put(`${baseEndpoint}/${societyFi.id}`, societyFi);
  return response;
}

export const societyFiService = {
    add,
    getAll,
    getAllBySocietyGl,
    getById,
    update,
};
