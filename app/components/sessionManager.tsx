'use server';
import { isAuthenticated, isTokenValid } from '@/lib/auth.server';
import TokenExpiredModal from './tokenExpired';
// import { useState, useEffect } from 'react';

export const TokenExpiredModalWrapper = async () => {
  // const [isTokenExpired, setIsTokenExpired] = useState(false);

  // useEffect(() => {
  //   checkTokenExpiration();

  //   // Check token expiration every minute
  //   const interval = setInterval(checkTokenExpiration, 60000);

  //   // Clean up the interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

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
  return <TokenExpiredModal isTokenExpired={result} />;
};

// export default TokenExpiredModalWrapper;