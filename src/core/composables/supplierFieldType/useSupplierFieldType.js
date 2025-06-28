import { reactive, ref } from 'vue'
import { supplierFieldTypeService } from 'src/core/services/supplierFieldTypeService';

const supplierFieldTypes = ref([]);
const supplierFieldType = reactive({});
const openSupplierFieldTypeForm = ref(false);

const useSupplierFieldType = () => {

  const initSupplierFieldType = () => {
    return {
      id: 0,
      name : '',
      text: '',
    }
  }

  const getSupplierFieldTypes = async () => {
    const response = await supplierFieldTypeService.getAll();
    supplierFieldTypes.value = response;
  }

  const addSupplierFieldType = () => {
    Object.assign(supplierFieldType, initSupplierFieldType());
    openSupplierFieldTypeForm.value = true;
  }

  const getSupplierFieldType = async (supplierFieldId) => {
    Object.assign(supplierFieldType, initSupplierFieldType());
    const response = await supplierFieldTypeService.getById(supplierFieldId);
    Object.assign(supplierFieldType, response);
    openSupplierFieldTypeForm.value = true;
  }

  const handleSaveSupplierFieldType = async () => {
    if(supplierFieldType.id == 0){
      await supplierFieldTypeService.add(supplierFieldType);
    }else{
      await supplierFieldTypeService.update(supplierFieldType);
    }
    openSupplierFieldTypeForm.value = false;
    await getSupplierFieldTypes();
  }

  return {
    supplierFieldTypes,
    supplierFieldType,
    openSupplierFieldTypeForm,
    getSupplierFieldTypes,
    addSupplierFieldType,
    getSupplierFieldType,
    handleSaveSupplierFieldType
  }
}

export default useSupplierFieldType;
