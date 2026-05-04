import { ref, reactive } from 'vue'
import { userService } from 'src/core/services/userService';
import { customerService } from 'src/core/services/customerService';
import { supplierService } from 'src/core/services/supplierService';
import { roleService } from 'src/core/services/roleService';

//common
import { useConfirmDialog } from 'src/core/composables/common/useConfirmDialog';
import useAuth from 'src/core/composables/auth/useAuth';
import { COMPANY_TYPE } from 'src/core/constants/company-type';


const companyType = ref(null);
const users = ref([]);
const user = reactive({});
const customers = ref([]);
const suppliers = ref([]);
const roles = ref([]);
const openUserForm = ref(false);
const customerId = ref(null);
const supplierId = ref(null);

const useUser = () => {

  const { userLogged } = useAuth();
  const { showConfirmDialog } = useConfirmDialog();

  const initUser = () => {
    return {
      id: 0,
      name: '',
      middleName: '',
      lastName: '',
      email: '',
      companyTypeId: null,
      companyId: null,
      roleIds: [],
    }
  }

  const getUsers = async () => {
    const idToUse = companyType?.value?.id ?? null;
    users.value = await userService.getAll(idToUse);
  }

  const getCustomers = async () => {
    customers.value = await customerService.getList();
  }

  const getSuppliers = async (customerId) => {
    suppliers.value = await supplierService.getList(customerId);
  }

  const getRoles = async () => {
    const idToUse = companyType?.value?.id ?? null;
    roles.value = await roleService.getList(idToUse);
  }

  const getUser = async (userId) => {
    Object.assign(user, initUser());
    const userResponse = await userService.getById(userId);

    if(userLogged.companyType == COMPANY_TYPE.XTENDIT) //si es xtendit se selecciona el tipo de compañia al que pertenece el usuario
    {
      if(userResponse.companyTypeId == 2) //Cliente
        customerId.value = userResponse.companyId;

      if(userResponse.companyTypeId == 3) //Proveedor
        await getCustomers();
        customerId.value = userResponse.customerId;
        await getSuppliers(userResponse.customerId);
        supplierId.value = userResponse.companyId;
    }

    Object.assign(user, userResponse);

    await getRoles();

    openUserForm.value = true;
  }

  const addUser = async () => {
    Object.assign(user, initUser());
    user.companyTypeId = companyType.value ? companyType.value.id : null;
    customerId.value = null;
    supplierId.value = null;

    if (userLogged.companyType == COMPANY_TYPE.XTENDIT){
      await getRoles();
      if(companyType.value.name  != COMPANY_TYPE.XTENDIT)
        await getCustomers();
    }else{
      await getRoles();
    }

    openUserForm.value = true;
  }

  const handleSaveUser = async () => {
    if(user.id == 0){
      if(userLogged.companyType == COMPANY_TYPE.XTENDIT) //si es xtendit se selecciona el tipo de compañia al que pertenece el usuario
      {
        if(companyType.value.id == 2)
          user.companyId = customerId.value;

        if(companyType.value.id == 3)
          user.companyId = supplierId.value;
      }

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
    customers,
    suppliers,
    roles,
    openUserForm,
    customerId,
    supplierId,

    //methods
    addUser,
    getUsers,
    getCustomers,
    getSuppliers,
    getRoles,
    getUser,
    handleSaveUser,
    setUserStatus,
    removeUser,
  }
}

export default useUser;
