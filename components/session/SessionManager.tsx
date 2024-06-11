'use server';
import { checkTokenExpiration } from '@/lib/auth/auth.server';
import TokenExpired from './TokenExpired';
// import { useState, useEffect } from 'react';

const TokenExpiredModalWrapper = async () => {
  let result = await checkTokenExpiration();
  
  console.log("this is executing on server side everytime i switch routes");
  return <TokenExpired initialIsTokenExpired={result} />;
};

export default TokenExpiredModalWrapper;