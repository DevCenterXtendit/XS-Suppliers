import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth-store'
import { handleErrorResponse } from 'src/core/interceptors/handleErrorResponse'
import { handleSuccessResponse } from 'src/core/interceptors/handleSuccessResponse'
import { Loading, QSpinnerGears } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const baseURL = import.meta.env.VITE_XS_SUPPLIERS_API;

const api = axios.create({
  baseURL: baseURL
})

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

//interceptor for request
api.interceptors.request.use(
  (config) => {
    config.requiresAuth = config.requiresAuth !== false;

    const authStore = useAuthStore();

    if (config.requiresAuth) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    Loading.show({
      spinner: QSpinnerGears,
      // other props
    })
    return config;
  },
  (error) => {
    console.log('ERROR AL CREAR LA PETICIÓN: ', error);
    return Promise.reject(error);
  }
);

// Interceptor for response
api.interceptors.response.use(
  (resp) => {
    return handleSuccessResponse(resp);
  },
  (error) => {
    return handleErrorResponse(error);
  }
);

export { api }
