import { getProducts } from "@/lib/product/product.service";

const TopSellingProductsProvider = async () => {
  const topSellingProducts = await getProducts();
  return {
    topSellingProducts,
  };
};

export default TopSellingProductsProvider;