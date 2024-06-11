import React from "react";

interface DeleteWarningProps {
  onClose: () => void;
  onDelete: () => void;
  message: string;
}

const DeleteWarning: React.FC<DeleteWarningProps> = ({ onClose, onDelete, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-4 break-words">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mr-2">Cancelar</button>
          <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarning;
