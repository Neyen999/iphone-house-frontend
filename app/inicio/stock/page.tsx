"use client";

import { useMemo } from "react";
import StockTable from "@/app/components/stock/StockTable";
import { TableColumn } from "@/app/types/TableColumn";
import ActionsCell from "@/app/components/stock/ActionsCell";

const Stock = () => {

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
    { accessorKey: 'finalStock', header: 'Stock Final' },
    { accessorKey: 'tester', header: 'Tester' },
    { accessorKey: 'product.name', header: 'Producto' },
    { accessorKey: 'product.category.name', header: 'Categoria' },
  ], []);

  const handleEdit = (row: StockDto) => {
    // Lógica para editar la fila
    console.log('Editar fila:', row);
  };
  
  const handleDelete = (row: StockDto) => {
    // Lógica para eliminar la fila
    console.log('Eliminar fila:', row);
  };

  const data = [
    {
      id: 1,
      idealStock: 100,
      initialStock: 90,
      initialCounterStock: 45,
      initialRegisterStock: 45,
      registerSales: 10,
      counterSales: 5,
      counterReposition: 5,
      registerReposition: 5,
      finalStock: 80,
      tester: false,
      product: {
        id: 1,
        name: "iPhone 12",
        category: {
          id: 1,
          name: "Smartphone",
        },
        price: 999,
      },
      currentCounterStock: 45,
      currentRegisterStock: 45,
      currentStock: 90,
    },
  ];


  return <StockTable columns={columns} data={data} />
}

export default Stock;