import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import { getProducts } from '@/lib/product/product.service'; // Asumiendo que tienes un servicio para obtener productos
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import useProductStock from '@/hooks/useProductStock';
import { initializeNewProductSale, mapProductDtoToSimpleProductDto, setProductToNewProductSale } from '@/lib/mappers/productMapper';
import { createdSale, handleDeleteProductSale, handleProductSaleChange } from '@/lib/mappers/saleMapper';
import { handleFocus, handleInputChange } from '@/utils/formUtils';
// import { handleFocus } from '@/utils/formUtils';

interface AddSaleFormProps {
  onSubmit: (sale: SaleDto) => void;
  onClose: () => void;
}

const AddSaleForm: React.FC<AddSaleFormProps> = ({ onSubmit, onClose }) => {
  const initialProdSaleObject = initializeNewProductSale();
  
  const initialProducts: ProductSimpleDto[] = [];
  const { products, setProducts, productSales, setProductSales } = useProductStock(initialProducts, [initialProdSaleObject]);
  const [productSelections, setProductSelections] = useState<{ [index: number | string]: string }>({});

  const [userName, setUserName] = useState<string>('');
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
  const [userPayment, setUserPayment] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalChange, setTotalChange] = useState<number>(0);
  const [testerSale, setTesterSale] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChangeForUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<string>(e, 'userName', setUserName, validateField);
  
  const handleInputChangeForUserPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<string>(e, 'userPhoneNumber', setUserPhoneNumber, validateField);
  
  const handleInputChangeForUserPayment = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'userPayment', setUserPayment, validateField);
  
  const handleInputChangeForTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'totalPrice', setTotalPrice, validateField);
  
  const handleInputChangeForTotalChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange<number>(e, 'totalChange', setTotalChange, validateField);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        const responseMappedToDto: ProductSimpleDto[] = mapProductDtoToSimpleProductDto(productsResponse);
        setProducts(responseMappedToDto);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const validateForm = () => {
      if (testerSale) {
        const testerFieldsFilled = productSales.every(ps => ps.product.id !== 0 && ps.testerProduct && ps.testerProduct.id !== 0 && (ps.registerQuantity !== 0 || ps.counterQuantity !== 0));
        setIsFormValid(testerFieldsFilled);
      } else {
        const fieldsFilled = productSales.every(ps => ps.product.id !== 0);
        setIsFormValid(userName.trim() !== '' && userPhoneNumber.trim() !== '' && userPayment !== 0 && totalPrice !== 0 && fieldsFilled);
      }
    };

    validateForm();
  }, [userName, userPhoneNumber, userPayment, totalPrice, totalChange, productSales, testerSale]);

  const validateField = (field: string, value: any, index?: number) => {
    let error = '';
  
    if (field === 'userName' && !value.trim()) {
      error = 'El nombre del cliente es obligatorio.';
    } else if (field === 'userPhoneNumber' && !value.trim()) {
      error = 'El número de teléfono es obligatorio.';
    } else if (field === 'userPayment' && (isNaN(value) || value <= 0)) {
      error = 'El pago debe ser un número válido mayor que cero.';
    } else if (field === 'totalPrice' && (isNaN(value) || value <= 0)) {
      error = 'El precio total debe ser un número válido mayor que cero.';
    } else if (field === 'totalChange' && isNaN(value)) {
      error = 'El cambio debe ser un número válido.';
    } else if (field === 'registerQuantity' || field === 'counterQuantity') {
      if (isNaN(value)) {
        error = 'Debe ser un número válido.';
      } else if (index !== undefined) {
        const productSale = productSales[index];
        const registerQuantity = field === 'registerQuantity' ? value : productSale.registerQuantity;
        const counterQuantity = field === 'counterQuantity' ? value : productSale.counterQuantity;
        const totalQuantity = registerQuantity + counterQuantity;
  
        if (productSale.product.availableQuantity !== undefined && productSale.product.availableRegisterQuantity !== undefined && productSale.product.availableCounterQuantity !== undefined) {
          if (totalQuantity > productSale.product.availableQuantity) {
            error = `La cantidad total no puede exceder la cantidad disponible (${productSale.product.availableQuantity}).`;
          } else if (field === 'registerQuantity' && registerQuantity > productSale.product.availableRegisterQuantity) {
            error = `La cantidad de caja no puede exceder la cantidad disponible (${productSale.product.availableRegisterQuantity}).`;
          } else if (field === 'counterQuantity' && counterQuantity > productSale.product.availableCounterQuantity) {
            error = `La cantidad de mostrador no puede exceder la cantidad disponible (${productSale.product.availableCounterQuantity}).`;
          }
        }
      }
    }
  
    if (field === 'registerQuantity' || field === 'counterQuantity') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field + '-' + index]: error,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: error,
      }));
    }
  };
  

  const handleAddProductSale = () => {
    const newProductSale: ProductSaleDto = initializeNewProductSale();

    const productName = productSelections[productSales.length];
    // if (productName) {
    //   const selectedProduct = products.find((p) => p.name === productName) || null;
    //   if (selectedProduct) {
    //     newProductSale.product = { ...selectedProduct };
    //   }
    // }
    const updatedProductSale = setProductToNewProductSale(productName, newProductSale, products);

    setProductSales([...productSales, updatedProductSale]);
    setProductSelections({ ...productSelections, [productSales.length]: '' });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSoldProducts = productSales.reduce((sum, ps) => sum + ps.registerQuantity + ps.counterQuantity, 0);
  
    const saleDto = createdSale(productSales, totalSoldProducts, userName,
      userPhoneNumber, userPayment, totalPrice, totalChange, testerSale);
  
    onSubmit(saleDto);
    onClose();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ProductSaleDto) => {
    const value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
    handleProductSaleChangeWrapper(index, field, value);
    validateField(field, value, index);
  };

  const handleProductSaleChangeWrapper = (index: number, field: keyof ProductSaleDto, value: any) => {
    const updatedProductSales = handleProductSaleChange(productSales, index, field, value);
    setProductSales(updatedProductSales);
  };

  const handleDeleteProductSaleWrapper = (index: any) => {
    const { updatedProductSales, updatedProductSelections } = handleDeleteProductSale(productSales, productSelections, index);
    setProductSales(updatedProductSales);
    setProductSelections(updatedProductSelections);
  }

  const filterProductsByTester = (value: any) => {
    return products
      .filter(prod => prod.tester === value)
      .map(prod => prod.name)
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit}>
          <Input
            id="userName"
            value={testerSale ? 'IPHONE HOUSE' : userName}
            // onChange={(e) => handleInputChange(e, 'userName')}
            onChange={handleInputChangeForUserName}
            placeholder="Ingrese el nombre del cliente"
            type="text"
            label="Nombre del Cliente"
            required
            disabled={testerSale}
            error={errors.userName}
          />
          <Input
            id="userPhoneNumber"
            value={userPhoneNumber}
            onFocus={handleFocus}
            // onChange={(e) => handleInputChange(e, 'userPhoneNumber')}
            onChange={handleInputChangeForUserPhoneNumber}
            placeholder="Ingrese el número de teléfono del cliente"
            type="text"
            label="Número de Teléfono"
            required
            disabled={testerSale}
            error={errors.userPhoneNumber}
          />
          <Input
            id="userPayment"
            value={isNaN(userPayment) ? '' : userPayment.toString()}
            onFocus={handleFocus}
            // onChange={(e) => handleInputChange(e, 'userPayment')}
            onChange={handleInputChangeForUserPayment}
            placeholder="Ingrese el pago del usuario"
            type="text"
            label="Pago del Usuario"
            required
            disabled={testerSale}
            error={errors.userPayment}
          />
          <Input
            id="totalPrice"
            value={isNaN(totalPrice) ? '' : totalPrice.toString()}
            onFocus={handleFocus}
            // onChange={(e) => handleInputChange(e, 'totalPrice')}
            onChange={handleInputChangeForTotalPrice}
            placeholder="Ingrese el precio total"
            type="text"
            label="Precio Total"
            required
            disabled={testerSale}
            error={errors.totalPrice}
          />
          <Input
            id="totalChange"
            value={isNaN(totalChange) ? '' : totalChange.toString()}
            onFocus={handleFocus}
            // onChange={(e) => handleInputChange(e, 'totalChange')}
            onChange={handleInputChangeForTotalChange}
            placeholder="Ingrese el cambio total"
            type="text"
            label="Cambio Total"
            required
            disabled={testerSale}
            error={errors.totalChange}
          />
          <label className="block text-gray-700 font-bold mb-2">Traspaso a Tester</label>
          <input
            type="checkbox"
            checked={testerSale}
            onChange={(e) => setTesterSale(e.target.checked)}
            className="mb-4"
          />
          {productSales.map((productSale, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <Input
                id={`saleProduct-${index}`}
                value={productSelections[index] || ''}
                onChange={(e) => {
                  setProductSelections({ ...productSelections, [index]: e.target.value });
                  const selectedProductName = e.target.value;
                  const selectedProduct = products.find((p) => p.name === selectedProductName) || null;
                  handleProductSaleChangeWrapper(index, 'product', { ...selectedProduct, name: e.target.value });
                }}
                placeholder="Producto"
                type="select"
                label={`${testerSale ? 'Desde' : 'Seleccione un Producto: '} (Disponibles: ${productSale.product.availableQuantity})`}
                required
                fields={filterProductsByTester(false)}
                error={errors[`saleProduct-${index}`]}
              />
              {testerSale && (
                <Input
                  id={`testerProduct-${index}`}
                  value={productSelections['tester-' + index] || ''}
                  onChange={(e) => {
                    const testerProductName = e.target.value;
                    const testerProduct = products.find((p) => p.name === testerProductName) || null;
                    setProductSelections({ ...productSelections, [`tester-${index}`]: e.target.value });
                    handleProductSaleChangeWrapper(index, 'testerProduct', testerProduct);
                  }}
                  placeholder="Producto de Destino"
                  type="select"
                  label="Hacia"
                  required
                  fields={filterProductsByTester(true)}
                  error={errors[`testerProduct-${index}`]}
                />
              )}
              <Input
                id={`registerQuantity-${index}`}
                value={isNaN(productSale.registerQuantity) ? '0' : productSale.registerQuantity.toString()}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, index, 'registerQuantity')}
                placeholder="Cantidad en Caja"
                type="text"
                label={`Cantidad de Caja: (Disponibles: ${productSale.product.availableRegisterQuantity})`}
                error={errors[`registerQuantity-${index}`]}
              />
              <Input
                id={`counterQuantity-${index}`}
                value={isNaN(productSale.counterQuantity) ? '0' : productSale.counterQuantity.toString()}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, index, 'counterQuantity')}
                placeholder="Cantidad en Mostrador"
                type="text"
                label={`Cantidad de mostrador: (Disponibles: ${productSale.product.availableCounterQuantity})`}
                error={errors[`counterQuantity-${index}`]}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e) => handleDeleteProductSaleWrapper(index)}
                  className={`${productSales.length <= 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white 
        font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
                  disabled={productSales.length <= 1}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
          <div className="mb-4 flex">
            <button
              type="button"
              onClick={handleAddProductSale}
              className={`${testerSale ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400'} text-white font-semibold py-2 px-4 rounded-full`}
              disabled={testerSale}
            >
              <PlusCircleIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`${!isFormValid ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white 
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
              disabled={!isFormValid}
            >
              Añadir Venta
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSaleForm;
