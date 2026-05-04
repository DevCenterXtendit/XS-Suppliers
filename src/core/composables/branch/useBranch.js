import { reactive, ref } from "vue";
import { customerService } from "src/core/services/customerService";
import { societyGlService } from "src/core/services/societyGlService";
import { societyFiService } from "src/core/services/societyFiService";
import { branchService } from "src/core/services/branchService";

const currentCustomer = ref(null);
const currentSocietyGl = ref(null);
const currentSocietyFi = ref(null);
const branches = ref([]);
const branch = reactive({});
const openForm = ref(false);

const useBranch = () => {
  const customers = ref([])
  const societiesGl = ref([]);
  const societiesFi = ref([]);

  const initBranch = () => {
    return {
      id: 0,
      code: '',
      name : '',
      societyFiId: 0
    }
  }

  const getCustomers = async () => {
    customers.value = await customerService.getList();
  }

  const getSocietiesGl = async () => {
    const idToUse = currentCustomer?.value?.id ?? null;
    societiesGl.value = await societyGlService.getList(idToUse);
  }

  const getSocietiesFi = async () => {
    societiesFi.value = await societyFiService.getListBySocietyGl(currentSocietyGl.value.id);
  }

  const getBranches = async () => {
    branches.value = await branchService.getAllBySocietyFi(currentSocietyFi.value.id);
  }

  const getBranch = async (branchId) => {
    Object.assign(branch, initBranch());
    const response = await branchService.getById(branchId);
    Object.assign(branch, response);
    openForm.value = true;
  }

  const addBranch = () => {
    Object.assign(branch, initBranch());
    branch.societyFiId = currentSocietyFi.value.id;
    branch.customerId = currentCustomer?.value?.id ?? null;
    openForm.value = true;
  }

  const handleSave = async () => {
    if(branch.id == 0){
      await branchService.add(branch);
    }else{
      await branchService.update(branch);
    }
    openForm.value = false;
    await getBranches();
  }

  const removeBranch = async (branchId) => {
    const confirmed = await confirm('¿Estás seguro que desea eliminar esta sucursal?');

    if (confirmed) {
      console.log('se elimina la sucursal', branchId)
    }
  };

  return {
    customers,
    currentCustomer,
    societiesGl,
    currentSocietyGl,
    societiesFi,
    currentSocietyFi,
    branches,
    branch,
    openForm,

    getCustomers,
    getSocietiesGl,
    getSocietiesFi,
    getBranches,
    getBranch,
    addBranch,
    handleSave,
    removeBranch
  }
}

export default useBranch;
