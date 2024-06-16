export const initialProductSale = (): ProductSaleDto => {
  const productSale = {
    id: 0,
    product: { id: 0, name: '', category: { id: 0, name: '' }, tester: false, availableQuantity: 0 },
    testerProduct: null,
    totalQuantity: 0,
    registerQuantity: 0,
    counterQuantity: 0
  }

  return productSale;
}

export const createdSale = (
  productSales: ProductSaleDto[],
  totalSoldProducts: number,
  userName: string,
  userPhoneNumber: string,
  userPayment: number,
  totalPrice: number,
  totalChange: number,
  testerSale: boolean
): SaleDto => {
  return {
    id: 0,
    productSales,
    totalProducts: productSales.length,
    totalSoldProducts,
    userName,
    userPhoneNumber,
    userPayment,
    totalPrice,
    totalChange,
    testerSale
  };
};

// saleMapper.ts
export const handleProductSaleChange = (
  productSales: ProductSaleDto[],
  index: number,
  field: keyof ProductSaleDto,
  value: any
): ProductSaleDto[] => {
  return productSales.map((ps, i) =>
    i === index
      ? {
          ...ps,
          [field]: value,
          totalQuantity:
            field === 'registerQuantity' || field === 'counterQuantity'
              ? ps.registerQuantity +
                (field === 'registerQuantity' ? value : ps.registerQuantity) +
                (field === 'counterQuantity' ? value : ps.counterQuantity)
              : ps.totalQuantity,
        }
      : ps
  );
};

export const handleDeleteProductSale = (
  productSales: ProductSaleDto[],
  productSelections: { [index: number | string]: string },
  index: any
): { updatedProductSales: ProductSaleDto[]; updatedProductSelections: { [index: number | string]: string } } => {
  const updatedProductSales = productSales.filter((_, i) => i !== index);
  const updatedProductSelections: { [index: number | string]: string } = {};
  Object.keys(productSelections).forEach((prevIndex: string) => {
    const parsedPrevIndex = parseInt(prevIndex);
    if (parsedPrevIndex < index) {
      updatedProductSelections[parsedPrevIndex] = productSelections[parsedPrevIndex];
    } else if (parsedPrevIndex > index) {
      updatedProductSelections[parsedPrevIndex - 1] = productSelections[parsedPrevIndex];
    }
  });
  return { updatedProductSales, updatedProductSelections };
};
