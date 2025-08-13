import { ref, reactive } from 'vue'
import { userService } from 'src/core/services/userService';
import { customerService } from 'src/core/services/customerService';
import { supplierService } from 'src/core/services/supplierService';
import { roleService } from 'src/core/services/roleService';

//common
import { useConfirmDialog } from 'src/core/composables/common/useConfirmDialog';

const companyType = ref(null);
const users = ref([]);
const user = reactive({});
const companies = ref([]);
const roles = ref([]);
const openUserForm = ref(false);

const useUser = () => {
  const { showConfirmDialog } = useConfirmDialog();

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

  //TODO: definir si el usuario cliente podría crear usuarios proveedores
  const getCompanies = async (typeCompanyId = null) => {
    const idToUse = companyType?.value?.id ?? typeCompanyId;
    switch (idToUse) {
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
    const idToUse = companyType?.value?.id ?? null;
    roles.value = await roleService.getAllByRoleType(idToUse);
  }

  const getUser = async (userId) => {
    Object.assign(user, initUser());
    const userResponse = await userService.getById(userId);
    debugger;
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

  const setUserStatus = async (status, user) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea ${status ? 'activar' : 'desactivar'} el usuario ${user.name}?`);

    if (confirmed) {
      await userService.setStatus(user.id, {isActive: status })
      user.isActive = status;
    }
  }

  const removeUser = async (user) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea eliminar el usuario ${user.name}?`);

    if (confirmed) {
       await userService.remove(user.id);
       await getUsers();
    }
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
    handleSaveUser,
    setUserStatus,
    removeUser,
  }
}

export default useUser;
