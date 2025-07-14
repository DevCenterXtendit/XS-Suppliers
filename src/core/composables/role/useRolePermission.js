import { ref } from 'vue';
import { permissionService } from 'src/core/services/permissionService';
import { roleService } from 'src/core/services/roleService';
import moduleIconList from 'src/core/constants/module-icon-list';

import { useRouter } from 'vue-router';

const useRolePermission = () => {

  const router = useRouter();

  const modules = ref([]);

  const getModules = async () => {
    let modulesWithPermissions = await permissionService.getAll();
    modules.value = mapPermission(moduleIconList, modulesWithPermissions);
  }

  const getPermissionsByRole = async (roleId) =>{
    const rolePermissions = await roleService.getPermissions(roleId);
    mapEnabledPermissions(modules.value, rolePermissions.permissions);
  }

  const updatePermissionsByRole = (roleId) => {
    const permissions = getAssignedPermissions(roleId, modules.value);
    roleService.updatePermissions(permissions);
    router.go(-1);
  }

  const mapPermission = (modulesCatalog, modulesWithPermissions) => {
    return modulesWithPermissions.map(module => {
      const catalogItem = modulesCatalog.find(m => m.id === module.id)
      return {
        ...module,
        icon: catalogItem ? catalogItem.icon : null,
        permissions: module.permissions.map(perm => ({
          ...perm,
          enabled: false
        }))
      }
    })
  }

  const getAssignedPermissions = (roleId, modulesWithPermissions) => {
    const permissions = modulesWithPermissions
      .flatMap(module =>
        module.permissions.filter(perm => perm.enabled).map(perm => perm.id)
      )
    return {
      roleId,
      permissions
    }
  }

  const mapEnabledPermissions = (modulesWithPermissions, permissionsFromBackend) => {
    const activeIds = new Set(permissionsFromBackend)
    modulesWithPermissions.forEach(module => {
      module.permissions.forEach(perm => {
        perm.enabled = activeIds.has(perm.id)
      })
    })
  }

  return {
    modules,
    getModules,
    getPermissionsByRole,
    updatePermissionsByRole
  }
}

export default useRolePermission;
