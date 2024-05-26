import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { Box, Table, TableBody, TableContainer, Paper, TableHead, TableCell } from '@mui/material';
import { TableColumn } from '@/app/types/TableColumn';

interface StockTableProps {
  columns: TableColumn<StockDto>[];
  data: StockDto[];
}

const StockTable = ({
  columns,
  data,
}: StockTableProps) => {

  return (
    <TableContainer component={Paper} className="rounded-xl shadow-md">
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} row={row} columns={columns} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
