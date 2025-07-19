import { ref } from "vue";
import { addressService } from "src/core/services/addressService"

const useAddress = () => {
  const address = ref({
    state : '',
    municipality: '',
  });

  const neighborhoods = ref([]);
  const noAddressesFound = ref(false);

  const getAddressesByPostalCode = async (postalCode) => {
     const addresses = await addressService.getAllByPostalCode(postalCode);

     if( addresses != null ){
      address.value.state = addresses.state;
      address.value.municipality = addresses.municipality;
      neighborhoods.value = addresses.neighborhoods;
      noAddressesFound.value = false;
     }else{
      noAddressesFound.value = true;
      address.value = {};
     }
  }

  return {
    address,
    neighborhoods,
    noAddressesFound,
    getAddressesByPostalCode,
  }
}

export default useAddress
