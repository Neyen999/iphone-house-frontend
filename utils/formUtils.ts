export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  if (e.target.value === "0") {
    e.target.value = '';
  } else if (isNaN(parseInt(e.target.value))) {
    e.target.value = '';
  }
};

export const handleInputChange = <T extends string | number>(
  e: React.ChangeEvent<HTMLInputElement>,
  field: string,
  setState: React.Dispatch<React.SetStateAction<T>>,
  validateField?: (field: string, value: T) => void
) => {
  const value = e.target.value;

  if (typeof setState === 'function') {
    if (field === 'userPayment' || field === 'totalPrice' || field === 'totalChange' ||
      field === 'initialCounterStock' || field === 'initialRegisterStock' || field === 'registerReposition' || 
      field === 'counterReposition' || field === 'finalStock'
    ) {
      const numericValue = parseInt(value);
      if (value === '') {
        // Si el valor es una cadena vacía, establece el estado a 0
        setState('' as T);
      } else if (!isNaN(numericValue)) {
        // Si el valor es un número válido, establece el estado al valor numérico
        setState(numericValue as T);
      }
    } else {
      // Para los campos de texto
      setState(value as T);
    }
  }

  if (validateField) {
    validateField(field, value as T);
  }
};