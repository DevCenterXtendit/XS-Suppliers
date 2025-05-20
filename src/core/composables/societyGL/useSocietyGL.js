import { ref, reactive } from 'vue'
import { societyGlService } from 'src/core/services/societyGlService';
import { customerService } from 'src/core/services/customerService';

const currentCustomerId = ref(null);
const societyGl = reactive({});
const societiesGl = ref([]);
const openSocietyGlForm = ref(0);

const  useSocietyGL = () =>  {
  const customers = ref([]);

  const initSocietyGl = () => {
    return {
      id: 0,
      code: '',
      name : '',
      customerId: 0
    }
  }

  const getCustomers = async () => {
    customers.value = await customerService.getAll();
  }

  const onSelectedCustomer = async (customerId) => {
    currentCustomerId.value = customerId;
    await getSocietiesGlByCustomer();
  }

  const getSocietiesGlByCustomer = async () => {
    societiesGl.value = await societyGlService.getAllByCustomer(currentCustomerId.value);
  }

  const getSocietyGl = async (societyGlId) => {
    Object.assign(societyGl, initSocietyGl());
    const response = await societyGlService.getById(societyGlId);
    Object.assign(societyGl, response);
    openSocietyGlForm.value = true;
  }

  const addSocietyGl = () => {
    Object.assign(societyGl, initSocietyGl());
    societyGl.customerId = currentCustomerId;
    openSocietyGlForm.value = true;
  }

  const handleSaveSocietyGl = async () => {
    if(societyGl.id == 0){
      await societyGlService.add(societyGl);
    }else{
      await societyGlService.update(societyGl);
    }
    openSocietyGlForm.value = false;
    await getSocietiesGlByCustomer(currentCustomerId);
  }

  return{
    customers,
    currentCustomerId,
    societiesGl,
    societyGl,
    openSocietyGlForm,

    getCustomers,
    onSelectedCustomer,
    getSocietiesGlByCustomer,
    getSocietyGl,
    addSocietyGl,
    handleSaveSocietyGl,
  }

}

export default useSocietyGL;
