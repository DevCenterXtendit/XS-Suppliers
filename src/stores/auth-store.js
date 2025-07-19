// stores/auth.js
import { defineStore } from 'pinia';
import { storageService } from '../core/services/storageService';
import { KEYS } from '../core/constants/storageKeys';
import menu from 'src/core/menu';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userLogged: storageService.getItem(KEYS.user) || null,
    permissions: storageService.getItem(KEYS.userPermissions) || null,
    token : storageService.getItem(KEYS.token) || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.userLogged && !!state.token,
    filteredMenu: (state) => {
      if (!state.permissions || state.permissions.length === 0) return [];

      const allowedModules = new Set(
        state.permissions
          .filter(p => p.name === 'View')
          .map(p => p.moduleName?.toLowerCase())
      );

      const filterRecursive = (items) => {
        return items
          .map(item => {
            if (item.name === 'dashboard') {
              return item;
            }
            if (item.children) {
              const filteredChildren = filterRecursive(item.children);
              if (filteredChildren.length > 0) {
                return { ...item, children: filteredChildren };
              }
            }
            if (item.name && allowedModules.has(item.name.toLowerCase())) {
              return item;
            }
            return null;
          })
          .filter(Boolean);
      };

      return filterRecursive(menu);
    }
  },
  actions: {
    login(userLogged, token, permissions) {
      this.userLogged = userLogged;
      this.permissions = permissions;
      this.token = token;

      storageService.setItem( KEYS.user, userLogged)
      storageService.setItem( KEYS.token, token);
      storageService.setItem( KEYS.userPermissions, permissions);
    },

    logout() {
      this.userLogged = null;
      this.permissions = null;
      this.token = null;

      storageService.removeItem(KEYS.user);
      storageService.removeItem(KEYS.token);
      storageService.removeItem(KEYS.userPermissions);
      storageService.removeItem(KEYS.theme);
    }
  },
});
