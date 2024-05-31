"use client";

import { useState } from "react";

import Image from "next/image";
import SecondPhoto from "@/assets/photo2.jpg";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditItemForm from "./EditItemForm";

interface ItemsListProps {
  items: any[], // Cambia el nombre de products a items y permite cualquier tipo
  title: string,
  boxSize: string,
  cols: string,
  updatable?: boolean,
  onUpdate?: (data: any) => void;
  onDelete?: (id: number) => void;
  fields: { id: string; label: string; type: string; options?: any[] }[];
}

const ItemsList = ({ items, title, boxSize, cols, updatable, onUpdate, onDelete, fields }: ItemsListProps) => {

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenWarning, setIsOpenWarning] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState(null);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    // setIsOpenForm(true);
    setActiveModal(item.id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleDeleteClick = (item: any) => {
    setSelectedItem(item);
    setIsOpenWarning(true);
  };

  const handleEditSubmit = (formData: any) => {
    console.log("Here")
    if (onUpdate) {
      onUpdate(formData)
    }
    setIsOpenForm(false)
    // console.log("Producto editado:", formData);
    // Lógica para actualizar el producto
  };

  const handleDeleteConfirm = (id: number) => {
    if (onDelete) {
      onDelete(id)
    }
    setIsOpenWarning(false);
  };

  const getItemName = (item: any) => item?.name || "";
  
  const getItemValue = (item: any) => {
    console.log(item)
    // console.log(itemValue)
    // if (item && itemValue) {
    //   return itemValue;
    // }
  }
  // const getItemValue = (item: any, itemValue: any) => {return itemValue};



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
                  <PencilIcon className="h-6 w-6 text-blue-500 cursor-pointer mr-2" onClick={() => handleEditClick(item)} />
                  <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleDeleteClick(item.id)} />
                </div>
              )}
            </div>
            {
              item.category != null 
              && <p className="text-gray-600">Categoría: {item.category.name}</p>
            }
            {
              item.totalProducts != null 
              && <p className="text-gray-600">Productos Totales: {item.totalProducts}</p>
            }
            {
              item.totalSoldProducts != null
              && <p className="text-gray-600">Productos Totales Vendidos: {item.totalSoldProducts}</p>
            }
            {
              item.availableQuantity != null
              && <p className="text-gray-600">Cantidad Disponible: {item.availableQuantity}</p>
            }
            {
              item.totalSold != null
              && <p className="text-gray-600">Cantidad Vendida: {item.totalSold}</p>
            }
            {activeModal === item.id && (
              <EditItemForm
                // product={selectedItem}
                // categories={categories || []}
                item={selectedItem}
                fields={fields}
                onClose={handleCloseModal}
                onSubmit={handleEditSubmit}
              />
            )}
            {/* {isOpenWarning && (
              <DeleteWarning
                onClose={() => setIsOpenWarning(false)}
                onDelete={handleDeleteConfirm}
              />
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;