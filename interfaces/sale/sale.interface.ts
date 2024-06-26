interface SaleDto {
  id: number;
  productSales: ProductSaleDto[];
  totalProducts: number;
  totalSoldProducts: number;
  userName: string;
  userPhoneNumber: string;
  userPayment: number;
  totalPrice: number;
  totalChange: number;
  testerSale: boolean;
  dateCreated?: Date;
  saleCount: number;
}

interface ProductSaleDto {
  id: number;
  product: ProductSimpleDto;
  testerProduct: ProductSimpleDto | null;
  totalQuantity: number;
  registerQuantity: number;
  counterQuantity: number;
}