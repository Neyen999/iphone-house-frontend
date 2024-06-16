import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Alert } from '@mui/material';
import Input from '../input/Input';
import { handleFocus, handleInputChange } from '@/utils/formUtils';

interface EditStockModalProps {
  open: boolean;
  onClose: () => void;
  stock: StockDto | null;
  onSave: (updatedStock: StockDto | null) => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({ open, onClose, stock, onSave }) => {
  const [formValues, setFormValues] = useState(stock);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerReposition, setRegisterReposition] = useState<number>(stock?.registerReposition || 0);
  const [counterReposition, setCounterReposition] = useState<number>(stock?.counterReposition || 0);
  const [initialRegisterStock, setInitialRegisterStock] = useState<number>(stock?.initialRegisterStock || 0);
  const [initialCounterStock, setInitialCounterStock] = useState<number>(stock?.initialCounterStock || 0);
  const [finalStock, setFinalStock] = useState<number>(stock?.finalStock || 0);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  const handleInputChangeForRegisterReposition = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'registerReposition', setRegisterReposition, validateField);

  const handleInputChangeForCounterReposition = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'counterReposition', setCounterReposition, validateField);

  const handleInputChangeForInitialRegisterStock = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'initialRegisterStock', setInitialRegisterStock, validateField);

  const handleInputChangeForInitialCounterStock = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'initialCounterStock', setInitialCounterStock, validateField);

  const handleInputChangeForFinalStock = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'finalStock', setFinalStock, validateField);

  useEffect(() => {
    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      let isValid = true;

      const fields = [
        { id: 'registerReposition', value: registerReposition },
        { id: 'counterReposition', value: counterReposition },
        { id: 'initialRegisterStock', value: initialRegisterStock },
        { id: 'initialCounterStock', value: initialCounterStock },
        { id: 'finalStock', value: finalStock },
      ];

      fields.forEach(field => {
        const error = validateField(field.id, field.value);
        if (error) {
          newErrors[field.id] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      setIsFormValid(isValid);
    };

    validateForm();

    const hasFormChanged = () => {
      if (!stock) return false;
      return (
        registerReposition !== stock.registerReposition ||
        counterReposition !== stock.counterReposition ||
        initialRegisterStock !== stock.initialRegisterStock ||
        initialCounterStock !== stock.initialCounterStock || 
        (finalStock !== 0  && finalStock !== stock.finalStock)
      );
    };

    setIsFormChanged(hasFormChanged());
  }, [registerReposition, counterReposition, initialRegisterStock, initialCounterStock, finalStock]);

  const validateField = (id: string, value: any) => {
    let error = '';

    if (value === '' || value === null || isNaN(value) || value < 0) {
      error = 'El valor debe ser un número válido mayor o igual a 0';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));

    return error;
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }

    onSave(formValues);
    onClose();
  };

  if (!formValues) return null;

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: '8px',
    maxHeight: '80%',
    overflowY: 'scroll',
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Input
          id="registerReposition"
          value={registerReposition}
          onChange={handleInputChangeForRegisterReposition}
          onFocus={handleFocus}
          placeholder='Ingrese un número'
          type='text'
          label='Reposición de Caja'
          required
          error={errors.registerReposition}
        />
        <Input
          id="counterReposition"
          value={counterReposition}
          onChange={handleInputChangeForCounterReposition}
          onFocus={handleFocus}
          placeholder='Ingrese un número'
          type='text'
          label='Reposición Mostrador'
          required
          error={errors.counterReposition}
        />
        <Input
          id="initialRegisterStock"
          value={initialRegisterStock}
          onChange={handleInputChangeForInitialRegisterStock}
          onFocus={handleFocus}
          placeholder='Ingrese un número'
          type='text'
          label='Stock Inicial Caja'
          required
          error={errors.initialRegisterStock}
        />
        <Input
          id="initialCounterStock"
          value={initialCounterStock}
          onChange={handleInputChangeForInitialCounterStock}
          onFocus={handleFocus}
          placeholder='Ingrese un número'
          type='text'
          label='Stock Inicial Mostrador'
          required
          error={errors.initialCounterStock}
        />
        <Input
          id="finalStock"
          value={finalStock}
          onChange={handleInputChangeForFinalStock}
          onFocus={handleFocus}
          placeholder='Ingrese un número'
          type='text'
          label='Stock Final'
          required
        />
        <Input
          id="idealStock"
          value={formValues.idealStock}
          disabled
          placeholder='Ingrese un número'
          type='text'
          label='Stock Ideal'
          required
        />
        <Input
          id="initialStock"
          value={formValues.initialStock}
          disabled
          placeholder='Ingrese un número'
          type='text'
          label='Stock Inicial'
          required
        />
        <Input
          id="tester"
          value={formValues.tester ? 'Sí' : 'No'}
          disabled
          placeholder='Ingrese un número'
          type='text'
          label='Tester'
          required
        />
        <Input
          id="product.name"
          value={formValues.product.name}
          disabled
          placeholder='Ingrese un número'
          type='text'
          label='Producto'
          required
        />
        <Input
          id="product.category.name"
          value={formValues.product.category.name}
          disabled
          placeholder='Ingrese un número'
          type='text'
          label='Categoría'
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`${!isFormValid || !isFormChanged ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white 
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
              disabled={!isFormValid || !isFormChanged}
          >
            Editar stock
          </button>
          <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditStockModal;
