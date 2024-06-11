'use client'

import React, { useState } from 'react';

interface LowStockProductsProps {
  stocks: StockDto[];
}

// // Componente para la sección de Productos próximos a quedarse sin stock
const LowStockProductsClient = ({ stocks }: LowStockProductsProps) => {
  const [lowStockProducts, setLowStockProducts] = useState(stocks);

  return (
    <div className="low-stock-products p-4">
    <h2 className="text-xl font-bold mb-4">Próximos a quedarse sin stock</h2>
    <ul>
      {lowStockProducts.map((stock, index) => (
        <li key={index} className="mb-2 flex justify-between">
          <span>{stock.product.name}</span>
          <span>{stock.currentStock} restantes</span>
        </li>
      ))}
    </ul>
  </div>
  )
};

export default LowStockProductsClient;