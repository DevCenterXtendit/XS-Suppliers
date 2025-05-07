export const validators = {
  required: v => !!v,
  minLength: length => val => (val.length >= length),
  maxLength: length => val => (val.length <= length),
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  numeric: v => /^(0|[1-9][0-9]*)$/.test(v),
  alphanumeric: v => /^[-a-zA-Z0-9_ ]*$/.test(v),
  phone: v => /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/.test(v),
}

export function createValidator(validationFn, message) {
  return val => validationFn(val) || message; // Si la validación falla, retorna el mensaje
}

export default {validators, createValidator};
