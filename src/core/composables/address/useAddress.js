import { ref } from "vue";
import { addressService } from "src/core/services/addressService"

const useAddress = () => {
  const address = ref({
    state : '',
    municipality: '',
  });

  const neighborhoods = ref([]);
  const noAddressesFound = ref(false);
  const searching = ref(false);

  const getAddressesByPostalCode = async (postalCode) => {
    searching.value = true;
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

    searching.value = false;
  }

  return {
    address,
    neighborhoods,
    noAddressesFound,
    searching,
    getAddressesByPostalCode,
  }
}

export default useAddress
