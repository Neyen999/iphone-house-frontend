'use server';
import { checkTokenExpiration } from '@/lib/auth/auth.server';
import TokenExpired from './TokenExpired';
// import { useState, useEffect } from 'react';

const TokenExpiredModalWrapper = async () => {
  const { isAuth, isValid, closeToExpire } = await checkTokenExpiration();

  return <TokenExpired 
  isAuth={isAuth} isValid={isValid} closeToExpire={closeToExpire} 
  />;
};

export default TokenExpiredModalWrapper;