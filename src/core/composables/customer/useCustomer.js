import { ref, reactive } from 'vue'
import { customerService } from 'src/core/services/customerService';

const customers = ref([]);
const customer = reactive({});
const openCustomerForm = ref(false);

const useCustomer = () => {
  const initCustomer = () => {
    return {
      id: 0,
      code: '',
      name : '',
    }
  }

  const getCustomers = async () => {
    customers.value = await customerService.getAll();
  }

  const getCustomer = async (customerId) => {
    Object.assign(customer, initCustomer());
    const customerResponse = await customerService.getById(customerId);
    Object.assign(customer, customerResponse);
    openCustomerForm.value = true;
  }

  const addCustomer = () => {
    Object.assign(customer, initCustomer());
    openCustomerForm.value = true;
  }

  const handleSaveCustomer = async () => {
    if(customer.id == 0){
      await customerService.add(customer);
    }else{
      await customerService.update(customer);
    }
    openCustomerForm.value = false;
    await getCustomers();
  }


  return {
    customer,
    customers,
    openCustomerForm,

    addCustomer,
    getCustomer,
    getCustomers,
    handleSaveCustomer,
  }
}

export default useCustomer;
