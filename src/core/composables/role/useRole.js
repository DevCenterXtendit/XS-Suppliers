import { reactive, ref } from 'vue';
import { roleService } from "src/core/services/roleService";

import { useRouter } from 'vue-router';

//common
import { useConfirmDialog } from 'src/core/composables/common/useConfirmDialog';

const roleType = ref(null);
const roles = ref([]);
const role = reactive({});
const openRoleForm = ref(false);

const useRole = () => {
  const { showConfirmDialog } = useConfirmDialog();

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

  const setRoleStatus = async (status, role) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea ${status ? 'activar' : 'desactivar'} el rol ${role.name}?`);

    if (confirmed) {
      await roleService.setStatus(role.id, {isActive: status })
      role.isActive = status;
    }
  }

  const removeRole = async (role) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea eliminar el rol ${role.name}?`);

    if (confirmed) {
        await roleService.remove(role.id);
        await getRoles();
    }
  }

  return {
    roleType,
    roles,
    role,
    openRoleForm,

    getRoles,
    getRole,
    addRole,
    handleSaveRole,
    configurePermissions,
    setRoleStatus,
    removeRole
  }
}

export default useRole;
