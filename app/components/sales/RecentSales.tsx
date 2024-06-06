const RecentSales = ({ sales }: { sales: SaleDto[] }) => {
  console.log("Recent sales")
  console.log(sales)

  // const format = (date: Date) => {
  //   console.log(date)
  //   // Obtener el día, mes y año
  //   let day: any = date.getDate();
  //   let month: any = date.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se debe sumar 1
  //   const year = date.getFullYear();

  //   // Asegurar que el día y el mes tengan dos dígitos
  //   if (day < 10) {
  //     day = '0' + day;
  //   }

  //   if (month < 10) {
  //     month = '0' + month;
  //   }
  //   // Formatear la fecha
  //   const formattedDate = `${day}-${month}-${year}`;
    
  //   return formattedDate
  // }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Ventas Recientes</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
              Venta Nro°
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Producto/s
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Contacto
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider  text-right">
              Abonado por el cliente
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider  text-right">
              Vuelto
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider  text-right">
              Pago total
            </th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right">{sale.id}</td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{sale.dateCreated ? sale.dateCreated.toString() : '-'}</td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                {sale.productSales.map((prodSale) => prodSale.product.name).join(", ")}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{sale.userName}</td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{sale.userPhoneNumber}</td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right">${sale.userPayment}</td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right">${sale.totalChange}</td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right">${sale.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSales;
