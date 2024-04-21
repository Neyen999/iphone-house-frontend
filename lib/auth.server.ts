// server-auth.ts
'use server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const isAuthenticated = async () => {
  const token = cookies().get('session')?.value;

  return token !== undefined;
};

export const isTokenValid = async () => {
  const token = cookies().get('session')?.value;

  const request = { token: token};

  if (token !== null && token !== undefined) {
    const response = await fetch(`http://localhost:8080/api/v1/auth/validateJwt`, {
    body: JSON.stringify(request),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
    });
    if (response.status === 401) {
      return false;
    }
    const result = await response.json();

    return result;
  }
  return false;
}

export const createSessionToken = async (cookieName: string, data: any, expires: Date) => {
  cookies().set(cookieName, data, { expires, httpOnly: true});
}

export const deleteSessionToken = async (cookieName: string) => {
  cookies().delete(cookieName);
}

export const checkBackendStatus = async () => {
  const response = await fetch("http://localhost:8080/api/v1/auth/appStatus");
  if (response.status !== 200) {
    // do something to show on the front end
  }
} 

export const obtainCookie = async (cookieName: string) => {
  cookies().get(cookieName);
}