interface AddProductFormProps {
  categories: CategoryDto[]
  onSubmit: (formData: ProductDto) => void;
  onSubmitMultiple: (formDate: ProductDto[]) => void;
  onClose: () => void;
}