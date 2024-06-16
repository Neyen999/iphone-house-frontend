'use client';

import { useState, useEffect } from 'react';
import { deleteProduct, editProduct, getProducts, saveProduct, saveProductAndTester } from '@/lib/product/product.service';
import AddProductForm from '@/components/products/AddProductForm';
import ItemsList from '@/components/products/ItemsList';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import { editCategory, getCategories, saveCategory } from '@/lib/category/category.service';
import EditItemForm from './EditItemForm';

const ProductsClient = ({ initialProducts }: { initialProducts: ProductDto[] }) => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [products, setProducts] = useState<ProductDto[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
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

  const handleSubmit = async (formData: any) => {
    // Aquí puedes manejar la lógica para agregar el producto a la lista de productos
    try {
      const savedProduct = await saveProduct(formData);

      setProducts([...products, savedProduct]);
      setShowAddProductPopup(false)
    } catch (error) {
    }
  };

  const handleSubmitMultiple = async (formData: any) => {
    // Aquí puedes manejar la lógica para agregar el producto a la lista de productos
    try {
      const savedProducts = await saveProductAndTester(formData);

      setProducts((prevProducts) => [...prevProducts, ...savedProducts]);
      setShowAddProductPopup(false)
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const handleEditProduct = async (formData: any) => {
    try {
      // Llamada a la API para actualizar el producto (comentada)
      const updatedProduct = await editProduct(formData);
  
      // Encuentra el índice del producto editado
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? formData : product
      );
  
      // Actualiza el estado con el nuevo array de productos
      setProducts(updatedProducts);
  
      // Cerrar el popup de edición si está abierto (opcional)
      setShowAddProductPopup(false);
    } catch (error) {
      console.error('Error editando el producto:', error);
    }
  };

  const handleDeleteProduct = async (item: any) => {
    try {
      const deletedProducts = await deleteProduct(item.name);
  
      // Filtrar los productos eliminados del estado actual
      setProducts((prevProducts) => 
        prevProducts.filter((product) => !deletedProducts.some((deleted) => deleted.id === product.id))
      );
    } catch (error) {
    }
  };
  
  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return;
    try {
      const addedCategory = await saveCategory({ name: newCategory });
      setCategories([...categories, addedCategory]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = async (formData: any) => {
    try {
      const updatedCategory = await editCategory(formData.id, formData);
  
      const updatedCategories = categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
  
      setCategories(updatedCategories);
    } catch (error) {
    }
  };

  const handleEditCategoryClick = (category: CategoryDto) => {
    setSelectedCategory(category);
    setIsEditingCategory(true);
  };
  
  const handleCloseCategoryEdit = () => {
    setIsEditingCategory(false);
    setSelectedCategory(null);
  };

  const centerAllWhenNoProducts = { "justify-center items-center h-full": products.length === 0 && initialLoad };
  const normalWhenProducts = { "justify-around": products.length > 0 };

  const fields = [
    { id: "name", label: "Nombre", type: "text" },
    { id: "category", label: "Categoría", type: "select", options: categories }
  ];

  return (
      <div className='flex h-full'>
        <div className='mx-auto bg-gray-100 p-4 rounded-lg shadow-md h-full flex-grow'>
          <div className={clsx("flex mb-4", centerAllWhenNoProducts, normalWhenProducts)}>
            {loading && products.length === 0 ? (
              <p>Cargando...</p>
            ) : (
              <div className="relative flex-grow">
                <div className='flex-col'>
                  <div className="flex mb-4 gap-2">
                    <TextField
                      label="Buscar"
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      fullWidth
                      sx={{ backgroundColor: 'white', borderRadius: 2, width: '50%', maxWidth: 500, display: `${initialLoad && products.length === 0 ? 'none' : 'block'}` }}
                    />
                  </div>
                  <div className={`flex ${products.length > 0 ? 'justify-start' : 'justify-center'}`}>
                    <button
                      className="bg-blue-500 text-white font-semibold py-2 px-2 rounded flex items-center justify-left"
                      onClick={handleAddProductClick}
                    >
                      <PlusCircleIcon className="h-5 w-5 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Añadir Producto</span>
                    </button>
                  </div>
                  {products.length === 0 && (
                    <p className='flex justify-center'>No tenes ningún producto, ¡intenta añadir uno!</p>
                  )}
                </div>
                {showAddProductPopup && (
                  <AddProductForm
                    categories={categories}
                    onClose={handleCloseAddProductPopup}
                    onSubmit={handleSubmit}
                    onSubmitMultiple={handleSubmitMultiple}
                  />
                )}
              </div>
            )}
          </div>
          {products.length > 0 && categories.length > 0 && (
            <ItemsList items={products} title='' cols='6' updatable={true}
              fields={fields} onUpdate={handleEditProduct} onDelete={handleDeleteProduct} />
          )} 
        </div>
        <div className="w-1/4 pl-4">
          <div className="bg-white p-4 rounded-lg shadow-md overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Categorías</h2>
            <div className="mb-4">
              <input
                type="text"
                className="border p-2 w-full"
                placeholder="Nueva categoría"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className={`mt-2 w-full rounded p-2 text-white ${newCategory.trim() === '' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
                disabled={newCategory.trim() === ''}
                onClick={handleAddCategory}
              >
                Añadir Categoría
              </button>
            </div>
            <ul className="list-inside">
              {categories.map((category) => (
                <li key={category.id} className="p-2 border-b flex justify-between items-center">
                  <span>{category.name}</span>
                  <div className="flex space-x-2">
                    <PencilIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => handleEditCategoryClick(category)} />
                  </div>
                </li>
              ))}
            </ul>
            {isEditingCategory && selectedCategory && (
              <EditItemForm
                item={selectedCategory}
                fields={[{ id: "name", label: "Nombre", type: "text" }]}
                onClose={handleCloseCategoryEdit}
                onSubmit={handleEditCategory}
              />
            )}
          </div>
        </div>
      </div>
  );
};

export default ProductsClient;
