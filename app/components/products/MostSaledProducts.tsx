import Image from "next/image";
import SecondPhoto from "@/assets/photo2.jpg";

// MostSaledProducts.jsx
const MostSaledProducts = ({ products }: any) => {
  // Lógica para obtener los productos más vendidos (puedes implementarla según tus necesidades)
  const mostSaledProducts = products.sort((a: any, b: any) => b.sales - a.sales).slice(0, 3);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Productos más vendidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mostSaledProducts.map((product: any, index: number) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md max-w-xs">
            <Image src={SecondPhoto} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Cantidad vendida: {product.sales}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSaledProducts;
