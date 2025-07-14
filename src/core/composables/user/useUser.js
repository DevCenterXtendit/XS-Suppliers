import { ref, reactive } from 'vue'
import { userService } from 'src/core/services/userService';
import { customerService } from 'src/core/services/customerService';
import { supplierService } from 'src/core/services/supplierService';
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
    const idToUse = companyType?.value?.id ?? null;
    users.value = await userService.getAll(idToUse);
  }

  const getCompanies = async () => {
    companies.value = [];
    switch (companyType.value.id) {
      case 2:
        companies.value = await customerService.getAll();
        break;
      case 3:
        companies.value = await supplierService.getAll();
        break;
      default:
        break;
    }
  }

  const getRoles = async () => {
    roles.value = await roleService.getAllByRoleType(companyType.value.id);
  }

  const getUser = async (userId) => {
    Object.assign(user, initUser());
    const userResponse = await userService.getById(userId);
    Object.assign(user, userResponse);
    openUserForm.value = true;
  }

  const addUser = () => {
    Object.assign(user, initUser());
    user.companyTypeId = companyType.value ? companyType.value.id : null;
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
    getUsers,
    getCompanies,
    getRoles,
    getUser,
    handleSaveUser
  }
}

export default useUser;
