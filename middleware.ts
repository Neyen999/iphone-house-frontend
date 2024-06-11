import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isTokenValid } from './lib/auth/auth.server';

export default async function middleware(req: NextRequest) {

  const url = req.nextUrl.clone();
  const loginPath = '/login';
  const homePath = '/'; // Adjust this to your desired home path

  const isAuth = await isAuthenticated();
  const isValid = await isTokenValid();

  console.log("ES AUTH")
  // If the user is trying to access the login page and they are authenticated and the token is valid, redirect them to the home page
  if (url.pathname === loginPath && isAuth) {
    console.log("Authenticated user trying to access login page, redirecting to home");
    url.pathname = homePath;
    return NextResponse.redirect(url);
  }

  // If the user is not authenticated or the token is not valid, redirect them to the login page
  if ((!isAuth && !isValid) && url.pathname !== loginPath) {
    console.log("User not authenticated or token invalid, redirecting to login");
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  // Continue with the request
  // console.log("ultima")
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/productos', '/ventas', '/stock', '/perfil', '/login'],
  // exclude: ['/login'],
};
