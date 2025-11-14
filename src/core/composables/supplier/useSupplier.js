import { ref } from "vue";
import { customerService } from "src/core/services/customerService";

const customers = ref([]);
const currentCustomer = ref(null);
const suppliers = ref([]);

const useSupplier = () => {

  const getCustomers = async () => {
    customers.value = await customerService.getAllActive();
  }

  return {
    customers,
    currentCustomer,
    suppliers,
    getCustomers
  }
}

export default useSupplier;
