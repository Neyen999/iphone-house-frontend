import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import { getCategories } from '@/lib/product/category.service';

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [idealStock, setIdealStock] = useState<string>("0");
  const [initialStock, setInitialStock] = useState<number>(0);
  const [initialCounterStock, setInitialCounterStock] = useState<string>("0");
  const [initialRegisterStock, setInitialRegisterStock] = useState<string>("0");
  const [tester, setTester] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    setInitialStock((parseInt(initialCounterStock) || 0) + (parseInt(initialRegisterStock) || 0));
  }, [initialCounterStock, initialRegisterStock]);

  useEffect(() => {
    if (tester) {
      setName((prevName) => prevName + ' (TESTER)');
    } else {
      setName((prevName) => prevName.replace(' (TESTER)', ''));
    }
  }, [tester]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesResponse = await getCategories();
      setCategories(categoriesResponse);
    }
    fetchCategories();
  }, [])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = '';
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("En el input: " + e.target.id);
    const intentendedWriteValue = e.target.value;
    

    console.log("Valor inicial: " + initialRegisterStock)
    console.log("Valor pretendido: " + intentendedWriteValue)
    switch (e.target.id) {
      case "idealStock":
        isNaN(parseInt(e.target.value))
          ? setIdealStock("")
          : setIdealStock(e.target.value);
        break;
      case "initialRegisterStock":
        isNaN(parseInt(e.target.value))
          ? setInitialRegisterStock("")
          : setInitialRegisterStock(e.target.value);
        break;
      case "initialCounterStock":
        isNaN(parseInt(e.target.value))
          ? setInitialCounterStock("")
          : setInitialCounterStock(e.target.value);
        break;
      default:
        break;
    }
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const productName = tester ? `${name} (TESTER)` : name;

    onSubmit({
      name,
      category: { name: category },
      idealStock: parseInt(idealStock) || 0,
      initialCounterStock: parseInt(initialCounterStock) || 0,
      initialRegisterStock: parseInt(initialRegisterStock) || 0,
      initialStock: initialStock,
      tester,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Input 
            id='name'
            value={name}
            onFocus={handleFocus}
            onChange={(e) => setName(e.target.value)}
            placeholder='Ingrese un nombre'
            type='text'
            label='Producto'
            required
          />
          <Input 
            id='category'
            value={category}
            onFocus={handleFocus}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Categoria'
            type='select'
            label='Seleccione una Categoria'
            required
            fields={categories.map(cat => cat.name)}
          />
          <Input 
            id='idealStock'
            value={idealStock}
            onFocus={handleFocus}
            onChange={handleOnChange}
            placeholder='Ingrese su stock ideal'
            type='text'
            label='Stock Ideal'
            required
          />
          <Input 
            id='initialRegisterStock'
            value={initialRegisterStock}
            onFocus={handleFocus}
            onChange={handleOnChange}
            placeholder='Ingrese el Stock Inicial de la Caja'
            type='text'
            label='Stock Inicial de Caja'
            required
          />
          <Input 
            id='initialCounterStock'
            value={initialCounterStock}
            onFocus={handleFocus}
            onChange={handleOnChange}
            placeholder='Ingrese el Stock Inicial del Mostrador'
            type='text'
            label='Stock Inicial del Mostrador'
            required
          />
          <Input 
            id='initialStock'
            value={initialStock}
            onFocus={handleFocus}
            onChange={handleOnChange}
            placeholder='0'
            type='text'
            label='Stock Inicial'
            disabled={true}
            required
          />
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="tester"
              checked={tester}
              onChange={(e) => setTester(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="tester" className="text-gray-700 text-sm font-bold">Tester</label>
          </div>
          {/* Agrega los otros campos aquí siguiendo el mismo patrón */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Añadir Producto</button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;