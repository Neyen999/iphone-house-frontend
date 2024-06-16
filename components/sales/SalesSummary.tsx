import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getSales } from '@/lib/sale/sale.service';

interface SalesSummaryProps {
  startDate: Date | null;
  endDate: Date | null;
  incomingSales: SaleDto[];
}

const SalesSummary: React.FC<SalesSummaryProps> = ({ startDate, endDate, incomingSales }) => {
  const [sales, setSales] = useState<SaleDto[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalChange, setTotalChange] = useState<number>(0);


  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSales(0, 100000, '', 
        // startDate != null ? startDate : dayjs().toDate(), 
        startDate,
        endDate != null ? endDate : dayjs().toDate());
        
        setSales(response.content);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, [startDate, endDate, incomingSales]);

  useEffect(() => {
    const revenue = sales.reduce((acc, sale) => acc + sale.totalPrice, 0);
    const change = sales.reduce((acc, sale) => acc + sale.totalChange, 0);
    setTotalRevenue(revenue);
    setTotalChange(change);
  }, [sales]);

  const getDateRangeLabel = () => {
    if (!startDate || !endDate) {
      return 'Hoy';
    }
    const start = dayjs(startDate).format('DD/MM/YYYY');
    const end = dayjs(endDate).format('DD/MM/YYYY');
    return start === end ? start : `${start} - ${end}`;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Resumen de Ventas
          <span className="text-gray-500 text-lg ml-2">{getDateRangeLabel()}</span>
        </h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Total Ingresos:</span>
        <span className="text-lg font-semibold text-green-500">${totalRevenue.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total Vuelto Entregado:</span>
        <span className="text-lg font-semibold text-red-500">${totalChange.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SalesSummary;
