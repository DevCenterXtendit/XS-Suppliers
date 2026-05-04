import { validators, createValidator } from 'src/core/validations/validators';
import message from 'src/core/validations/validationMessage';
import { COMPANY_TYPE } from 'src/core/constants/company-type';

const useUserValidation = (companyType, userLogged) => {

  const isCompanyVisible = () =>
    companyType?.value?.name != COMPANY_TYPE.XTENDIT &&
    userLogged.companyType == COMPANY_TYPE.XTENDIT;

  const isSupplierVisible = () =>
    isCompanyVisible() &&
    companyType?.value?.name == COMPANY_TYPE.SUPPLIER;

  const userRules = {
    name: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(60), message.maxLength(60)),
    ],
    middleName: [
      createValidator(validators.required, message.required),
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(60), message.maxLength(60)),
    ],
    lastName: [
      createValidator(validators.alphanumericWithSpaces, message.noSpecialCharacters),
      createValidator(validators.maxLength(60), message.maxLength(60)),
    ],
    email: [
      createValidator(validators.required, message.required),
      createValidator(validators.email, message.email),
    ],
    companyId: [
      val => !isCompanyVisible() || !!val || message.required,
    ],
    supplierId: [
      val => !isSupplierVisible() || !!val || message.required,
    ],
    roleIds: [
      val => (Array.isArray(val) && val.length > 0) || message.required,
    ],
  };

  return {
    userRules,
  };
};

export default useUserValidation;
