import StocksProvider from "@/components/server-components/stock/StocksProvider";
import StockClient from "@/components/stock/StockClient";
import { isTokenValid } from "@/lib/auth/auth.server";

const Stock = async () => {
  const isValidToken = await isTokenValid()

  if (!isValidToken) {
    return null;
  }


  const { stocks } = await StocksProvider();

  return (
    <StockClient initialStocks={stocks}/>
  )
}

export default Stock;