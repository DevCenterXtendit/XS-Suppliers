import { reactive, ref } from 'vue'
import { supplierFieldService } from 'src/core/services/supplierFieldService';

const supplierFields = ref([]);
const supplierField = reactive({});
const openSupplierFieldForm = ref(false);

const useSupplierField = () => {

  const initSupplierField = () => {
    return {
      id: 0,
      name : '',
      text : '',
      fieldTypeId: null
    }
  }

  const getSupplierFields = async () => {
    const response = await supplierFieldService.getAll();
    supplierFields.value = response;
  }

  const addSupplierField = async () => {
    Object.assign(supplierField, initSupplierField());
    openSupplierFieldForm.value = true;
  }

  const getSupplierField = async (supplierFieldId) => {
    Object.assign(supplierField, initSupplierField());
    const response = await supplierFieldService.getById(supplierFieldId);
    Object.assign(supplierField, response);
    openSupplierFieldForm.value = true;
  }

  const handleSaveSupplierField = async () => {
    if(supplierField.id == 0){
      await supplierFieldService.add(supplierField);
    }else{
      await supplierFieldService.update(supplierField);
    }
    openSupplierFieldForm.value = false;
    await getSupplierFields();
  }

  return {
    supplierFields,
    supplierField,
    openSupplierFieldForm,
    getSupplierFields,
    addSupplierField,
    getSupplierField,
    handleSaveSupplierField
  }
}

export default useSupplierField;
