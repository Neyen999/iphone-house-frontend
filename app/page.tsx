import TopSellingProductsProvider from "@/components/server-components/inicio/TopSellingProductProvider";
import LowStockProductsProvider from "@/components/server-components/inicio/LowStockProductsProvider";
import HomeClient from "@/components/inicio/HomeClient";
import { isAuthenticated, isTokenValid } from '@/lib/auth/auth.server';


const Home = async () => {
  const isValidToken = await isTokenValid()

  if (!isValidToken) {
    return null;
  }

  const { topSellingProducts } = await TopSellingProductsProvider();
  const { lowStockProducts } = await LowStockProductsProvider();

  return (
    // <h1>Home</h1>
    <HomeClient topSellingProducts={topSellingProducts} lowStockProducts={lowStockProducts} />
  )
}

export default Home;
