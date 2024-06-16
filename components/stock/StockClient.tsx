"use client";

import { useState, useMemo, useEffect } from "react";
import StockTable from "@/components/stock/StockTable";
import { TableColumn } from "@/types/TableColumn";
import { editStock, getStocks } from "@/lib/stock/stock.service";
import { Box, Pagination, SelectChangeEvent, TextField } from "@mui/material";
import PageSizeSelect from "@/components/stock/PageSizeSelect";
import { useAuth } from "@/context/context";
import EditStockModal from "@/components/stock/EditStockModal";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const StockClient = ({ initialStocks } : { initialStocks: Page<StockDto> }) => {
  const [stock, setStock] = useState<StockDto[]>(initialStocks.content);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(initialStocks.totalPages);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, handleDateChange] = useState<Dayjs | null>(null);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const { isEditingModalOpen,
    editingStock,
    setIsEditingModalOpen, 
    // handleEdit 
  } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStocks(page, size, searchQuery, selectedDate ? selectedDate.toDate() : null);
      setStock(response.content);
      setTotalPages(response.totalPages);
    };

    // if (!initialLoad) {
      fetchData();
    // } else {
      setInitialLoad(false);
    // }
  }, [page, size, searchQuery, selectedDate, initialStocks]);

  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialLoad(false);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setInitialLoad(false);
    setPage(value - 1);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<unknown>) => {
    setInitialLoad(false);
    setSize(event.target.value as number);
    setPage(0);
  };

  const handleEditStock = async (data: any) => {
    const editedStock = await editStock(data.id, data);
    
    // Actualizar el estado local con el stock editado
    setStock((prevStock) =>
      prevStock.map((item) => (item.id === editedStock.id ? editedStock : item))
    );

    setIsEditingModalOpen(false);
  }

  const columns = useMemo<TableColumn<StockDto>[]>(() => [
    {
      accessorKey: 'actions',
      header: '',
    },
    { accessorKey: 'product.name', header: 'Producto' },
    { accessorKey: 'product.category.name', header: 'Categoria' },
    { accessorKey: 'idealStock', header: 'Stock Ideal' },
    { accessorKey: 'initialStock', header: 'Stock Inicial' },
    { accessorKey: 'initialCounterStock', header: 'Inicial Mostrador' },
    { accessorKey: 'initialRegisterStock', header: 'Inicial Caja' },
    { accessorKey: 'registerSales', header: 'Ventas Caja' },
    { accessorKey: 'counterSales', header: 'Ventas Mostrador' },
    { accessorKey: 'counterReposition', header: 'Rep. Mostrador' },
    { accessorKey: 'registerReposition', header: 'Rep. Caja' },
    { accessorKey: 'currentRegisterStock', header: 'Stock Act. Caja' },
    { accessorKey: 'currentCounterStock', header: 'Stock Act. Mostrador' },
    { accessorKey: 'currentStock', header: 'Stock Act. Gral' },
    { accessorKey: 'finalStock', header: 'Stock Final' },
    { accessorKey: 'tester', header: 'Tester' }
  ], []);

  const isToday = selectedDate === null || selectedDate.isSame(dayjs(), 'day');

  return (
    <Box>
      <Box display="flex" flexDirection="row" gap={2} mb={2}>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{ backgroundColor: 'white', borderRadius: 2, width: '50%', maxWidth: 500 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Seleccionar fecha"
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ backgroundColor: 'white', borderRadius: 2, width: '50%', maxWidth: 200 }}
            format="YYYY-MM-DD"
            // renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      {isToday && (
        <Box mb={2}>
          <p className="text-gray-500 text-lg ml-2">Hoy</p>
        </Box>
      )}
      <StockTable columns={columns} data={stock} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <PageSizeSelect pageSize={size} handlePageSizeChange={handlePageSizeChange} />
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
      </Box>
      {isEditingModalOpen && 
      <EditStockModal open={isEditingModalOpen} onClose={() => setIsEditingModalOpen(false)} stock={editingStock} onSave={handleEditStock} />}
    </Box>
  );
}

export default StockClient;
