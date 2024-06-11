'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/context';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const TokenExpired = ({ initialIsTokenExpired } :any) => {
  const { 
    isTokenExpired, setIsTokenExpired, 
    isLoggingOut, isModalOpen, handleLogout, 
    handleModalClose, setIsModalOpen,
    checkTokenExpiration
  } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login') return;

    setIsTokenExpired(initialIsTokenExpired);

    const checkSessionExpiration = async () => {
      const isSessionExpired = await checkTokenExpiration(); // Esta función debe devolver un booleano
      if (isSessionExpired) {
        setIsTokenExpired(true); // Marcar la sesión como expirada en el estado
        setIsModalOpen(true); // Abrir el modal de sesión expirada
      }
    };

    // Llama a la función de verificación al cargar el componente y luego cada cierto tiempo
    checkSessionExpiration();
    const interval = setInterval(checkSessionExpiration, 60000); // Verifica cada minuto

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [pathname]);

  const logoutAndCloseModal = () => {
    handleLogout();
    handleModalClose();
  }

  const handleExtendSession = async () => {
    // Perform session extension logic here, such as refreshing the token

    handleModalClose();
  };

  const modalContainerClasses = clsx(
    'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
    {
      'hidden': !isModalOpen,
    }
  );

  if (pathname === '/login') {
    return null; // No renderizar el componente en la pantalla de login
  }

  return (
    <div className={modalContainerClasses}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Tu sesión ha expirado.</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={logoutAndCloseModal}
            disabled={isLoggingOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Salir
          </button>
          <button
            onClick={handleExtendSession}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Extender
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpired;
