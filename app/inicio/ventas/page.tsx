'use client';

import { useState, useEffect } from 'react';
import { getSales, saveSale } from '@/lib/sale/sale.service';
import AddProductForm from '@/app/components/products/AddProductForm';
// import ProductsList from '@/app/components/products/ProductsList';
import ItemsList from '@/app/components/products/ItemsList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import AddSaleForm from '@/app/components/sales/AddSaleForm';

const Sales = () => {
  const [showAddSalePopup, setShowAddSalePopup] = useState(false);
  const [sales, setSales] = useState<SaleDto[]>([]);
  // const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await getSales();
        setSales(salesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleAddSaleClick = () => {
    setShowAddSalePopup(true);
  };

  const handleCloseAddSalePopup = () => {
    setShowAddSalePopup(false);
  };

  const handleSubmit = async (formData: SaleDto) => {
    // Aquí puedes manejar la lógica para agregar el producto a la lista de productos
    const savedSale = await saveSale(formData);
    console.log('Nueva venta:', savedSale);
    // Por ejemplo, podrías agregarlo a una lista de productos existente
    setSales([...sales, savedSale]);
    // sales.push(savedSale);
  };

  const centerAllWhenNoSales = {"justify-center items-center h-full": sales.length == 0};
  const normalWhenSales = {"justify-around": sales.length > 0};

  return (
    <div className='mx-auto bg-gray-100 p-4 rounded-lg shadow-md h-full'>    
      <div className={clsx("flex mb-4", 
        centerAllWhenNoSales, 
        normalWhenSales)}>
        {
          (loading && sales.length == 0) 
          ? <p>Cargando...</p>
          : 
          <div className="relative flex-grow">
          <div className='flex-col'>
            <div className={`flex ${sales.length > 0 ? 'justify-start' : 'justify-center'}`}>
              {/* Cambiado a justify-start para alinear a la izquierda */}
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-2 rounded flex items-center justify-left" 
                onClick={handleAddSaleClick}
              >
                <PlusCircleIcon className="h-5 w-5 mr-1 md:mr-2" /> {/* Ajustar el tamaño del ícono */}
                <span className="hidden md:inline">Añadir Venta</span>
              </button>
            </div>
            {
              sales.length == 0 && 
              <p className='flex justify-center'>No tienes ninguna venta, ¡intenta añadir una!</p>
            }
          </div>
          {showAddSalePopup && (
            <AddSaleForm
              onClose={handleCloseAddSalePopup}
              onSubmit={handleSubmit}
            />
          )}
        </div>
        }
        
      </div>
      {/* <ProductsList products={sales} title='' boxSize='small' cols='6' updatable={true}/> */}
      <ItemsList items={sales} title='' boxSize='small' cols='6' updatable={true}/>
    </div>
  );
};

export default Sales;
