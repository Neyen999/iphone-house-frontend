'use server';
import { isAuthenticated, isTokenValid } from '@/lib/auth.server';
import TokenExpiredModal from './tokenExpired';
// import { useState, useEffect } from 'react';

export const TokenExpiredModalWrapper = async () => {

  const checkTokenExpiration = async () => {
    "use server";
    const isAuth = await isAuthenticated();
    const isValid = await isTokenValid();
    // setIsTokenExpired(isAuth && !isValid);
    console.log("IS AUTH ON SERVER SIDE: ", isAuth);
    console.log("IS VALID ON SERVER SIDE: ", isValid);
    return (isAuth && !isValid);
  };

  let result = await checkTokenExpiration();
  return <TokenExpiredModal initialIsTokenExpired={result} />;
};

// export default TokenExpiredModalWrapper;