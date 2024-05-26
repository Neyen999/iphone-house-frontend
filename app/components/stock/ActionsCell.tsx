import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ActionsCell {
  row: StockDto;
  handleEdit: (row: StockDto) => void;
  handleDelete: (row: StockDto) => void;
}

const ActionsCell: React.FC<ActionsCell> = ({ row, handleEdit, handleDelete }) => (
  <div className="flex justify-center">
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={() => handleEdit(row)}
    >
      <PencilIcon className="h-5 w-5" />
    </button>
  </div>
);

export default ActionsCell;