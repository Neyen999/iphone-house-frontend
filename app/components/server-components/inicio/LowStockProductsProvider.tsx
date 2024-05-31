import { getStocks } from "@/lib/stock/stock.service";

const LowStockProductsProvider = async () => {
  const lowStockProducts = (await getStocks()).content;

  return {
    lowStockProducts
  }
}

export default LowStockProductsProvider;