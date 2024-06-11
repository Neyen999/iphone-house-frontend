"use client";
import { useAuth } from "@/context/context";
import TopSellingProductsClient from "@/components/inicio/TopSellingProductsClient";
import LowStockProductsClient from "@/components/inicio/LowStockProductsClient";
import { useEffect } from "react";

const HomeClient = ({ topSellingProducts, lowStockProducts }: 
  { topSellingProducts: ProductDto[], lowStockProducts: StockDto[] }) => {

  const { isLoading, isTokenExpired } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="homepage-container grid grid-cols-12 gap-4 p-4">
      {/* Sección de Más Vendidos */}
      <div className="col-span-12 md:col-span-8 bg-white rounded-lg shadow-md">
        <TopSellingProductsClient initialProducts={topSellingProducts} />
      </div>

      {/* Sección de Próximos a quedarse sin stock */}
      <div className="col-span-12 md:col-span-4 bg-white rounded-lg shadow-md">
        <LowStockProductsClient stocks={lowStockProducts} />
      </div>

      {/* Sección de Resumen de Ventas */}
      {/* <div className="col-span-12 bg-white rounded-lg shadow-md mt-4">
        <SalesSummary />
        
      </div> */}
      {/* <div className="col-span-12 md:col-span-4 bg-white rounded-lg shadow-md">
        <WebSocketComponent />
      </div> */}
    </div>
  );
}

export default HomeClient;
