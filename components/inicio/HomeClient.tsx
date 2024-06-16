"use client";
import { useAuth } from "@/context/context";
import TopSellingProductsClient from "@/components/inicio/TopSellingProductsClient";
import LowStockProductsClient from "@/components/inicio/LowStockProductsClient";
import { useEffect } from "react";

const HomeClient = ({ topSellingProducts, lowStockProducts }: 
  { topSellingProducts: ProductDto[], lowStockProducts: StockDto[] }) => {

  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="homepage-container flex flex-col gap-4 p-4">
      {/* Sección de Más Vendidos */}
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <TopSellingProductsClient initialProducts={topSellingProducts} />
        <hr className="border-gray-300 my-4" />
        <LowStockProductsClient stocks={lowStockProducts} />

      </div>
    </div>
  );
}

export default HomeClient;
