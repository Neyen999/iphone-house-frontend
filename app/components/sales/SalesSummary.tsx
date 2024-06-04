const SalesSummary = ({ totalSales }: { totalSales: number}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Número de Ventas</h2>
      <p className="text-3xl font-bold">{totalSales}</p>
    </div>
  );
};


export default SalesSummary;