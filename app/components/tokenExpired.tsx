'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { isAuthenticated, isTokenValid } from '@/lib/auth.server';
import { logoutUser } from '@/lib/auth.service';
import clsx from 'clsx';

const TokenExpiredModal = ({ isTokenExpired } :any) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("ESTA EXPIRADO?: ", isTokenExpired)

  // useEffect(() => {
    // checkTokenExpiration();
    // Check token expiration every minute
    // const interval = setInterval(checkTokenExpiration, 60000);

    // Clean up the interval on component unmount
    // return () => clearInterval(interval);
  // }, []);

  // const checkTokenExpiration = async () => {
  //   const isAuth = await isAuthenticated();
  //   const isValid = await isTokenValid();
  //   console.log("ES AUTH ON USE EFFECT: ", isAuth);
  //   console.log("ES VALID ON USE EFFECT: ", isValid);
  //   setIsTokenExpired(isAuth && !isValid);
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsLoggingOut(false);
  };

  useEffect(() => {
    if (isTokenExpired) {
      console.log("INSIDE THE IS EXPIRED IF");
      setIsModalOpen(true);
    }
  }, [isTokenExpired]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Perform logout logic here, such as deleting the token cookie and clearing user data

    // Redirect to the login page after logout
    // deleteTokenCookie()
    logoutUser();
    router.push('/login');
    handleModalClose();
  };

  const handleExtendSession = async () => {
    // Perform session extension logic here, such as refreshing the token
    // You may need to make a request to your backend to renew the token

    // Close the modal after session extension
    handleModalClose();
  };

  console.log("IS MODEL OPEN: ", isModalOpen);
  if (!isModalOpen) {
    return null;
  }

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
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Log Out
          </button>
          <button
            onClick={handleExtendSession}
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