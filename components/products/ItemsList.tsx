"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SecondPhoto from "@/assets/Default.jpg";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditItemForm from "./EditItemForm";
import DeleteWarning from "./DeleteWarning";
import Products from "@/app/productos/page";

interface ItemsListProps {
  items: any[], // Cambia el nombre de products a items y permite cualquier tipo
  title?: string,
  cols: string,
  updatable?: boolean,
  onUpdate?: (data: any) => void;
  onDelete?: (item: any) => void;
  fields: { id: string; label: string; type: string; options?: any[] }[];
}

const ItemsList = ({ items, title, cols, updatable, onUpdate, onDelete, fields }: ItemsListProps) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenWarning, setIsOpenWarning] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {

  }, [items])

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
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
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsOpenForm(false);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(selectedItem);
    }
    setIsOpenWarning(false);
  };

  const getItemName = (item: any) => item?.name || "";

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-4 md:grid-cols-${cols} gap-4 overflow-y-auto`}>
        {items.map((item, index) => (
          <div key={index} className={`bg-white p-4 rounded-lg shadow-md w-30`}>
            <Image src={SecondPhoto} alt={getItemName(item)} className="w-full h-40 object-cover mb-2" />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{getItemName(item)}</h3>
              {updatable && (
                <div className="flex">
                  <PencilIcon className="h-6 w-6 text-blue-500 cursor-pointer mr-2" onClick={() => handleEditClick(item)} />
                  <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleDeleteClick(item)} />
                </div>
              )}
            </div>
            {updatable ? (
              <>
                {item.category != null && <p className="text-gray-600">Categoría: {item.category.name}</p>}
                {item.totalProducts != null && <p className="text-gray-600">Productos Totales: {item.totalProducts}</p>}
                {item.totalSoldProducts != null && <p className="text-gray-600">Productos Totales Vendidos: {item.totalSoldProducts}</p>}
                {item.availableQuantity != null && <p className="text-gray-600">Cantidad Disponible: {item.availableQuantity}</p>}
                {item.totalSold != null && <p className="text-gray-600">Cantidad Vendida: {item.totalSold}</p>}
              </>
            ) : (
              item.totalSold != null && <p className="text-gray-600">Cantidad Vendida: {item.totalSold}</p>
            )}
            {activeModal === item.id && (
              <EditItemForm
                item={selectedItem}
                fields={fields}
                onClose={handleCloseModal}
                onSubmit={handleEditSubmit}
              />
            )}
          </div>
        ))}
      </div>
      {isOpenWarning && (
        <DeleteWarning
          onClose={() => setIsOpenWarning(false)}
          onDelete={handleDeleteConfirm}
          message="Se eliminará este producto, su tester y sus stocks. ¿Estás seguro de que quieres continuar?"
        />
      )}
    </div>
  );
};

export default ItemsList;
