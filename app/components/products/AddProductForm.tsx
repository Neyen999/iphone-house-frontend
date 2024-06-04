import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import { getCategories } from '@/lib/product/category.service';

const AddProductForm: React.FC<AddProductFormProps> = ({ categories, onSubmit,  onSubmitMultiple, onClose }) => {
  const initialProductState = {
    name: '',
    idealStock: '0',
    initialCounterStock: '0',
    initialRegisterStock: '0',
    initialStock: 0,
    // category: null as CategoryDto | null,
    category: null as CategoryDto | null,
  };

  const [product, setProduct] = useState(initialProductState);
  const [testerProduct, setTesterProduct] = useState(initialProductState);
  const [tester, setTester] = useState<boolean>(false);

  useEffect(() => {
    const totalStock = (parseInt(product.initialCounterStock) || 0) + (parseInt(product.initialRegisterStock) || 0);
    setProduct(prevProduct => ({
      ...prevProduct,
      initialStock: totalStock,
    }));
  }, [product.initialCounterStock, product.initialRegisterStock]);

  useEffect(() => {
    if (tester) {
      setTesterProduct({
        ...testerProduct,
        name: product.name + ' (TESTER)',
        category: product.category,
      });
    }
  }, [tester, product.name, product.category]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = '';
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string, isTester: boolean = false) => {
    const value = e.target.value;
    const updateState = (prevState: typeof initialProductState) => ({
      ...prevState,
      [field]: field === 'initialStock' ? parseInt(value) || 0 : value,
    });

    if (isTester) {
      setTesterProduct(updateState);
    } else {
      setProduct(updateState);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>, isTester: boolean = false) => {
    const value = e.target.value;
    const foundCategory = categories.find((cat) => cat.name === value) || null;
    const updateState = (prevState: typeof initialProductState) => ({
      ...prevState,
      category: foundCategory,
    });

    if (isTester) {
      setTesterProduct(updateState);
    } else {
      setProduct(updateState);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mainProduct = {
      ...product,
      idealStock: parseInt(product.idealStock) || 0,
      initialCounterStock: parseInt(product.initialCounterStock) || 0,
      initialRegisterStock: parseInt(product.initialRegisterStock) || 0,
      tester: false
    };

    if (tester) {
      const testerProd = {
        ...testerProduct,
        idealStock: parseInt(testerProduct.idealStock) || 0,
        initialCounterStock: parseInt(testerProduct.initialCounterStock) || 0,
        initialRegisterStock: parseInt(testerProduct.initialRegisterStock) || 0,
        tester: true
      };

      try {
        onSubmitMultiple([mainProduct, testerProd]);
      } catch (error) {
        console.error('Error saving products:', error);
      }
    } else {
      try {
        onSubmit(mainProduct);
      } catch (error) {
        console.error('Error saving product:', error);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
         <form onSubmit={handleSubmit}>
          <div>
            <Input 
              id="name"
              value={product.name}
              onFocus={handleFocus}
              onChange={(e) => handleProductChange(e, 'name')}
              placeholder='Ingrese un nombre'
              type='text'
              label='Producto'
              required
            />
            <Input 
              id="category"
              value={product.category?.name || ''}
              onFocus={handleFocus}
              onChange={(e) => handleCategoryChange(e)}
              placeholder='Categoria'
              type='select'
              label='Seleccione una Categoria'
              required
              fields={categories.map(cat => cat.name)}
            />
            <Input 
              id="idealStock"
              value={product.idealStock}
              onFocus={handleFocus}
              onChange={(e) => handleProductChange(e, 'idealStock')}
              placeholder='Ingrese su stock ideal'
              type='text'
              label='Stock Ideal'
              required
            />
            <Input 
              id="initialRegisterStock"
              value={product.initialRegisterStock}
              onFocus={handleFocus}
              onChange={(e) => handleProductChange(e, 'initialRegisterStock')}
              placeholder='Ingrese el Stock Inicial de la Caja'
              type='text'
              label='Stock Inicial de Caja'
              required
            />
            <Input 
              id="initialCounterStock"
              value={product.initialCounterStock}
              onFocus={handleFocus}
              onChange={(e) => handleProductChange(e, 'initialCounterStock')}
              placeholder='Ingrese el Stock Inicial del Mostrador'
              type='text'
              label='Stock Inicial del Mostrador'
              required
            />
            <Input 
              id="initialStock"
              value={product.initialStock}
              onFocus={handleFocus}
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
              <label htmlFor="tester" className="text-gray-700 text-sm font-bold">Crear junto stock de tester</label>
            </div>
          </div>

          {tester && (
            <div>
              <Input 
                id="name-tester"
                value={testerProduct.name}
                onFocus={handleFocus}
                onChange={(e) => handleProductChange(e, 'name', true)}
                placeholder='Ingrese un nombre'
                type='text'
                label='Producto Tester'
                required
                disabled={true}
              />
              <Input 
                id="category-tester"
                value={testerProduct.category?.name || ''}
                onFocus={handleFocus}
                onChange={(e) => handleCategoryChange(e, true)}
                placeholder='Categoria'
                type='select'
                label='Seleccione una Categoria'
                required
                disabled={true}
                fields={categories.map(cat => cat.name)}
              />
              <Input 
                id="idealStock-tester"
                value={testerProduct.idealStock}
                onFocus={handleFocus}
                onChange={(e) => handleProductChange(e, 'idealStock', true)}
                placeholder='Ingrese su stock ideal'
                type='text'
                label='Stock Ideal Tester'
                required
              />
              <Input 
                id="initialStock-tester"
                value={testerProduct.initialStock}
                onFocus={handleFocus}
                onChange={(e) => handleProductChange(e, 'initialStock', true)}
                placeholder='0'
                type='text'
                label='Stock Inicial Tester'
                required
              />
            </div>
          )}

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
