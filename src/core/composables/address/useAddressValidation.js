import { validators, createValidator }  from "src/core/validations/validators";
import message from 'src/core/validations/validationMessage'

const useAddressValidation = () => {

  const addressRules = {
    postalCode: [
      createValidator(validators.required, message.required),
      createValidator(validators.maxLength(5), message.maxLength(5)),
    ],
    neighborhoodId: [
      createValidator(validators.required, message.required),
    ],
    street: [
      createValidator(validators.required, message.required),
      createValidator(validators.maxLength(100), message.maxLength(100)),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
    ],
    exteriorNumber: [
      createValidator(validators.required, message.required),
      createValidator(validators.maxLength(8), message.maxLength(8)),
    ],
    interiorNumber: [
      createValidator(validators.maxLength(8), message.maxLength(8)),
    ],
  };

  return {
    //properties
    addressRules,
  };
}

export default useAddressValidation;
