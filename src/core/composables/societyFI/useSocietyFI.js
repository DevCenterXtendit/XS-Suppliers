import { ref, reactive } from 'vue';
import { societyFiService } from 'src/core/services/societyFiService';
import { societyGlService } from 'src/core/services/societyGlService';
import { customerService } from 'src/core/services/customerService';
import { useConfirmDialog } from '../common/useConfirmDialog';

const currentCustomer = ref(null);
const currentSocietyGl = ref(null);
const societyFi = reactive({});
const societiesFi = ref([]);
const openSocietyFiForm = ref(false);

const useSocietyFi = () => {
  const customers = ref([])
  const societiesGl = ref([]);

  const { showConfirmDialog } = useConfirmDialog();

  const initSocietyFi = () => {
    return {
      id: 0,
      code: '',
      name : '',
      rfc: '',
      societyGlId: 0,
      address: {
        street: '',
        exteriorNumber: null,
        interiorNumber: null,
        neighborhoodId : null,
      }
    }
  }

  const getCustomers = async () => {
    customers.value = await customerService.getAll();
  }

  const onSelectedCustomer = async () => {
    societiesGl.value = await societyGlService.getAllByCustomer(currentCustomer.value.id);
    currentSocietyGl.value = null;
    societiesFi.value = [];
  }

  const onSelectedSocietyGl = async () => {
    await getSocietiesFiBySocietyGl();
  }

  const getSocietiesFiBySocietyGl = async () => {
     societiesFi.value = await societyFiService.getAllBySocietyGl(currentSocietyGl.value.id);
  }

  const getSocietyFi = async (societyFiId) => {
    Object.assign(societyFi, initSocietyFi());
    const response = await societyFiService.getById(societyFiId);
    Object.assign(societyFi, response);
    openSocietyFiForm.value = true;
  }

  const addSocietyFi = () => {
    Object.assign(societyFi, initSocietyFi());
    societyFi.societyGlId = currentSocietyGl.value.id;
    openSocietyFiForm.value = true;
  }

  const handleSaveSocietyFi = async () => {
    if(societyFi.id == 0){
      await societyFiService.add(societyFi);
    }else{
      await societyFiService.update(societyFi);
    }
    openSocietyFiForm.value = false;
    await getSocietiesFiBySocietyGl();
    console.log(societyFi);
  }

  const setSocietyFiStatus = async (status, societyFi) => {
    const confirmed = await showConfirmDialog(`¿Estás seguro que desea ${status ? 'activar' : 'desactivar'} la sociedad FI ${societyFi.name}?`);

    if (confirmed) {
      // await userService.setStatus(user.id, {isActive: status })
      // user.isActive = status;
      console.log('se elimina la sociedad FI');
    }
  }

  const removeSocietyFi = async (societyFiId) => {
    const confirmed = await showConfirmDialog('¿Estás seguro que desea eliminar esta sociedad FI?');

    if (confirmed) {
      console.log('se elimina la sociedad FI', societyFiId);
    }
  };


  return{
    customers,
    currentCustomer,
    currentSocietyGl,
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
    setSocietyFiStatus,
    removeSocietyFi
  }
}

export default useSocietyFi;
