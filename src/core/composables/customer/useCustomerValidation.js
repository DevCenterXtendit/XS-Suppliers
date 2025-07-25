import { validators, createValidator }  from "src/core/validations/validators";
import message from 'src/core/validations/validationMessage'

const useCustomerValidation = () => {

  const customerRules = {
    code: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumeric, message.alphanumeric),
      createValidator(validators.maxLength(4), message.maxLength(4)),
    ],
    name: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(60), message.maxLength(60)),
    ],
  };

  return {
    customerRules
  };
}

export default useCustomerValidation;
