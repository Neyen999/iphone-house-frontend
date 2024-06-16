import ProductsClient from "@/components/products/ProductsClient";
import { isTokenValid } from "@/lib/auth/auth.server";
import { getProducts } from "@/lib/product/product.service";

const Products = async () => {
  const { isValid } = await isTokenValid()

  if (!isValid) {
    console.log("ACA WACHO")
    return null;
  }

  const products  = await getProducts('');
  // console.log(products)

  // console.log("PRODUCTS CALLED")
  return (
    <ProductsClient initialProducts={products} />
  )
}

export default Products;
