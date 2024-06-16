import HomeClient from "@/components/inicio/HomeClient";
import { isAuthenticated, isTokenValid } from '@/lib/auth/auth.server';


const Home = async () => {
  

  return (
    <h1>Que haces aqui fred</h1>
    // <HomeClient topSellingProducts={topSellingProducts} lowStockProducts={lowStockProducts} />
  )
}

export default Home;
