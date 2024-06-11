import React from 'react';
import clsx from 'clsx';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-600 hover:bg-gray-300"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
