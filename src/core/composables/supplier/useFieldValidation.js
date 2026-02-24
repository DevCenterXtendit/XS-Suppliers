const useFieldValidation = () => {
  // 🧩 Reglas base reutilizables
  const rules = {
    required: val => !!val || 'Campo requerido',
    email: val =>
      !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Correo inválido',
    number: val =>
      !val || !isNaN(val) || 'Debe ser un número válido',
    maxLength: max => val =>
      !val || val.length <= max || `Máximo ${max} caracteres`
  }

  // 🧠 Genera reglas dinámicamente según las propiedades del campo
  const getRulesForField = (field) => {
    const fieldRules = []

    if (field.isRequired) fieldRules.push(rules.required)
    if (field.dataType === 'EMAIL') fieldRules.push(rules.email)
    if (field.dataType === 'NUMERIC') fieldRules.push(rules.number)
    if (field.length) fieldRules.push(rules.maxLength(field.length))

    return fieldRules
  }

  return {
    getRulesForField
  }
}

export default useFieldValidation;