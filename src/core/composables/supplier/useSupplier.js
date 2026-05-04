import { ref } from "vue";
import { customerService } from "src/core/services/customerService";
import { supplierService } from "src/core/services/supplierService";

//common
import { useConfirmDialog } from "src/core/composables/common/useConfirmDialog";

const currentCustomer = ref(null);
const suppliers = ref([]);
const supplier = ref(initSupplier());
const supplierDetail = ref([]);
const currentSupplierId = ref(null);
const openSupplierForm = ref(false);
const openSupplierDetailForm = ref(false);

function initSupplier () {
  return {
    id: 0,
    name: '',
    legalName: '',
    rfc: '',
    email: '',
    supplierTypeId: 1,
    customerId: null,
    address: {
      street: '',
      exteriorNumber: '',
      interiorNumber: null,
      neighborhoodId : null,
    },
    country:null,
  }
}

const useSupplier = () => {
  const customers = ref([]);
  const { showConfirmDialog } = useConfirmDialog();

  const getCustomers = async () => {
    customers.value = await customerService.getAllActive();
  }

  const getSuppliers = async () => {
    const idToUse = currentCustomer.value?.id ?? null;
    suppliers.value = await supplierService.getAll(idToUse);
  }

  const addSupplier = () => {
    supplier.value = initSupplier();
    supplier.value.customerId = currentCustomer.value?.id ?? null;
    openSupplierForm.value = true;
  }

  const getSupplier = async (suppplierId) => {
    supplier.value = await supplierService.getById(suppplierId);
    openSupplierForm.value = true;
  }

  const handleSave = async () => {
    if(supplier.value.id == 0){
      await supplierService.add(supplier.value);
    }else{
      await supplierService.update(supplier.value);
    }

    openSupplierForm.value = false;
    getSuppliers();
  }

  const configDetail = async (supplier) => {
    supplierDetail.value = await supplierService.getDetailById(supplier.id);
    currentSupplierId.value = supplier.id;
    openSupplierDetailForm.value = true;
  }

  const setFieldValues = async () => {
    const fieldsToSend = supplierDetail.value.filter(f => f.value != null);
    await supplierService.setFieldsValue(currentSupplierId.value, fieldsToSend);
  }

  const setSupplierStatus = async (status, supplier) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea ${status ? 'activar' : 'desactivar'} el proveedor ${supplier.name}?`);

    if (confirmed) {
      await supplierService.setStatus(supplier.id, {isActive: status })
      supplier.isActive = status;
    }
  }

  return {
    customers,
    currentCustomer,
    suppliers,
    supplier,
    supplierDetail,
    currentSupplierId,
    openSupplierForm,
    openSupplierDetailForm,

    getCustomers,
    getSuppliers,
    getSupplier,
    addSupplier,
    handleSave,
    configDetail,
    setFieldValues,
    setSupplierStatus
  }
}

export default useSupplier;
