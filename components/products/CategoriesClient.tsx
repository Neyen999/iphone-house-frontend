import { saveCategory } from '@/lib/category/category.service';
import React, { useEffect, useState } from 'react';
// import { addCategory } from '@/lib/product/category.service';

const CategoriesClient = ({ initialCategories }: { initialCategories: CategoryDto[] }) => {
  const [categories, setCategories] = useState<CategoryDto[]>(initialCategories);
  const [newCategory, setNewCategory] = useState('');

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

  return (
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
          className="bg-blue-500 text-white p-2 mt-2 w-full rounded"
          onClick={handleAddCategory}
        >
          Añadir Categoría
        </button>
      </div>
      <ul className="list-inside">
        {categories.map((category) => (
          <li key={category.id} className="p-2 border-b">{category.name}</li>
        ))}
      </ul>
    </div>
  ); 
};

export default CategoriesClient;
