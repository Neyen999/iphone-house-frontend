import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

interface EditStockModalProps {
  open: boolean;
  onClose: () => void;
  stock: StockDto | null;
  onSave: (updatedStock: StockDto | null) => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({ open, onClose, stock, onSave }) => {
  const [formValues, setFormValues] = useState(stock);

  useEffect(() => {
    if (stock) {
      setFormValues(stock);
    }
  }, [stock]);

  // useEffect(() => {
  //   if (formValues) {
  //     const { initialRegisterStock, initialCounterStock } = formValues;
  //     const initialStock = (initialRegisterStock || 0) + (initialCounterStock || 0);
  //     console.log("Stock inicial de caja: " + initialRegisterStock)
  //     console.log("Stock inicial de mostrador: " + initialCounterStock)
  //     const updatedFormValues: StockDto = {
  //       ...formValues,
  //       initialStock: initialStock, // Aquí estás convirtiendo a cadena de texto
  //       id: formValues.id,
  //     };
  //     setFormValues(updatedFormValues);
  //     console.log("Stock inicial: " + formValues.initialStock)
  //   }
  // }, [formValues?.initialStock, formValues?.initialRegisterStock, formValues?.initialCounterStock]);
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      if (prev) {
        const updatedValues = { ...prev, [name]: parseFloat(value) || 0 };
        // Calcular el nuevo valor del Stock Inicial
        const initialRegisterStock = updatedValues.initialRegisterStock || 0;
        const initialCounterStock = updatedValues.initialCounterStock || 0;
        const newInitialStock = initialRegisterStock + initialCounterStock;
        // Actualizar el campo "Stock Inicial" en formValues
        console.log("Nuevo stock inicial: " + newInitialStock);
        return { ...updatedValues, initialStock: newInitialStock };
      }
      return prev;
    });
  };
  
  const handleSubmit = () => {
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
    overflowY: 'scroll'
  };

  const inputStyle = {
    '&:focus': {
      outline: 'none !important', // Anula el estilo de resaltado azul
      borderColor: 'transparent !important', // También puedes anular el color del borde
      boxShadow: 'none !important', // Anula cualquier sombra de enfoque
    },
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <h2>Editar Stock</h2>
        <TextField
          label="Reposición Caja"
          name="registerReposition"
          value={formValues.registerReposition || 0}
          onChange={handleChange}
          fullWidth
          variant='outlined'
          sx={inputStyle}
  
        />
        <TextField
          label="Reposición Mostrador"
          name="counterReposition"
          value={formValues.counterReposition || 0}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Stock Inicial Caja"
          name="initialRegisterStock"
          value={formValues.initialRegisterStock || 0}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Stock Inicial Mostrador"
          name="initialCounterStock"
          value={formValues.initialCounterStock || 0}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Stock Ideal"
          name="idealStock"
          value={formValues.idealStock}
          disabled
          fullWidth
        />
        <TextField
          label="Stock Inicial"
          name="initialStock"
          value={formValues.initialStock}
          disabled
          fullWidth
        />
        <TextField
          label="Stock Final"
          name="finalStock"
          value={formValues.finalStock}
          disabled
          fullWidth
        />
        <TextField
          label="Tester"
          name="tester"
          value={formValues.tester ? 'Sí' : 'No'}
          disabled
          fullWidth
        />
        <TextField
          label="Producto"
          name="product.name"
          value={formValues.product.name}
          disabled
          fullWidth
        />
        <TextField
          label="Categoría"
          name="product.category.name"
          value={formValues.product.category.name}
          disabled
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ ml: 2 }}>
            Editar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditStockModal;
