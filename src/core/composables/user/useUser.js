import { ref, reactive } from 'vue'

import {
  getAll,
  getById
} from 'src/core/services/userService';

import * as customerService from 'src/core/services/customerService';

const useUser = () => {
  const users = ref([]);
  const user = reactive({});
  const companies = ref([]);
  const openUserForm = ref(false);

  const initUser = () => {
    return {
      id: 0,
      name: '',
      middleName: '',
      lastName: '',
      email: '',
      companyTypeId: null,
      companyId:null,
      roleIds: [],
    }
  }

  const getUsers = async () => {
    users.value = await getAll();
  }

  const getUser = async (userId) => {
    Object.assign(user, initUser());
    const userResponse = await getById(userId);
    Object.assign(user, userResponse);
    openUserForm.value = true;
  }

  const getCompanies = async (companyTypeId) => {
    companies.value = [];
    switch (companyTypeId) {
      case 2:
        companies.value = await customerService.getAll();
        break;
      case 3:
        //Cargar empresas proveedor
        break;
      default:
        break;
    }
  }

  const addUser = () => {
    Object.assign(user, initUser());
    openUserForm.value = true;
  }

  return {
    companies,
    user,
    users,
    openUserForm,

    //methods
    addUser,
    getCompanies,
    getUser,
    getUsers,
  }
}

export default useUser;
