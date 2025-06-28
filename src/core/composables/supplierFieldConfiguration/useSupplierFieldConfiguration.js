import { ref } from 'vue'
import { customerService } from 'src/core/services/customerService';
import { supplierFieldService } from 'src/core/services/supplierFieldService';

const useSupplierFieldConfiguration = () => {
  const customers = ref([]);
  const currentCustomerId = ref(null);
  const supplierFields = ref([]);


  const getCustomers = async () => {
    customers.value = await customerService.getAll();
  }

  const onSelectedCustomer = async () => {
    console.log('Se selecciona el cliente');
  }

  const getSupplierFields = async () => {
    const response = await supplierFieldService.getAllWithDetail();
    supplierFields.value = response.map(field => ({
      ...field,
      isVisible: false,
      isRequired: false
    }))
  }

  return {
    customers,
    currentCustomerId,
    supplierFields,
    getCustomers,
    getSupplierFields,
    onSelectedCustomer,
  }
}

export default useSupplierFieldConfiguration;
