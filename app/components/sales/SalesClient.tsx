"use client";

import { useState, useEffect } from 'react';
import { getSales, saveSale } from '@/lib/sale/sale.service';
import ItemsList from '@/app/components/products/ItemsList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import AddSaleForm from '@/app/components/sales/AddSaleForm';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import RecentSales from './RecentSales';
import PaymentMethods from './PaymentMethods';
import SalesSummary from './SalesSummary';

const SalesClient = ({ initialSales }: { initialSales: SaleDto[] }) => {
  const [showAddSalePopup, setShowAddSalePopup] = useState(false);
  const [sales, setSales] = useState<SaleDto[]>(initialSales);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await getSales(searchQuery, selectedDate);
        setSales(salesData.content);
        console.log("Inside here")
      } catch (error) {
        console.error('Error fetching sales:', error);
        setLoading(false);
      }
    };

    if (!initialLoad) {
      fetchSales();
    } else {
      setInitialLoad(false);
    }
  }, [searchQuery, selectedDate]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setInitialLoad(false);
  };

  const handleAddSaleClick = () => {
    setShowAddSalePopup(true);
  };

  const handleCloseAddSalePopup = () => {
    setShowAddSalePopup(false);
  };

  const handleSubmit = async (formData: SaleDto) => {
    try {
      // const savedSale = await saveSale(formData);
      // setSales([...sales, savedSale]);
      console.log("SUBMIT")
      console.log(formData)
      setShowAddSalePopup(false);
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const paymentMethods = [
    { name: 'Ovo', balance: 'Rp 26.812.000' },
    { name: 'Paypal', balance: '$ 421.980.00' },
    { name: 'Dana', balance: 'Rp 22.921.000' },
  ];

  return (
    <div className='mx-auto bg-gray-100 p-4 rounded-lg shadow-md h-full'>
      <div className={clsx("flex mb-4", { 'justify-center items-center h-full': sales.length === 0 && initialLoad, 'justify-around': sales.length > 0 })}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="relative flex-grow">
            <div className={`flex mb-4 gap-2 ${sales.length === 0 && initialLoad ? 'justify-center' : ''}`}>
              <TextField
                label="Buscar"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 2, width: '50%', maxWidth: 500, display: `${initialLoad && sales.length === 0 ? 'none' : 'block'}` }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Seleccionar fecha"
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{ backgroundColor: 'white', borderRadius: 2, maxWidth: 200 }}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
            </div>
            <div className='flex-col'>
              <div className={`flex ${sales.length === 0 && initialLoad ? 'justify-center' : 'justify-start'}`}>
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-2 rounded flex items-center justify-left"
                  onClick={handleAddSaleClick}
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Añadir Venta</span>
                </button>
              </div>
              {!initialLoad && searchQuery.length === 0 && sales.length === 0 && (
                <p className='flex justify-center'>Hoy no tienes ninguna venta, ¡intenta añadir una!</p>
              )}
              {searchQuery.length > 3 && sales.length === 0 && (
                <p className='flex justify-center'>No hay ninguna venta con este criterio de búsqueda</p>
              )}
            </div>
            {showAddSalePopup && (
              <AddSaleForm
                onClose={handleCloseAddSalePopup}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        )}
      </div>
      <SalesSummary totalSales={sales.length} />
      <RecentSales sales={sales} />
      <PaymentMethods methods={paymentMethods} />
      {/* <ItemsList items={sales} title='' boxSize='small' cols='6' updatable={true} fields={fields}/> */}
    </div>
  );
}

export default SalesClient;
