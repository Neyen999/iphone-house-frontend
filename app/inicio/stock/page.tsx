"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import StockTable from "@/app/components/stock/StockTable";
import { TableColumn } from "@/app/types/TableColumn";
import { getStocks } from "@/lib/stock/stock.service";
import { Box, Pagination, SelectChangeEvent, TextField, ThemeProvider } from "@mui/material";
import PageSizeSelect from "@/app/components/stock/PageSizeSelect";
import { useAuth } from "@/app/context/context";
import EditStockModal from "@/app/components/stock/EditStockModal";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";

const Stock = () => {
  const [stock, setStock] = useState<StockDto[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, handleDateChange] = useState<Date | null>(null);    
  const { isEditingModalOpen,
    editingStock,
    setIsEditingModalOpen, 
    handleEdit } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStocks(page, size, searchQuery, selectedDate);
      setStock(response.content);
      setTotalPages(response.totalPages);
    };
    fetchData();
  }, [page, size, searchQuery, selectedDate]);

  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<unknown>) => {
    setSize(event.target.value as number);
    setPage(0);
  };

  console.log(stock);
  const columns = useMemo<TableColumn<StockDto>[]>(() => [
    {
      accessorKey: 'actions',
      header: '',
      // Cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} />,
    },
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
    { accessorKey: 'tester', header: 'Tester' },
    { accessorKey: 'product.name', header: 'Producto' },
    { accessorKey: 'product.category.name', header: 'Categoria' },
  ], []);

  // const data = [
  //   {
  //     id: 1,
  //     idealStock: 100,
  //     initialStock: 90,
  //     initialCounterStock: 45,
  //     initialRegisterStock: 45,
  //     registerSales: 10,
  //     counterSales: 5,
  //     counterReposition: 5,
  //     registerReposition: 5,
  //     finalStock: 80,
  //     tester: false,
  //     product: {
  //       id: 1,
  //       name: "iPhone 12",
  //       category: {
  //         id: 1,
  //         name: "Smartphone",
  //       },
  //       price: 999,
  //     },
  //     currentCounterStock: 45,
  //     currentRegisterStock: 45,
  //     currentStock: 90,
  //   },
  // ];

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
      <StockTable columns={columns} data={stock} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <PageSizeSelect pageSize={size} handlePageSizeChange={handlePageSizeChange} />
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
      </Box>
      {isEditingModalOpen && 
      <EditStockModal open={isEditingModalOpen} onClose={() => setIsEditingModalOpen(false)} stock={editingStock} onSave={handleEdit} />}
    </Box>
  );
}

export default Stock;