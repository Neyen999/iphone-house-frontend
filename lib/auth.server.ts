// server-auth.ts
'use server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = async () => {
  const token = cookies().get('__iphonehouse_varela__')?.value;

  return token !== undefined;
};

export const isTokenValid = async () => {
  const token = cookies().get('__iphonehouse_varela__')?.value;

  let decoded = null
  // console.log("VALOR DEL TOKEN: ", token)

  if (token !== undefined && token !== "" && token !== null) {
    // console.log("On invalid token")
    decoded = jwtDecode(token);
    const expiration = decoded.exp || 0;

    // console.log(expiration);
    // compare to current date and hour
    const now = Date.now();

    // Convert expiration time and current time to human-readable date formats
    const expirationDate = new Date(expiration * 1000).toLocaleString();
    const currentDate = new Date(now).toLocaleString();

    // console.log("Token expiration time:", expirationDate);
    // console.log("Current time:", currentDate);


    // console.log("Is token valid?: ", now < (expiration * 1000))
    return now < (expiration * 1000);
  }

  // console.log("Decoded JWT: ", decoded);

  return false;
}

export const createSessionToken = async (cookieName: string, data: any, expires: Date) => {
  console.log("Cookie data: ", {
    "name": cookieName,
    "data": data
  })
  cookies().set(cookieName, data, { expires, httpOnly: true});
}

export const deleteSessionToken = async (cookieName: string) => {
  console.log("inside delete cookie for cookie name: ", cookieName);
  cookies().delete(cookieName);
}

export const checkBackendStatus = async () => {
  const response = await fetch("http://localhost:8080/api/v1/auth/appStatus");
  if (response.status !== 200) {
    // do something to show on the front end
  }
} 

export const obtainCookie = async (cookieName: string) => {
  return cookies().get(cookieName)?.value;
}

export const checkTokenExpiration = async () => {
  const isAuth = await isAuthenticated();
  const isValid = await isTokenValid();
  return isAuth && !isValid;
};