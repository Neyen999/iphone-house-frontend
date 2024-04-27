'use server';
import { checkTokenExpiration } from '@/lib/auth.server';
import TokenExpiredModal from './tokenExpired';
// import { useState, useEffect } from 'react';

export const TokenExpiredModalWrapper = async () => {
  let result = await checkTokenExpiration();
  
  console.log("this is executing on server side everytime i switch routes");
  return <TokenExpiredModal initialIsTokenExpired={result} />;
};

// export default TokenExpiredModalWrapper;