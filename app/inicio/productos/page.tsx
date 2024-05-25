'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/product/product.service';
import AddProductForm from '@/app/components/products/AddProductForm';
import ProductsList from '@/app/components/products/ProductsList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const Products = () => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [products, setProducts] = useState<ProductDto[]>([]);
  // const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProductClick = () => {
    setShowAddProductPopup(true);
  };

  const handleCloseAddProductPopup = () => {
    setShowAddProductPopup(false);
  };

  const handleSubmit = (formData: any) => {
    // Aquí puedes manejar la lógica para agregar el producto a la lista de productos
    console.log('Nuevo producto:', formData);
    // Por ejemplo, podrías agregarlo a una lista de productos existente
    // products.push(formData);
  };

  const centerAllWhenNoProducts = {"justify-center items-center h-full": products.length == 0};
  const normalWhenProducts = {"justify-around": products.length > 0};

  // return (
  //   <div>
  //     {/* <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1> */}
      
  //     <div className="flex justify-around mb-4">
  //     <div className="relative pl-4 flex-grow">
  //         <div className="flex justify-end">
  //           <button
  //             className="bg-blue-500 text-white font-semibold py-2 px-2 rounded flex items-center justify-right"
  //             onClick={handleAddProductClick}
  //           >
  //             <PlusCircleIcon className="h-5 w-5 mr-1 md:mr-2" /> {/* Ajustar el tamaño del ícono */}
  //             <span className="hidden md:inline">Añadir Producto</span>
  //           </button>
  //         </div>
  //         {showAddProductPopup && (
  //           // <div className="absolute top-0 right-0 w-48 bg-white p-8 rounded shadow-md">
  //           //   <h2 className="text-xl font-bold mb-4">Añadir Producto</h2>
  //           //   <button
  //           //     className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
  //           //     onClick={handleCloseAddProductPopup}
  //           //   >
  //           //     Cerrar
  //           //   </button>
  //           // </div>
  //           <AddProductForm
  //           onClose={handleCloseAddProductPopup}
  //           onSubmit={handleSubmit}
  //           productTypes={['Type 1', 'Type 2', 'Type 3']} // Aquí puedes pasar los tipos de productos disponibles
  //         />
  //         )}
  //       </div>
  //       <ProductsList products={products} title='' boxSize='small' cols='4'/>
  //     </div>
  //   </div>
  // );
  return (
    <div className='mx-auto bg-gray-100 p-4 rounded-lg shadow-md h-full'>    
      <div className={clsx("flex mb-4", 
        centerAllWhenNoProducts, 
        normalWhenProducts)}>
        {
          (loading && products.length == 0) 
          ? <p>Cargando...</p>
          : 
          <div className="relative flex-grow">
          <div className='flex-col'>
            <div className={`flex ${products.length > 0 ? 'justify-start' : 'justify-center'}`}>
              {/* Cambiado a justify-start para alinear a la izquierda */}
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-2 rounded flex items-center justify-left" 
                onClick={handleAddProductClick}
              >
                <PlusCircleIcon className="h-5 w-5 mr-1 md:mr-2" /> {/* Ajustar el tamaño del ícono */}
                <span className="hidden md:inline">Añadir Producto</span>
              </button>
            </div>
            {
              products.length == 0 && 
              <p className='flex justify-center'>No tenes ningún producto, ¡intenta añadir uno!</p>
            }
          </div>
          {showAddProductPopup && (
            <AddProductForm
              onClose={handleCloseAddProductPopup}
              onSubmit={handleSubmit}
            />
          )}
        </div>
        }
        
      </div>
      <ProductsList products={products} title='' boxSize='small' cols='6' updatable={true}/>
    </div>
  );
};

export default Products;
