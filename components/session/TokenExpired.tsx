'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/context';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { extendUserSession } from '@/lib/auth/auth.service';

const TokenExpired = (
  { isAuth, isValid, closeToExpire } : { isAuth: boolean, isValid: boolean, closeToExpire: boolean }
) => {
  const { 
    setIsTokenExpired, 
    // isModalOpen, 
    handleLogout, 
    // handleModalClose, 
    // setIsModalOpen,
    setIsLoggingOut,
    checkTokenExpiration
  } = useAuth();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isAuth && isValid && closeToExpire);

  useEffect(() => {
    if (pathname === '/login') return;

    const checkShouldOpenModal = async () => {
      const { isAuth, isValid, closeToExpire } = await checkTokenExpiration(); // Esta función debe devolver un objeto con isAuth, isValid y closeToExpire
      if (isAuth && closeToExpire) {
        setIsTokenExpired(true); // Marcar la sesión como expirada en el estado
        if (!isValid) {
          setIsModalOpen(false)
          handleLogout(); // Desloguear automáticamente si el token ya ha expirado
        } else {
          setIsModalOpen(true); // Abrir el modal de sesión expirada si el token está cerca de expirar
        }
      }
    };

    // Llama a la función de verificación al cargar el componente y luego cada cierto tiempo
    checkShouldOpenModal();
    const interval = setInterval(checkShouldOpenModal, 60000); // Verifica cada minuto

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [pathname]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsLoggingOut(false);
  };

  const logoutAndCloseModal = () => {
    handleLogout();
    handleModalClose();
  }

  const handleExtendSession = async () => {
    // Perform session extension logic here, such as refreshing the token
    await extendUserSession()
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
            // disabled={isLoggingOut}
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
