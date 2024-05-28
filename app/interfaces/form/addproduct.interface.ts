interface AddProductFormProps {
  categories: CategoryDto[]
  onSubmit: (formData: ProductDto) => void;
  onClose: () => void;
}