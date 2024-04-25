'use server';
import { checkTokenExpiration } from '@/lib/auth.server';
import TokenExpiredModal from './tokenExpired';
// import { useState, useEffect } from 'react';

export const TokenExpiredModalWrapper = async () => {
  let result = await checkTokenExpiration();
  
  return <TokenExpiredModal initialIsTokenExpired={result} />;
};

// export default TokenExpiredModalWrapper;