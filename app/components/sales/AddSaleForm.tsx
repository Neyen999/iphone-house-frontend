import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import { getProducts } from '@/lib/product/product.service'; // Asumiendo que tienes un servicio para obtener productos
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

interface AddSaleFormProps {
  onSubmit: (sale: SaleDto) => void;
  onClose: () => void;
}

const AddSaleForm: React.FC<AddSaleFormProps> = ({ onSubmit, onClose }) => {
  const prodObject = { 
    id: 0, 
    product: { id: 0, name: '', category: { id: 0, name: ''}, tester: false }, 
    testerProduct: null,
    totalQuantity: 0, 
    registerQuantity: 0, 
    counterQuantity: 0 
  }
  const initialProductSale : ProductSaleDto[] = [prodObject];
  const [productSales, setProductSales] = useState<ProductSaleDto[]>(initialProductSale);
  const [products, setProducts] = useState<ProductSimpleDto[]>([]);
  const [productSelections, setProductSelections] = useState<{ [index: number | string]: string }>({});

  const [userName, setUserName] = useState<string>('');
  const [userPhoneNumber, setUserPhoneNumber] = useState<number>(0);
  const [userPayment, setUserPayment] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalChange, setTotalChange] = useState<number>(0);
  const [testerSale, setTesterSale] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        
        const responseMappedToDto: ProductSimpleDto[] = productsResponse.map(prod => ({
          id: prod.id || 0,
          name: prod.name,
          category: {
            id: prod.category?.id || 0,
            name: prod.category?.name
          },
          tester: prod.tester
        }));

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
        setIsFormValid(userName.trim() !== '' && userPhoneNumber !== 0 && userPayment !== 0 && totalPrice !== 0 && totalChange !== 0 && fieldsFilled);
      }
    };

    validateForm();
    console.log(isFormValid)
  }, [userName, userPhoneNumber, userPayment, totalPrice, totalChange, productSales, testerSale]);

  
  const handleAddProductSale = () => {
    const newProductSale: ProductSaleDto = {
      id: 0,
      product: {
        id: 0,
        name: '',
        category: { id: 0, name: '' },
        tester: false
      },
      testerProduct: null,
      totalQuantity: 0,
      registerQuantity: 0,
      counterQuantity: 0
    };
  
    const productName = productSelections[productSales.length];
    if (productName) {
      const selectedProduct = products.find((p) => p.name === productName) || null;
      if (selectedProduct) {
        newProductSale.product = { ...selectedProduct };
      }
    }
  
    setProductSales([...productSales, newProductSale]);
    setProductSelections({ ...productSelections, [productSales.length]: '' });
  };
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSoldProducts = productSales.reduce((sum, ps) => sum + ps.registerQuantity + ps.counterQuantity, 0);
    
    // const saleDto: SaleDto = { id: 0, productSales, totalProducts: productSales.length, totalSoldProducts }
    const saleDto: SaleDto = { 
      id: 0, 
      productSales, 
      totalProducts: productSales.length, 
      totalSoldProducts,
      userName,
      userPhoneNumber,
      userPayment,
      totalPrice,
      totalChange,
      testerSale
    };
    
    onSubmit(saleDto);
    onClose();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = '';
    } else if (isNaN(parseInt(e.target.value))) {
      e.target.value = '';
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ProductSaleDto) => {
    const value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
    handleProductSaleChange(index, field, value);
  };

  const handleProductSaleChange = (index: number, field: keyof ProductSaleDto, value: any) => {
    const updatedProductSales = productSales.map((ps, i) => 
      i === index ? {
        ...ps,
        [field]: value,
        totalQuantity: (field === 'registerQuantity' || field === 'counterQuantity') 
          ? ps.registerQuantity + (field === 'registerQuantity' ? value : ps.registerQuantity) + (field === 'counterQuantity' ? value : ps.counterQuantity)
          : ps.totalQuantity
      } : ps
    );
    setProductSales(updatedProductSales);
  };

  const handleDeleteProductSale = (index: any) => {
    console.log("Index: " + index)
    setProductSales(prevProductSales => prevProductSales.filter((_, i) => i !== index));
    // setProductSelections({ ...productSelections, [index]: '' });
    setProductSelections(prevProductSelections => {
      const updatedSelections: { [index: number | string]: string } = {};
      Object.keys(prevProductSelections).forEach((prevIndex: string) => {
          const parsedPrevIndex = parseInt(prevIndex);
          if (parsedPrevIndex < index) {
              updatedSelections[parsedPrevIndex] = prevProductSelections[parsedPrevIndex];
          } else if (parsedPrevIndex > index) {
              updatedSelections[parsedPrevIndex - 1] = prevProductSelections[parsedPrevIndex];
          }
      });
      return updatedSelections;
  });
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
            id='userName'
            value={testerSale ? 'IPHONE HOUSE' : userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Ingrese el nombre del cliente'
            type='text'
            label='Nombre del Cliente'
            required
            disabled={testerSale}
          />
          <Input 
            id='userPhoneNumber'
            value={isNaN(userPhoneNumber) ? '' : userPhoneNumber.toString()}
            onFocus={handleFocus}
            onChange={(e) => setUserPhoneNumber(parseInt(e.target.value))}
            placeholder='Ingrese el número de teléfono del cliente'
            type='text'
            label='Número de Teléfono'
            required
            disabled={testerSale}
          />
          <Input 
            id='userPayment'
            value={isNaN(userPayment) ? '' : userPayment.toString()}
            onFocus={handleFocus}
            onChange={(e) => setUserPayment(parseInt(e.target.value))}
            placeholder='Ingrese el pago del usuario'
            type='text'
            label='Pago del Usuario'
            required
            disabled={testerSale}
          />
          <Input 
            id='totalPrice'
            value={isNaN(totalPrice) ? '' : totalPrice.toString()}
            onFocus={handleFocus}
            onChange={(e) => setTotalPrice(parseInt(e.target.value))}
            placeholder='Ingrese el precio total'
            type='text'
            label='Precio Total'
            required
            disabled={testerSale}
          />
          <Input 
            id='totalChange'
            value={isNaN(totalChange) ? '' : totalChange.toString()}
            onFocus={handleFocus}
            onChange={(e) => setTotalChange(parseInt(e.target.value))}
            placeholder='Ingrese el cambio total'
            type='text'
            label='Cambio Total'
            required
            disabled={testerSale}
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
              {/* <label className="block text-gray-700 font-bold mb-2">Producto</label> */}
              <Input 
                id={`saleProduct-${index}`}
                value={productSelections[index] || ''}
                onChange={(e) => {
                  setProductSelections({ ...productSelections, [index]: e.target.value }); // Actualizo el estado productSelections para este índice
                  
                  console.log(productSelections);
                  const selectedProductName = e.target.value;
                  // console.log("Selected product name: " + selectedProductName);
                  const selectedProduct = products.find((p) => p.name === selectedProductName) || null;
                  console.log(selectedProduct);

                  // setSelectedProductName(selectdProductName);
                  // setSelectedProduct(selectedProduct);
                  handleProductSaleChange(index, 'product', { ...selectedProduct, name: e.target.value })}
                }
                  
                placeholder='Producto'
                type='select'
                label={`${testerSale ? 'Desde' : 'Seleccione un Producto'}`}
                required
                fields={filterProductsByTester(false)}
              />
              {testerSale && (
                <Input 
                  id={`testerProduct-${index}`}
                  value={productSelections['tester-' + index] || ''}
                  onChange={(e) => {
                    const testerProductName = e.target.value;
                    const testerProduct = products.find((p) => p.name === testerProductName) || null;

                    setProductSelections({ ...productSelections, [`tester-${index}`]: e.target.value });
                    handleProductSaleChange(index, 'testerProduct', testerProduct);
                  }}
                  placeholder='Producto de Destino'
                  type='select'
                  label='Hacia'
                  required
                  fields={filterProductsByTester(true)}
                />
              )}
              <Input 
                id={`registerQuantity-${index}`}
                value={isNaN(productSale.registerQuantity) ? '0' : productSale.registerQuantity.toString()}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, index, 'registerQuantity')}
                placeholder='Cantidad en Caja'
                type='text'
                label='Cantidad de Caja'
                // required
              />
              <Input 
                id={`counterQuantity-${index}`}
                value={isNaN(productSale.counterQuantity) ? '0' : productSale.counterQuantity.toString()}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, index, 'counterQuantity')}
                placeholder='Cantidad en Mostrador'
                type='text'
                label='Cantidad de Mostrador'
                // required
              />
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={(e) => handleDeleteProductSale(index)} 
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
