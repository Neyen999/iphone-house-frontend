interface StockDto {
  id: number;
  idealStock: number;
  initialStock: number;
  initialCounterStock: number;
  initialRegisterStock: number;
  registerSales: number;
  counterSales: number;
  counterReposition: number | null;
  registerReposition: number | null;
  finalStock: number | null;
  tester: boolean;
  product: ProductSimpleDto;
  currentCounterStock: number;
  currentRegisterStock: number;
  currentStock: number;
}

interface ProductSimpleDto {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  // price: number;
}
