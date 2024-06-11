import React, { useState } from 'react';
import { TableRow as MUITableRow, TableCell } from '@mui/material';
import { TableColumn } from '@/types/TableColumn';
import { getValueByAccessorKey } from '@/types/TableColumn';
import ActionsCell from './ActionsCell';
import { useAuth } from '@/context/context';

interface TableRowProps {
  row: StockDto;
  columns: TableColumn<StockDto>[];
}

const TableRow = <TData extends object>({
  row,
  columns,
}: TableRowProps) => {
  const renderCellValue = (value: any, accessorKey: string) => {
    if (accessorKey === 'finalStock' && (value === null || value === undefined)) {
      return 'N/A';
    } else if (typeof value === 'boolean') {
      return value ? 'Si' : 'No';
    } else if (typeof value === 'object' && value !== null) {
      if ('name' in value) {
        return value.name;
      } else {
        return JSON.stringify(value); // Or provide a more user-friendly string representation
      }
    } else {
      return value;
    }
  };

  const { handleEdit } = useAuth();
  
  const handleDelete = (row: StockDto) => {
    // Lógica para eliminar la fila
    console.log('Eliminar fila:', row);
  };

  const isNumeric = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  return (
    <MUITableRow>
      {columns.map((column, index) => {
        const value = getValueByAccessorKey(row, column.accessorKey);
        // console.log("El valor es: " + value)
        const isValueNumeric = isNumeric(value);

        // console.log("Es numerico el valor: " + value + "? " + isValueNumeric)

        return(
        <TableCell
          align={`${isValueNumeric ? 'right' : 'center'}`}
          key={column.accessorKey as string}
          className={`px-6 py-4 whitespace-nowrap text-sm 
          ${isValueNumeric ? 'text-gray-700' : 'text-gray-500'}
          ${
            index !== columns.length - 1
              ? 'border-r border-t border-b border-gray-300'
              : 'border-t border-b border-gray-300'
          }
          `}
        >
          {/* {`${column.accessorKey === 'actions' && console.log("Es actions")}`} */}
          {column.accessorKey === 'actions' ? (
            <ActionsCell
              row={row}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            renderCellValue(getValueByAccessorKey(row, column.accessorKey), column.accessorKey as string)
          )}
          {/* {renderCellValue(getValueByAccessorKey(row, column.accessorKey))} */}
        </TableCell>
      )})}
    </MUITableRow>
  );
};

export default TableRow;
