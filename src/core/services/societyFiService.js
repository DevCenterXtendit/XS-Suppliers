import { api } from 'boot/axios';

const baseEndpoint = "/societiesFi"

const getAllBySocietyGl = async (societyGlId) => {
   return api.get(`SocietiesGl/${societyGlId}${baseEndpoint}`);
};

const getById = async (id) => {
  return api.get(`${baseEndpoint}/${id}`);
};

const add = async (societyFi) => {
  return api.post(baseEndpoint, societyFi);
}

const update = async (societyFi) => {
  return await api.put(`${baseEndpoint}/${societyFi.id}`, societyFi);
}

export const societyFiService = {
    add,
    getAllBySocietyGl,
    getById,
    update,
};
