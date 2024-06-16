import { getStocks } from "@/lib/stock/stock.service";


const StocksProvider = async () => {
  const stocks = await getStocks();
  return {
    stocks
  }
}

export default StocksProvider;