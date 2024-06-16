import { getStocks } from "@/lib/stock/stock.service";


const StocksProvider = async () => {
  const stocks = await getStocks();
  // console.log("Stocks!!")
  // console.log(stocks)
  return {
    stocks
  }
}

export default StocksProvider;