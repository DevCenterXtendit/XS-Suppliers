import { reactive, ref } from "vue";
import { customerService } from "src/core/services/customerService";
import { societyGlService } from "src/core/services/societyGlService";
import { societyFiService } from "src/core/services/societyFiService";
import { branchService } from "src/core/services/branchService";

const currentCustomerId = ref(null);
const currentSocietyGlId = ref(null);
const currentSocietyFiId = ref(null);
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
    customers.value = await customerService.getAll();
  }

  const onSelectedCustomer = async () => {
    societiesGl.value = await societyGlService.getAllByCustomer(currentCustomerId.value);
    currentSocietyGlId.value = null;
  }

  const onSelectedSocietyGl = async () => {
    societiesFi.value = await societyFiService.getAllBySocietyGl(currentSocietyGlId.value);
    currentSocietyFiId.value = null;
  }

  const onSelectedSocietyFi = async () => {
    await getBranchesBySocietyFi()
  }

  const getBranchesBySocietyFi = async () => {
      branches.value = await branchService.getAllBySocietyFi(currentSocietyFiId.value);
  }

  const getBranch = async (branchId) => {
    Object.assign(branch, initBranch());
    const response = await branchService.getById(branchId);
    Object.assign(branch, response);
    openForm.value = true;
  }

  const addBranch = () => {
    Object.assign(branch, initBranch());
    branch.societyFiId = currentSocietyFiId.value;
    openForm.value = true;
  }

  const handleSave = async () => {
    if(branch.id == 0){
      await branchService.add(branch);
    }else{
      await branchService.update(branch);
    }
    openForm.value = false;
    await getBranchesBySocietyFi();
  }

  const removeBranch = async (branchId) => {
    const confirmed = await confirm('¿Estás seguro que desea eliminar esta sucursal?');

    if (confirmed) {
      console.log('se elimina la sucursal', branchId)
    }
  };

  return {
    customers,
    currentCustomerId,
    societiesGl,
    currentSocietyGlId,
    societiesFi,
    currentSocietyFiId,
    branches,
    branch,
    openForm,

    getCustomers,
    onSelectedCustomer,
    onSelectedSocietyGl,
    onSelectedSocietyFi,
    getBranch,
    addBranch,
    handleSave,
    removeBranch
  }
}

export default useBranch;
