import StocksProvider from "@/components/server-components/stock/StocksProvider";
import StockClient from "@/components/stock/StockClient";
import { isTokenValid } from "@/lib/auth/auth.server";

const Stock = async () => {
  const { isValid } = await isTokenValid()

  if (!isValid) {
    return null;
  }


  const { stocks } = await StocksProvider();

  return (
    <StockClient initialStocks={stocks}/>
  )
}

export default Stock;