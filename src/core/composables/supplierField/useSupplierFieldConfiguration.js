import { reactive, ref } from 'vue'
import { customerService } from 'src/core/services/customerService';
import { supplierFieldService } from 'src/core/services/supplierFieldService';

const supplierField = reactive({});
const openForm = ref(false);

const useSupplierField = () => {
  const customers = ref([]);
  const currentCustomerId = ref(null);
  const supplierFields = ref([]);

  const initSupplierField = () => {
    return {
      id: 0,
      name : '',
      fieldTypeId: 0
    }
  }

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

  const addSupplierField = async () => {
    Object.assign(supplierField, initSupplierField());
    openForm.value = true;
  }

  const handleSaveSupplierField = async () => {
    console.log('Se guarda el campo');
  }

  return {
    customers,
    currentCustomerId,
    supplierFields,
    supplierField,
    openForm,
    getCustomers,
    onSelectedCustomer,
    addSupplierField,
    handleSaveSupplierField
  }
}

export default useSupplierField;
