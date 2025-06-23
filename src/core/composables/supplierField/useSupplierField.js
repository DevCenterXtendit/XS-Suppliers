import { reactive, ref } from 'vue'
import { supplierFieldService } from 'src/core/services/supplierFieldService';

const supplierFields = ref([]);
const supplierField = reactive({});
const openForm = ref(false);

const useSupplierField = () => {

  const initSupplierField = () => {
    return {
      id: 0,
      name : '',
      fieldTypeId: 0
    }
  }

  const getSupplierFields = async () => {
    const response = await supplierFieldService.getAll();
    supplierFields.value = response;
  }

  const addSupplierField = async () => {
    Object.assign(supplierField, initSupplierField());
    openForm.value = true;
  }

  const handleSaveSupplierField = async () => {
    console.log('Se guarda el campo');
  }

  return {
    supplierFields,
    supplierField,
    openForm,
    getSupplierFields,
    addSupplierField,
    handleSaveSupplierField
  }
}

export default useSupplierField;
