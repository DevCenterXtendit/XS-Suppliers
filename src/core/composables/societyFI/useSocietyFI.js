import { ref, reactive } from 'vue';
import { societyFiService } from 'src/core/services/societyFiService';
import { societyGlService } from 'src/core/services/societyGlService';
import { customerService } from 'src/core/services/customerService';
import { useConfirmDialog } from '../common/useConfirmDialog';

const currentCustomerId = ref(null);
const currentSocietyGlId = ref(null);
const societyFi = reactive({});
const societiesFi = ref([]);
const openSocietyFiForm = ref(false);

const useSocietyFi = () => {
  const customers = ref([])
  const societiesGl = ref([]);
  const { confirm } = useConfirmDialog();

  const initSocietyFi = () => {
    return {
      id: 0,
      code: '',
      name : '',
      societyGlId: 0
    }
  }

  const getCustomers = async () => {
    customers.value = await customerService.getAll();
  }

  const onSelectedCustomer = async () => {
    societiesGl.value = await societyGlService.getAllByCustomer(currentCustomerId.value);
    currentSocietyGlId.value = null;
    societiesFi.value = [];
  }

  const onSelectedSocietyGl = async () => {
    await getSocietiesFiBySocietyGl();
  }

  const getSocietiesFiBySocietyGl = async () => {
     societiesFi.value = await societyFiService.getAllBySocietyGl(currentSocietyGlId.value);
  }

  const getSocietyFi = async (societyFiId) => {
    Object.assign(societyFi, initSocietyFi());
    const response = await societyFiService.getById(societyFiId);
    Object.assign(societyFi, response);
    openSocietyFiForm.value = true;
  }

  const addSocietyFi = () => {
    Object.assign(societyFi, initSocietyFi());
    societyFi.societyGlId = currentSocietyGlId;
    openSocietyFiForm.value = true;
  }

  const handleSaveSocietyFi = async () => {
    if(societyFi.id == 0){
      await societyFiService.add(societyFi);
    }else{
      await societyFiService.update(societyFi);
    }
    openSocietyFiForm.value = false;
    await getSocietiesFiBySocietyGl(currentSocietyGlId);
  }

  const removeSpecialtyFi = async (societyFiId) => {
    const confirmed = await confirm('¿Estás seguro que desea eliminar esta sociedad FI?');

    if (confirmed) {
      console.log('se elimina la sociedad FI', societyFiId)
    }
  };


  return{
    customers,
    currentCustomerId,
    currentSocietyGlId,
    societiesGl,
    societiesFi,
    societyFi,
    openSocietyFiForm,

    getCustomers,
    onSelectedCustomer,
    onSelectedSocietyGl,
    getSocietyFi,
    addSocietyFi,
    handleSaveSocietyFi,
    removeSpecialtyFi
  }
}

export default useSocietyFi;
