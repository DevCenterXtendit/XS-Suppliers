export default {
  required: 'Campo requerido',
  maxLength:(length) => `No debe exceder los ${length} caracteres`,
  minLength:(length) => `Debe tener al menos ${length} caracteres`,
  onlyLetters: 'Solo se permiten letras',
  onlyNumbers: 'Solo se permiten números',
  alphanumeric: 'Formato incorrecto',
  email: 'Formato email invalido: MiCorreo@Appointease.com',
  passwordRepeat: 'Las contraseñas deben coincidir',
  phone: 'Debe ingresar un número telefonico válido'
}
