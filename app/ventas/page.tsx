// 'use client';

import SalesClient from "@/components/sales/SalesClient";
import SalesProvider from "@/components/server-components/sales/SalesProvider";
import { isTokenValid } from "@/lib/auth/auth.server";

const Sales = async () => {
  const isValidToken = await isTokenValid()

  if (!isValidToken) {
    return null;
  }


  const { sales } = await SalesProvider();

  return (
    <SalesClient initialSales={sales} />
  )
}

export default Sales;
