export const mapProductDtoToSimpleProductDto = (products: ProductDto[]): ProductSimpleDto[] => {
  const response = products.map(prod => ({
    id: prod.id || 0,
    name: prod.name,
    category: {
      id: prod.category?.id || 0,
      name: prod.category?.name
    },
    tester: prod.tester,
    availableQuantity: prod.availableQuantity,
    availableRegisterQuantity: prod.availableRegisterQuantity,
    availableCounterQuantity: prod.availableCounterQuantity
  }));

  return response; 
}

export const initializeNewProductSale = (): ProductSaleDto => {
  const productSale = {
    id: 0,
    product: {
      id: 0,
      name: '',
      category: { id: 0, name: '' },
      tester: false,
      availableQuantity: 0,
      availableRegisterQuantity: 0,
      availableCounterQuantity: 0
    },
    testerProduct: null,
    totalQuantity: 0,
    registerQuantity: 0,
    counterQuantity: 0
  };
  
  return productSale;
}

export const setProductToNewProductSale = (productName: string, 
                                    newProductSale: ProductSaleDto, 
                                    products: ProductSimpleDto[]): ProductSaleDto => {
  if (productName) {
    const selectedProduct = products.find((p) => p.name === productName) || null;
    if (selectedProduct) {
      newProductSale.product = { ...selectedProduct };
    }
  }
  return newProductSale;
}