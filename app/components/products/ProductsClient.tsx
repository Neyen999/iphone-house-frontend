'use client';

import { useState, useEffect } from 'react';
import { editProduct, getProducts, saveProduct } from '@/lib/product/product.service';
import AddProductForm from '@/app/components/products/AddProductForm';
import ItemsList from '@/app/components/products/ItemsList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import { getCategories } from '@/lib/product/category.service';

const ProductsClient = ({ initialProducts }: { initialProducts: ProductDto[]}) => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [products, setProducts] = useState<ProductDto[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await getProducts(searchQuery);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    if (!initialLoad) {
      fetchProducts();
    } else {
      setInitialLoad(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesResponse = await getCategories();
      setCategories(categoriesResponse);
    }
    fetchCategories();
  }, [])
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddProductClick = () => {
    setShowAddProductPopup(true);
  };

  const handleCloseAddProductPopup = () => {
    setShowAddProductPopup(false);
  };

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts(searchQuery);
      setProducts(productsData);

      console.log(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    // Aquí puedes manejar la lógica para agregar el producto a la lista de productos
    try {
      const savedProduct = await saveProduct(formData);
      console.log('Nuevo producto:', savedProduct);

      setProducts([...products, savedProduct]);
      setShowAddProductPopup(false)
    } catch (error) {
      console.error('Error saving sale:', error);
    }
    // products.push(formData);
  };

  const handleEditProduct = async (formData: any) => {
    try {
      // Llamada a la API para actualizar el producto (comentada)
      const updatedProduct = await editProduct(formData);
      console.log('Producto editado:', formData);
  
      // Encuentra el índice del producto editado
      const updatedProducts = products.map((product) =>
        product.id === formData.id ? formData : product
      );
  
      // Actualiza el estado con el nuevo array de productos
      setProducts(updatedProducts);
  
      // Cerrar el popup de edición si está abierto (opcional)
      setShowAddProductPopup(false);
    } catch (error) {
      console.error('Error editando el producto:', error);
    }
  };

  const handleDeleteProduct = (id: number) => {

  }

  const centerAllWhenNoProducts = { "justify-center items-center h-full": products.length === 0 && initialLoad };
  const normalWhenProducts = { "justify-around": products.length > 0 };

  const fields = [
    { id: "name", label: "Nombre", type: "text" },
    { id: "category", label: "Categoría", type: "select", options: categories }
  ];

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
              <div className="flex mb-4 gap-2">
                <TextField
                  label="Buscar"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  fullWidth
                  sx={{ backgroundColor: 'white', borderRadius: 2, width: '50%', maxWidth: 500, display: `${initialLoad && products.length === 0 ? 'none' : 'block'}`}}
                />
              </div>
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
                categories={categories}
                onClose={handleCloseAddProductPopup}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        }
        
      </div>
      {products.length > 0 
      && categories.length > 0 
      ? <ItemsList items={products} title='' boxSize='small' cols='6' updatable={true} 
      fields={fields} onUpdate={handleEditProduct}/>
      : ''}
    </div>
  );
};

export default ProductsClient;
