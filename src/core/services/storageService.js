export const storageService = {
  getItem(key, json=true) {
    try {
      const value = localStorage.getItem(key);

      if(json){
        return value ? JSON.parse(value) : null;
      }else{
        return value ? value : null;
      }

    } catch (error) {
      console.error(`Error al obtener el valor de ${key} desde localStorage:`, error);
      return null;
    }
  },

  setItem(key, value, json=true) {
    try {
      if(json){
        localStorage.setItem(key, JSON.stringify(value));
      }else{
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error al guardar el valor de ${key} en localStorage:`, error);
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar el valor de ${key} de localStorage:`, error);
    }
  },
};
