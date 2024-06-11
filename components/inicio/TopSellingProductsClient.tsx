'use client'

import React, { useState } from 'react';

interface TopSellingProductsProps {
  initialProducts: ProductDto[];
}

const TopSellingProductsClient = ({ initialProducts }: TopSellingProductsProps) => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="top-selling-products p-4">
      <h2 className="text-xl font-bold mb-4">Más Vendidos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <span className="font-semibold">{product.name}</span>: {product.totalSold} ventas
            {/* <span>Incrementar ventas</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProductsClient;
