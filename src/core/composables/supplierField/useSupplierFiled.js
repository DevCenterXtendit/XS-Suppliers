import { ref } from 'vue'
import { customerService } from 'src/core/services/customerService';
import { supplierFieldService } from 'src/core/services/supplierFieldService';

const useSupplierField = () => {
  const customers = ref([]);
  const currentCustomerId = ref(null);
  const supplierFields = ref([]);

  const getCustomers = async () => {
    customers.value = await customerService.getAll();
  }

  const onSelectedCustomer = async () => {
    await getSupplierFields();
  }

  const getSupplierFields = async () => {
    const response = await supplierFieldService.getAll();
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
    onSelectedCustomer
  }
}

export default useSupplierField;
