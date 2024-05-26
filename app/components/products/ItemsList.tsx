"use client";

import { useState } from "react";

import Image from "next/image";
import SecondPhoto from "@/assets/photo2.jpg";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ItemsListProps {
  items: any[], // Cambia el nombre de products a items y permite cualquier tipo
  title: string,
  boxSize: string,
  cols: string,
  updatable?: boolean,
  // getItemName: (item: any) => string, // Función para obtener el nombre del item
  // getItemCategory?: (item: any) => string // Función opcional para obtener la categoría del item
}

const ItemsList = ({ items, title, boxSize, cols, updatable, 
  // getItemName, getItemCategory 
}: ItemsListProps) => {
  // const [itemName, setItemName] = useState<string | null>(null);
  // const [itemCategory, setItemCategory] = useState<string | null>(null);

  // let sortedItems = [...items];

  const handleEditClick = (itemId: string) => {
    console.log('Editar item:', itemId);
  };

  const handleDeleteClick = (itemId: string) => {
    console.log('Eliminar item:', itemId);
  };

  const getItemName = (item: any) => {
    if (item && item.name) {
      return item.name
    }
  }

  const getItemCategory = (item: any) => {
    if (item && item.category) {
      return item.category.name;
    }
  }

  const getItemTotalProduct = (item: any) => {
    if (item && item.totalProducts) {
      return item.totalProducts;
    }
  }
  
  const getItemValue = (item: any, itemValue: any) => {
    // console.log("Item")
    // console.log(itemValue)
    if (item && itemValue) {
      return itemValue;
    }
  }


  const boxMaxSizeClass = boxSize === 'small' ? 'max-w-xs' : 'max-w-md';
  const boxSizeClass = boxSize === 'small' ? 'w-40 h-40' : 'w-60 h-60';

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-4 md:grid-cols-${cols} gap-4`}>
        {items.map((item, index) => (
          <div key={index} className={`bg-white p-4 rounded-lg shadow-md ${boxMaxSizeClass}`}>
            <Image src={SecondPhoto} alt={getItemName(item)} className="w-full h-40 object-cover mb-2" />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{getItemName(item)}</h3>
              {updatable && (
                <div className="flex">
                  <PencilIcon className="h-6 w-6 text-blue-500 cursor-pointer mr-2" onClick={() => handleEditClick("1")} />
                  <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleDeleteClick("1")} />
                </div>
              )}
            </div>
            {
              getItemValue(item, item.category) != null 
              && <p className="text-gray-600">Categoría: {getItemValue(item, item.category.name)}</p>
            }
            {
              getItemValue(item, item.totalProducts) != null 
              && <p className="text-gray-600">Productos Totales: {getItemValue(item, item.totalProducts)}</p>
            }
            {
              getItemValue(item, item.totalSoldProducts) != null 
              && <p className="text-gray-600">Productos Totales Vendidos: {getItemValue(item, item.totalSoldProducts)}</p>
            }
            {/* {getItemCategory(item) != null && <p className="text-gray-600">Categoría: {getItemCategory(item)}</p>} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
