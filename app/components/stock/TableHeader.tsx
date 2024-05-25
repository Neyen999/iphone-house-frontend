import React from 'react';
import { TableHead, TableRow, TableCell, colors } from '@mui/material';
import { TableColumn } from '@/app/types/TableColumn';

interface TableHeaderProps<TData> {
  columns: TableColumn<TData>[];
}

const tableHeadStyles = {
  backgroundColor: '#1f2937', // Equivalente a bg-gray-800 en Tailwind CSS
  '& .MuiTableRow-root .MuiTableCell-root': {
    color: '#fff', // Equivalente a text-white en Tailwind CSS
  },
};


const TableHeader = <TData extends object>({ columns }: TableHeaderProps<TData>) => {
  return (
    <TableHead sx={tableHeadStyles}>
      <TableRow className='bg-gray-800'>
        {columns.map((column, index) => (
          <TableCell
          key={column.accessorKey.toString()}
          className={`px-6 py-4 whitespace-nowrap text-sm`}
        >
            {column.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
