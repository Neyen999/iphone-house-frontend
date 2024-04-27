import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isTokenValid } from './lib/auth.server';


export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const isAuth = await isAuthenticated();
  const isValid = await isTokenValid();

  console.log("MIDDLEWARE VALIDATION: ", !isAuth && !isValid)
  if (!isAuth && !isValid) {
    console.log("direct to login");
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // console.log("PATHNAME: ", req.nextUrl.pathname)
  if (req.nextUrl.pathname === "/") {
    console.log("redirect to INICIO");
    url.pathname = "/inicio"
    return NextResponse.redirect(url);
  }

  // validate roles
  // if (req.cookies.get("userRole") !== null) {
  //   const role = req.cookies.get("userRole")?.value;
  //   if (role === "ADMIN") {
  //     url.pathname = '/inicio/administracion';
  //     return NextResponse.redirect(url);
  //   }
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
  matcher: ['/', '/inicio/:path*'],
  exclude: ['/login'],
};