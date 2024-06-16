// server-auth.ts
'use server';
import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const isAuthenticated = async () => {
  const token = cookies().get('__iphonehouse_varela__')?.value;

  return token !== undefined;
};

export const isTokenValid = async () => {
  const token = cookies().get('__iphonehouse_varela__')?.value;

  if (token) {
    const decoded = jwtDecode(token);
    const expiration = decoded.exp || 0;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    const isValid = nowInSeconds < expiration;
    const timeToExpire = expiration - nowInSeconds;
    const closeToExpire = timeToExpire <= 900; // 180 segundos (3 minutos) para estar cerca de la expiración


    return {
      isValid,
      closeToExpire,
    };
    // return now < (expiration * 1000);
  }

  return {
    isValid: false,
    closeToExpire: false
  };
}

export const createSessionToken = async (cookieName: string, data: any, expires: Date) => {
  cookies().set(cookieName, data, { expires, httpOnly: true});
}

export const deleteSessionToken = async (cookieName: string) => {
  cookies().delete(cookieName);
}

export const checkBackendStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/appStatus`);
  if (response.status !== 200) {
    // do something to show on the front end
  }
} 

export const obtainCookie = async (cookieName: string) => {
  return cookies().get(cookieName)?.value;
}

export const checkTokenExpiration = async (): Promise<TokenExpirationStatus> => {
  const isAuth = await isAuthenticated();
  const { isValid, closeToExpire } = await isTokenValid();
  return {
    isAuth,
    isValid,
    closeToExpire
  };
};
