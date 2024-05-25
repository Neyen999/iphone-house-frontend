import Image from "next/image";
import SecondPhoto from "@/assets/photo2.jpg";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ProductListProps {
  products: ProductDto[],
  sortBy?: string,
  title: string,
  boxSize: string,
  cols: string,
  updatable?: boolean
}

const ProductsList = ({ products, sortBy, title, boxSize, cols, updatable }: ProductListProps) => {
  let sortedProducts = [...products];

  const handleEditClick = (productId: string) => {
    // Aquí puedes implementar la lógica para abrir el popup de edición del producto
    console.log(products);
    console.log('Editar producto:', productId);
  };

  const handleDeleteClick = (productId: string) => {
    // Aquí puedes implementar la lógica para eliminar el producto
    console.log('Eliminar producto:', productId);
  };

  const boxMaxSizeClass = boxSize === 'small' ? 'max-w-xs' : 'max-w-md';
  const boxSizeClass = boxSize === 'small' ? 'w-40 h-40' : 'w-60 h-60';

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-4 md:grid-cols-${cols} gap-4`}>
        {sortedProducts.map((product, index) => (
          <div key={index} className={`bg-white p-4 rounded-lg shadow-md ${boxMaxSizeClass}`}>
            <Image src={SecondPhoto} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {
                updatable
                &&
                <div className="flex">
                <PencilIcon className="h-6 w-6 text-blue-500 cursor-pointer mr-2" onClick={() => handleEditClick("1")} />
                <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleDeleteClick("1")} />
              </div>
              }
            </div>
            <p className="text-gray-600">Categoria: {product?.category?.name}</p>
            {/* <p className="text-gray-600">Precio: ${product.price}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
