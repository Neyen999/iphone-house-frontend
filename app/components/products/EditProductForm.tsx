"use client";

import { useState } from "react";
import Input from "../input/Input";

interface EditProductFormProps {
  product: ProductDto;
  categories: CategoryDto[];
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const EditProductForm = ({ product, categories, onClose, onSubmit }: EditProductFormProps) => {
  const [formData, setFormData] = useState({ ...product });
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(formData.category);
  const [hasChangedAField, setHasChangeAField] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    console.log(id)
    if (!hasChangedAField) {
      setHasChangeAField(true);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input 
              id='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Ingrese un nombre'
              type='text'
              label='Nombre'
              required
            />
            {/* <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            /> */}
          </div>
          <div className="mb-4">
          <Input 
            id='category'
            value={selectedCategory?.name}
            // onChange={(e) => setCategory(e.target.value)}
            onChange={(e) => {
              const foundCategory: CategoryDto | null = categories.find((cat) => cat.name === e.target.value) || null;
              setSelectedCategory(foundCategory)
              handleChange((e));
              // setSelectedCategory({...selectedCategory, [index]: e.target.value }); // Actualizo el estado productSelections para este índice
            }}
            placeholder='Categoria'
            type='select'
            label='Seleccione una Categoria'
            required
            fields={categories.map(cat => cat.name)}
          />
            {/* <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category?.name || ''}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            /> */}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">
              Cancelar
            </button>
            <button type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"  
              disabled={!hasChangedAField}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
