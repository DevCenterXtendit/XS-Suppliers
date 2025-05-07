import { validators, createValidator }  from "src/core/validations/validators";
import message from 'src/core/validations/validationMessage'

const useAuthValidation = () => {

  const authRules = {
    email: [
      createValidator(validators.required, message.required),
      createValidator(validators.email, message.email),
      createValidator(validators.maxLength(25), message.maxLength(25)),
    ],
    password: [
      createValidator(validators.required, message.required),
      // createValidator(validators.strongPassword, message.strongPassword),
    ],
  };

  return {
    //properties
    authRules,
  };
}

export default useAuthValidation;
