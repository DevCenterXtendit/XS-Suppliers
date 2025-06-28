import { ref, reactive } from 'vue'
import { userService } from 'src/core/services/userService';


import { customerService } from 'src/core/services/customerService';
import { roleService } from 'src/core/services/roleService';

const companyType = ref(null);
const users = ref([]);
const user = reactive({});
const companies = ref([]);
const roles = ref([]);
const openUserForm = ref(false);

const useUser = () => {

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
    users.value = await userService.getAll();
  }

  const getUser = async (userId) => {
    Object.assign(user, initUser());
    const userResponse = await userService.getById(userId);
    Object.assign(user, userResponse);
    openUserForm.value = true;
  }

  const getCompanies = async () => {
    companies.value = [];
    switch (companyType.value.id) {
      case 2:
        companies.value = await customerService.getAll();
        break;
      case 3:
        //Cargar empresas proveedor
        break;
      default:
        break;
    }
    roles.value = await roleService.getAllByRoleType(companyType.value.id);
  }

  const addUser = () => {
    Object.assign(user, initUser());
    user.companyTypeId = companyType.value.id;
    openUserForm.value = true;
  }

   const handleSaveUser = async () => {
    if(user.id == 0){
      await userService.add(user);
    }else{
      await userService.update(user);
    }
    openUserForm.value = false;
    await getUsers();
  }

  return {
    companyType,
    users,
    user,
    companies,
    roles,
    openUserForm,

    //methods
    addUser,
    getCompanies,
    getUser,
    getUsers,
    handleSaveUser
  }
}

export default useUser;
