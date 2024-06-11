"use client";

import { useState, useEffect } from 'react';
import { getSales, saveSale } from '@/lib/sale/sale.service';
import ItemsList from '@/components/products/ItemsList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import AddSaleForm from '@/components/sales/AddSaleForm';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RecentSales from './RecentSales';
import SalesSummary from './SalesSummary';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button, Pagination, SelectChangeEvent } from '@mui/material';
import PageSizeSelect from '../stock/PageSizeSelect';

const SalesClient = ({ initialSales }: { initialSales: Page<SaleDto> }) => {
  const [showAddSalePopup, setShowAddSalePopup] = useState(false);
  const [sales, setSales] = useState<SaleDto[]>(initialSales.content);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  // Pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(initialSales.totalPages);

  useEffect(() => {
    if (!initialLoad) {
      fetchSales();
    } else {
      setInitialLoad(false);
    }
  }, [page, size, searchQuery, startDate, endDate]);

  const fetchSales = async () => {
    try {
      const salesData = await getSales(page, size, searchQuery, 
        startDate ? startDate.toDate() : null, 
        endDate ? endDate.toDate() : null);
      setSales(salesData.content);
      setTotalPages(salesData.totalPages);
      console.log(salesData)
      console.log("Inside here")
    } catch (error) {
      console.error('Error fetching sales:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("value: " + value)
    console.log("Here")
    setInitialLoad(false);
    setPage(value - 1);
    console.log(page)
  };

  const handlePageSizeChange = (event: SelectChangeEvent<unknown>) => {
    setInitialLoad(false);

    setSize(event.target.value as number);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialLoad(false);
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    // setSelectedDate(date);
    setInitialLoad(false);
  };

  const handleAddSaleClick = () => {
    setInitialLoad(false);
    setShowAddSalePopup(true);
  };

  const handleCloseAddSalePopup = () => {
    setInitialLoad(false);
    setShowAddSalePopup(false);
  };

  const handleSubmit = async (formData: SaleDto) => {
    try {
      const savedSale = await saveSale(formData);
      setSales([...sales, savedSale]);
      console.log("SUBMIT")
      console.log(formData)
      setShowAddSalePopup(false);
      await fetchSales()
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const handleClearFilter = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
  };

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
                sx={{ backgroundColor: 'white', borderRadius: 2, width: '20%', maxWidth: 500, 
                  display: `${initialLoad && sales.length === 0 ? 'none' : 'block'}` 
                }}

              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha desde"
                  value={startDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                    setStartDate(newValue); // Convertir a Date si es necesario
                    // setEndDate(null);
                  }}
                  sx={{ backgroundColor: 'white', borderRadius: 2, maxWidth: 200 }}
                  format="YYYY-MM-DD"
                />
                <DatePicker
                  label="Fecha hasta"
                  value={endDate}
                  onChange={(newValue) => {
                    // setSelectedDate(newValue);
                    // setE(newValue ? newValue.toDate() : null); // Convertir a Date si es necesario
                    setEndDate(newValue);
                  }}
                  sx={{ backgroundColor: 'white', borderRadius: 2, maxWidth: 200 }}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearFilter}
                sx={{ backgroundColor: 'white', borderRadius: 2 }}
              >
                Limpiar Filtro
              </Button>
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
      <SalesSummary startDate={startDate ? startDate.toDate() : null} 
                    endDate={endDate ? endDate.toDate() : null} />
      <>
        <RecentSales sales={sales} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <PageSizeSelect pageSize={size} handlePageSizeChange={handlePageSizeChange} />
          <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
        </Box>
      </>
    </div>
  );
}

export default SalesClient;
