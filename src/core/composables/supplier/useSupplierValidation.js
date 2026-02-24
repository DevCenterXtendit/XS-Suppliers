import { validators, createValidator }  from "src/core/validations/validators";
import message from 'src/core/validations/validationMessage'

const useSupplierValidation = () => {

  const supplierRules = { 
    supplierTypeId: [
      createValidator(validators.required, message.required),
    ],
    name: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(200), message.maxLength(200)),
    ],
    legalName: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(200), message.maxLength(200)),
    ],
    rfc: [
      createValidator(validators.required, message.required),
      createValidator(validators.companyRFC, message.companyRFC)
    ],
    email: [
      createValidator(validators.required, message.required),
      createValidator(validators.maxLength(100), message.maxLength(100)),
      createValidator(validators.email, message.email)
    ],
    address: [
      createValidator(validators.maxLength(500), message.maxLength(500)),
    ]
  };

  return {
    supplierRules
  };
}

export default useSupplierValidation;