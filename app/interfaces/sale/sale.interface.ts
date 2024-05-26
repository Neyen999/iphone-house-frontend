interface SaleDto {
  id: number;
  productSales: ProductSaleDto[];
  name: string;
  totalProducts: number;
  totalSoldProducts: number;
}

interface ProductSaleDto {
  id: number;
  product: ProductSimpleDto
  totalQuantity: number;
  registerQuantity: number;
  counterQuantity: number;
}