import TopSellingProductsProvider from "../components/server-components/inicio/TopSellingProductProvider";
import TopSellingProductsClient from "../components/inicio/TopSellingProductsClient";
import LowStockProductsClient from "../components/inicio/LowStockProductsClient";
import LowStockProductsProvider from "../components/server-components/inicio/LowStockProductsProvider";

const Home = async () => {
  const { topSellingProducts } = await TopSellingProductsProvider();
  const { lowStockProducts } = await LowStockProductsProvider();

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
  </div>
  );
}

export default Home;