import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditItemForm from "../products/EditItemForm";
import DeleteWarning from "../products/DeleteWarning";
import { deleteSale } from "@/lib/sale/sale.service";

const RecentSales = ({ sales }: { sales: SaleDto[] }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SaleDto | null>(null);
  const [salesList, setSalesList] = useState<SaleDto[]>(sales);

  
  useEffect(() => {
    setSalesList(sales)
  }, [sales]);


  const handleEditSaleClick = (sale: SaleDto) => {
    console.log(sale);
    setSelectedSale(sale);
    setIsEditing(true);
  };

  const handleDeleteSaleClick = (sale: SaleDto) => {
    setSelectedSale(sale);
    setIsDeleting(true);
  };

  const handleEditSubmit = (formData: any) => {
    // Implement your update logic here
    console.log("Edit sale", formData);
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSale) {
      // Implement your delete logic here
      console.log("Delete sale", selectedSale);
      const deletedSale = await deleteSale(selectedSale.id);
      // Remove the sale from the state
      setSalesList(salesList.filter(sale => sale.id !== deletedSale.id));
      setIsDeleting(false);
      setSelectedSale(null);
    }
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
    setSelectedSale(null);
  };

  const handleCloseDeleteWarning = () => {
    setIsDeleting(false);
    setSelectedSale(null);
  };

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
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {/* Acciones */}
            </th>
          </tr>
        </thead>
        <tbody>
          {salesList.map((sale) => (
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
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
                <PencilIcon className="h-5 w-5 text-blue-500 cursor-pointer mr-2" onClick={() => handleEditSaleClick(sale)} />
                <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => handleDeleteSaleClick(sale)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && selectedSale && (
        <EditItemForm
          item={selectedSale}
          fields={[
            { id: "userName", label: "Cliente", type: "text" },
            { id: "userPhoneNumber", label: "Contacto", type: "text" },
            { id: "userPayment", label: "Abonado por el cliente", type: "number" },
            { id: "totalChange", label: "Vuelto", type: "number" },
            { id: "totalPrice", label: "Pago total", type: "number" },
            // { id: "productSales", label: "", type: "select"}
          ]}
          onClose={handleCloseEditForm}
          onSubmit={handleEditSubmit}
        />
      )}

      {isDeleting && selectedSale && (
        <DeleteWarning
          onClose={handleCloseDeleteWarning}
          onDelete={handleDeleteConfirm}
          message="¿Estás seguro de que quieres eliminar esta venta?"
        />
      )}
    </div>
  );
};

export default RecentSales;
