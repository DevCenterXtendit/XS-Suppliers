import { ref, reactive } from 'vue'

import {
  getAll
} from 'src/core/services/userService';



const useUser = () => {
  const users = ref([]);
  const user = reactive({});

  // const initUser = () => {
  //   return {
  //     id: 0,
  //     name: '',
  //     middleName: '',
  //     lastName: '',
  //     email: '',
  //     companyTypeId: null,
  //     companyId:null,
  //     roleIds: [],
  //   }
  // }

  async function getUsers () {
    users.value = await getAll();
  }


  return {
    user,
    users,

    //methods
    getUsers
  }
}

export default useUser;
