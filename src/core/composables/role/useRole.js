import { reactive, ref } from 'vue';
import { roleService } from "src/core/services/roleService";

import { useRouter } from 'vue-router';

const roleType = ref(null);
const roles = ref([]);
const role = reactive({});
const openRoleForm = ref(false);

const useRole = () => {

  const router = useRouter();

  const initRole = () => {
    return {
      id: 0,
      name: '',
      description: '',
      roleTypeId: null,
    }
  }

  const getRoles = async () => {
    roles.value = await roleService.getAllByRoleType(roleType.value.id);
  }

  const getRole = async (roleId) => {
    Object.assign(role, initRole());
    const response = await roleService.getById(roleId);
    Object.assign(role, response);
    openRoleForm.value = true;
  }

  const addRole = async () => {
    Object.assign(role, initRole());
    role.roleTypeId = roleType.value ? roleType.value.id : null;
    openRoleForm.value = true;
  }

  const handleSaveRole = async () => {
    let roleId = null;
    if(role.id == 0){
      roleId = await roleService.add(role);
    }else{
      await roleService.update(role);
    }
    // console.log('continua el código aunque se redirige a los permisos');
    if(roleId != null)
    {
       router.push({
        name: 'rolePermissions',
        params: { id: roleId },
        query: { roleName: role.name}
      })
    }

    openRoleForm.value = false;
    await getRoles();
  }

  const configurePermissions = (role) => {
    router.push({
      name: 'rolePermissions',
      params: { id: role.id },
      query: { roleName: role.name}
    })
  }

  return {
    getRoles,
    getRole,
    addRole,
    handleSaveRole,
    configurePermissions,
    roleType,
    roles,
    role,
    openRoleForm,
  }
}

export default useRole;
