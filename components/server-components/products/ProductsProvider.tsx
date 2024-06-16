import { getProducts } from "@/lib/product/product.service"

const ProductsProvider = async () => {
  const products = await getProducts();
  return {
    products
  }
}

export default ProductsProvider;