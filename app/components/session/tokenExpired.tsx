'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { isAuthenticated, isTokenValid } from '@/lib/auth.server';
// import { logoutUser } from '@/lib/auth.service';
import { useAuth } from '../../context/context';
import clsx from 'clsx';

const TokenExpiredModal = ({ initialIsTokenExpired } :any) => {
  const { 
          isTokenExpired, setIsTokenExpired, 
          isLoggingOut, isModalOpen, handleLogout, 
          handleModalClose, setIsModalOpen,
          checkTokenExpiration
        } = useAuth();

  useEffect(() => {
    setIsTokenExpired(initialIsTokenExpired)
    console.log("First log on use effect");

    const checkSessionExpiration = async () => {
      // Aquí puedes realizar la lógica para verificar si la sesión ha expirado
      // Por ejemplo, podrías llamar a una función de servicio que verifique el estado del token
      console.log("Executing")
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
 // Vacío significa que solo se ejecutará al montar el componente

  }, [])


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

  return (
    <div className={modalContainerClasses}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your session has expired</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={logoutAndCloseModal}
            disabled={isLoggingOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Log Out
          </button>
          <button
            // onClick={handleExtendSession}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Extend Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiredModal;