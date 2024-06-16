import ProductsClient from "@/components/products/ProductsClient";
import ProductsProvider from "@/components/server-components/products/ProductsProvider"
import { isTokenValid } from "@/lib/auth/auth.server";

const Products = async () => {
  const { isValid } = await isTokenValid()

  if (!isValid) {
    return null;
  }

  const { products } = await ProductsProvider();

  return (
    <ProductsClient initialProducts={products} />
  )
}

export default Products;
