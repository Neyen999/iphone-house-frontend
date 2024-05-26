import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import { getProducts } from '@/lib/product/product.service'; // Asumiendo que tienes un servicio para obtener productos

interface AddSaleFormProps {
  onSubmit: (sale: SaleDto) => void;
  onClose: () => void;
}

const AddSaleForm: React.FC<AddSaleFormProps> = ({ onSubmit, onClose }) => {
  const initialProductSale : ProductSaleDto[] = [{ id: 0, product: { id: 0, name: '', category: { id: 0, name: ''} }, totalQuantity: 0, registerQuantity: 0, counterQuantity: 0 }];
  const [name, setName] = useState<string>('');
  const [productSales, setProductSales] = useState<ProductSaleDto[]>(initialProductSale);
  const [products, setProducts] = useState<ProductSimpleDto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductSimpleDto | null>(null);
  // const [selectedProductName, setSelectedProductName] = useState<string>('');
  const [productSelections, setProductSelections] = useState<{ [index: number]: string }>({});


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        
        const responseMappedToDto: ProductSimpleDto[] = productsResponse.map(prod => ({
          id: prod.id || 0,
          name: prod.name,
          category: {
            id: prod.category.id || 0,
            name: prod.category.name
          }
        }));

        setProducts(responseMappedToDto);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // const handleAddProductSale = () => {
  //   setProductSales([
  //     ...productSales,
  //     { 
  //       id: 0, 
  //       product: { 
  //         id: selectedProduct?.id || 0, 
  //         name: selectedProduct?.name || '', 
  //         category: {
  //           id: selectedProduct?.category.id || 0,
  //           name: selectedProduct?.category.name || ''
  //         }
  //       }, 
  //       totalQuantity: 0, 
  //       registerQuantity: 0, 
  //       counterQuantity: 0 
  //     }
  //   ]);
  // };
  const handleAddProductSale = () => {
    const newProductSale: ProductSaleDto = {
      id: 0,
      product: {
        id: 0,
        name: '',
        category: { id: 0, name: '' }
      },
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
    onSubmit({ id: 0, productSales, name, totalProducts: productSales.length, totalSoldProducts });
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
      i === index ? { ...ps, [field]: value } : ps
    );
    setProductSales(updatedProductSales);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
      <form onSubmit={handleSubmit}>
          <Input 
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Ingrese el nombre de la venta'
            type='text'
            label='Nombre de la Venta'
            required
          />
          {productSales.map((productSale, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <label className="block text-gray-700 font-bold mb-2">Producto</label>
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

                  // setSelectedProductName(selectedProductName);
                  // setSelectedProduct(selectedProduct);
                  handleProductSaleChange(index, 'product', { ...selectedProduct, name: e.target.value })}
                }
                  
                placeholder='Producto'
                type='select'
                label='Seleccione un Producto'
                required
                fields={products.map(prod => prod.name)}
              />
              <Input 
                id={`registerQuantity-${index}`}
                value={productSale.registerQuantity.toString()}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, index, 'registerQuantity')}
                placeholder='Cantidad en Caja'
                type='number'
                label='Cantidad en Caja'
                // required
              />
              <Input 
                id={`counterQuantity-${index}`}
                value={productSale.counterQuantity.toString()}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, index, 'counterQuantity')}
                placeholder='Cantidad en Mostrador'
                type='number'
                label='Cantidad en Mostrador'
                // required
              />
            </div>
          ))}
          <div className="mb-4">
            <button type="button" onClick={handleAddProductSale} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Añadir Producto</button>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Añadir Venta</button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSaleForm;
