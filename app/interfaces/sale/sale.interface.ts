interface SaleDto {
  id: number;
  productSales: ProductSaleDto[];
  totalProducts: number;
  totalSoldProducts: number;
  userName: string;
  userPhoneNumber: number;
  userPayment: number;
  totalPrice: number;
  totalChange: number;
  testerSale: boolean;
  dateCreated?: Date;
}

interface ProductSaleDto {
  id: number;
  product: ProductSimpleDto;
  testerProduct: ProductSimpleDto | null;
  totalQuantity: number;
  registerQuantity: number;
  counterQuantity: number;
}