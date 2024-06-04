import { getSales } from "@/lib/sale/sale.service";

const SalesProvider = async () => {
  const sales = (await getSales()).content;
  return { sales };
}

export default SalesProvider;