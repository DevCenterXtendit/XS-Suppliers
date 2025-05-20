import { validators, createValidator }  from "src/core/validations/validators";
import message from 'src/core/validations/validationMessage'

const useSocietyFiValidation = () => {

  const societyFiRules = {
    code: [
      createValidator(validators.required, message.required),
      createValidator(validators.maxLength(10), message.maxLength(10)),
    ],
    name: [
      createValidator(validators.required, message.required),
      createValidator(validators.maxLength(50), message.maxLength(50)),
    ],
  };

  return {
    societyFiRules
  };
}

export default useSocietyFiValidation;
