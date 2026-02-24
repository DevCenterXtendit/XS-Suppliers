import { ref } from 'vue'
import { customerService } from 'src/core/services/customerService';
import { supplierFieldService } from 'src/core/services/supplierFieldService';
import { supplierFieldByCustomerService } from 'src/core/services/supplierFieldByCustomerService';

const useSupplierFieldConfiguration = () => {
  const customers = ref([]);
  const currentCustomer = ref(null);
  const supplierFields = ref([]);

  const getCustomers = async () => {
    customers.value = await customerService.getAllActive();
  }

  const getSupplierFieldsByCustomer = async () => {
    const idToUse = currentCustomer?.value?.id ?? null;
    const fieldsByCustomer = await supplierFieldByCustomerService.getAll(idToUse);

    const configMap = new Map(
      fieldsByCustomer.map(cfg => [cfg.fieldId, cfg])
    );

    supplierFields.value.forEach(field => {
      const cfg = configMap.get(field.id);
      if (cfg) {
        field.isVisible = !!cfg.isVisible;
        field.isRequired = !!cfg.isRequired;
        field.isTracked = true;
      } else {
        field.isVisible = false;
        field.isRequired = false;
      }
    });
  }

  const getSupplierFields = async () => {
    const response = await supplierFieldService.getAllWithDetail();
    supplierFields.value = response.map(field => ({
      ...field,
      isVisible: false,
      isRequired: false,
      isTracked: false
    }))
    console.log(supplierFields.value);
  }

  const handleSave = async () => {
    const idToUse = currentCustomer?.value?.id ?? null;
    
    const fieldsToSend = supplierFields.value.filter(f => f.isVisible || f.isTracked);
    
    const payload = {
      customerId : idToUse,
      supplierFields: fieldsToSend.map(f => ({
        fieldId: f.id,
        isVisible: f.isVisible,
        isRequired: f.isRequired
      }))
    };

    supplierFieldByCustomerService.add(payload);
  }

  return {
    customers,
    currentCustomer,
    supplierFields,
    getCustomers,
    getSupplierFields,
    getSupplierFieldsByCustomer,
    handleSave
  }
}

export default useSupplierFieldConfiguration;
