import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { isTokenValid } from './lib/auth.service';
import { isAuthenticated, isTokenValid } from './lib/auth.server';
import { cookies } from 'next/headers';
// import { removeTokenIfExists } from './app/actions/removeCookie.server';
// import { isTokenValid } from './lib/auth.service';


export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Check if the user is authenticated
  
  // Validation
  const isAuth = await isAuthenticated();
  const isValid = await isTokenValid();

  if (!isAuth || !isValid) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // validate roles
  // if (req.cookies.get("userRole") !== null) {
  //   // const { roles } = req.cookies.get("user")?.value
  // }

  // req.

  return NextResponse.next();
}

// export const validateToken = async () => {
//   try {
//     const token = getTokenFromCookie();
//     const response = await axios.post(`${API_BASE_URL}/auth/validateJwt?token=${token}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error validating token:', error);
//     throw error;
//   }
// };

// const getTokenFromCookie = () => {
//   const token = cookies().get('token');
//   return token;
// };

export const config = {
  matcher: ['/'],
  exclude: ['/login'],
};