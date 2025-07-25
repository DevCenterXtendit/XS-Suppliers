import { validators, createValidator }  from "src/core/validations/validators";
import message from 'src/core/validations/validationMessage'

const useSocietyFiValidation = () => {

  const societyFiRules = {
    code: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumeric, message.alphanumeric),
      createValidator(validators.maxLength(4), message.maxLength(4)),
    ],
    name: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(100), message.maxLength(100)),
    ],
    rfc: [
      createValidator(validators.required, message.required),
      createValidator(validators.companyRFC, message.companyRFC)
    ],
  };

  return {
    societyFiRules
  };
}

export default useSocietyFiValidation;
