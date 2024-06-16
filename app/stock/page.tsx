import StocksProvider from "@/components/server-components/stock/StocksProvider";
import StockClient from "@/components/stock/StockClient";
import { isTokenValid } from "@/lib/auth/auth.server";
import { getStocks } from "@/lib/stock/stock.service";

const Stock = async () => {
  const { isValid } = await isTokenValid()

  if (!isValid) {
    return null;
  }


  const stocks = await getStocks(0, 10, '', null);

  // console.log("STOCKS CONTENT")
  // console.log(stocks.content)
  return (
    <StockClient initialStocks={stocks}/>
  )
}

export default Stock;