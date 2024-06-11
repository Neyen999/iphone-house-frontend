interface ProductDto {
  id?: number,
  name: string;
  category: CategoryDto | null;
  idealStock: number;
  initialCounterStock: number;
  initialRegisterStock: number;
  initialStock: number;
  tester: boolean;
  availableQuantity?: number;
  totalSold?: number;
}