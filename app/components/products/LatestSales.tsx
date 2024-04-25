// LatestSales.jsx
import Image from "next/image";
import FirstPhoto from "@/assets/photo1.jpg";

const LatestSales = ({ sales }: any) => {
  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-bold mb-4">Últimas ventas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sales.slice(0, 3).map((sale: any, index: number) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md max-w-xs">
            <Image src={FirstPhoto} alt={sale.product} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{sale.product.name}</h3>
            <p className="text-gray-600">Cantidad vendida: {sale.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSales;
