import { api } from '../../boot/axios'

export const authenticate = async (auth) => {
  const response = await api.post('/authentication', auth, {
    requiresAuth:false
  });

  return response;
};
