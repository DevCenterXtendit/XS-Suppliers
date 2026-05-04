import { ref, reactive } from 'vue'
import { societyGlService } from 'src/core/services/societyGlService';
import { customerService } from 'src/core/services/customerService';
import { useConfirmDialog } from '../common/useConfirmDialog';

const currentCustomer = ref(null);
const societyGl = reactive({});
const societiesGl = ref([]);
const openSocietyGlForm = ref(false);

const  useSocietyGL = () =>  {
  const customers = ref([]);
  const { showConfirmDialog } = useConfirmDialog();

  const initSocietyGl = () => {
    return {
      id: 0,
      code: '',
      name : '',
      customerId: 0
    }
  }

  const getCustomers = async () => {
    customers.value = await customerService.getList();
  }

  const getSocietiesGl = async () => {
    const idToUse = currentCustomer?.value?.id ?? null;
    societiesGl.value = await societyGlService.getAll(idToUse);
  }

  const getSocietyGl = async (societyGlId) => {
    Object.assign(societyGl, initSocietyGl());
    const response = await societyGlService.getById(societyGlId);
    Object.assign(societyGl, response);
    openSocietyGlForm.value = true;
  }

  const addSocietyGl = () => {
    Object.assign(societyGl, initSocietyGl());
    societyGl.customerId = currentCustomer?.value?.id ?? null;
    openSocietyGlForm.value = true;
  }

  const handleSaveSocietyGl = async () => {
    if(societyGl.id == 0){
      await societyGlService.add(societyGl);
    }else{
      await societyGlService.update(societyGl);
    }
    openSocietyGlForm.value = false;
    await getSocietiesGl();
  }

  const setSocietyGlStatus = async (status, societyGl) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea ${status ? 'activar' : 'desactivar'} la sociedad FI ${societyGl.name}?`);

    if (confirmed) {
      // await userService.setStatus(user.id, {isActive: status })
      // user.isActive = status;
      console.log('se elimina la sociedad Gl');
    }
  }

  const removeSocietyGl = async (societyGlId) => {
    const confirmed = await showConfirmDialog('¿Estás seguro que desea eliminar esta sociedad GL?');

    if (confirmed) {
      console.log('se elimina la sociedad Gl', societyGlId);
    }
  }

  return{
    customers,
    currentCustomer,
    societiesGl,
    societyGl,
    openSocietyGlForm,

    getCustomers,
    getSocietiesGl,
    getSocietyGl,
    addSocietyGl,
    handleSaveSocietyGl,
    setSocietyGlStatus,
    removeSocietyGl
  }

}

export default useSocietyGL;
