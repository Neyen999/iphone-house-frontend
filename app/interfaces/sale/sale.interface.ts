interface SaleDto {
  id: number;
  productSales: ProductSaleDto[]
}

interface ProductSaleDto {
  id: number;
  product: ProductSimpleDto
  totalQuantity: number;
  registerQuantity: number;
  counterQuantity: number;
}